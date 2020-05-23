from django.urls import reverse
from django.test import TestCase, Client
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from django.apps import apps
from .apps import AccountsConfig


class AccountTest(APITestCase):
    def setUp(self):
        self.primary_username = 'test@gmail.com'
        self.primary_password = 'test_password'
        self.test_user = User.objects.create_user(
            username=self.primary_username, password=self.primary_password)

    def test_app(self):
        self.assertEqual("accounts", AccountsConfig.name)
        self.assertEqual("accounts", apps.get_app_config("accounts").name)

    def test_registration_serializer_for_emtpy_data(self):

        data = {"username": "", "password": ""}

        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_registration_serializer_for_valid_data(self):
        # user name for this instance cannot be equal to the primary test_user
        data = {"username": 'test_username2', "password": "test_password2"}

        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_registration_end_point_with_valid_data(self):
        url = reverse('account_register')
        data = {"email": "test@test.com",
                "concept_amount": 3,
                "deadline_date": "2020-06-24T11:52:58.769Z",
                "project_type": "Icon",
                "colors": "#EEEE,#EEEE,#EEEE,#EEEE,#EEEE",
                "height": 200,
                "width": 200,
                "description": "",
                "quote_price": 133,
                "first_name": "test_first_name",
                "last_name": "test_last_name",
                "mobile": "01239475",
                "address_line1":
                "Mankato Mississippi 96522",
                "address_line2": "711-2880 Nulla St.",
                "city": "Celbridge", "county": "Kildare"
                }
        response = self.client.post(url, data)

        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_login_end_point_with_valid_data(self):
        url = reverse('account_login')

        data = {
            'username': 'test@gmail.com', 'password': 'test_password'
        }
        response = self.client.post(url, data)

        response_user = response.data.get('user')

        user = get_object_or_404(User, pk=response_user.get('id'))

        self.assertEqual(status.HTTP_200_OK, response.status_code)

        self.assertEqual(user.username, data.get('username'))

    def test_login_end_point_with_invalid_data(self):
        url = reverse('account_login')

        data = {
            'username': 'test@gmail.com', 'password': 'test_wrong_password'
        }
        response = self.client.post(url, data)

        response_user = response.data.get('user')

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_check_user_exist_end_point(self):
        url = reverse('account_check')
        data = {
            'email': 'test@gmail.com'
        }
        response = self.client.post(url, data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_password_with_invalid_password(self):
        url = "/api/password/change"

        data = {
            'password_old': "test_wrong_password",
            "password_new": "test_new_password"

        }
        user = get_object_or_404(User, pk=1)
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post(url, data)

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_password_with_valid_password(self):
        url = "/api/password/change"

        data = {
            'password_old': "test_password",
            "password_new": "test_new_password"

        }
        user = get_object_or_404(User, pk=self.test_user.id)

        client = APIClient()
        client.force_authenticate(user)
        response = client.post(url, data)

        self.assertEqual(status.HTTP_200_OK, response.status_code)
