from django.apps import apps
from django.urls import reverse
from .apps import CheckoutConfig
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from services.models import Services
from services.serializers import ServicesSerializer
from .serializers import OrderSerializer
from projects.models import ProjectModel
from .models import OrderModel, OrderLineModel
from datetime import datetime


class CheckoutApiTestCase(APITestCase):
    def setUp(self):
        self.email = "test@gmail.com"
        self.password = "test_password"
        self.client = APIClient()
        self.user = User.objects.create_user(
            username=self.email, password=self.password)
        self.client_secret = ''
        # create a service
        self.service_data = {
            'name': 'Icon',
            'deadline_price': 100,
            "description": "test",
            "coloured_price": 100,
            "concept_price": 2,
            "default_height": 500,
            "default_width": 500,
            "price": 200,

        }
        self.quote_data = {
            "email": self.email,
            "concept_amount": 3,
            "deadline_date": "06/02/2020",
            "project_type": "Icon",
            "colors": "#EEEE,#EEEE,#EEEE,#EEEE,#EEEE",
            "height": 200,
            "width": 200,
            "description": "test",
            "quote_price": 133,
            "first_name": "test_first_name",
            "last_name": "test_last_name",
            "mobile": "01239475",
            "address_line1": "Mankato Mississippi 96522",
            "address_line2": "711-2880 Nulla St.",
            "city": "Celbridge", "county": "Kildare"
        }
        service_serializer = ServicesSerializer(data=self.service_data)
        service_serializer.is_valid(raise_exception=True)
        service_serializer.save()
        self.service_name = service_serializer.data.get('name')

    def test_app(self):
        self.assertEqual("checkout", CheckoutConfig.name)
        self.assertEqual("checkout", apps.get_app_config("checkout").name)

    def test_payment_intent_with_valid_email(self):
        url = reverse('payment_intent')
        self.client.force_authenticate(user=self.user)
        data = {
            "email": self.email
        }
        response = self.client.post(url, data)

        self.client_secret = response.data.get('client_secret')

        self.assertTrue(self.client_secret)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_quote_is_successful(self):
        url = reverse('payment_quote')
        data = {
            "project_type": self.service_data.get('name'),
            **self.quote_data
        }

        response = self.client.post(url, data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertTrue(response.data.get('quote_price'))

    def test_check_order_creation_is_successful(self):
        url = reverse('order_new')
        data = {
            "email": self.email,
            "concept_amount": 1,
            "deadline_date": "2020-06-01",
            "project_type": "Icon",
            "colors": "#EEEE,#EEEE,#EEEE,#EEEE,#EEEE",
            "height": 200,
            "width": 200,
            "description": "",
            "quote_price": 73,
            "first_name": "Jomari",
            "last_name": "Alang",
            "mobile": "0851790143",
            "address_line1": "St. Anne's gardens",
            "address_line2": "St. Patrick's Park",
            "city": "Celbridge", "county": "Kildare"
        }
        self.client.force_authenticate(user=self.user)

        response = self.client.post(url, data)

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        order = get_object_or_404(OrderModel, owner=self.user)

        date_now = '{0:%Y-%m-%d}'.format(datetime.now())
        self.assertEqual(
            f"{data.get('first_name')} ordered at {date_now}", str(order))

        order_line = get_object_or_404(OrderLineModel, order=order)

        self.assertEqual(
            str(order_line), f"{order.email} ordered {self.service_name} for the price of {order_line.price}")
