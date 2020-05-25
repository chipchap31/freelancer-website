from django.urls import reverse
from django.test import TestCase, Client
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from django.apps import apps
from .apps import AccountsConfig
from .models import ProfileModel


class AccountRegistration(APITestCase):
    def setUp(self):
        self.email = "test@gmail.com"
        self.data = {
            "email": self.email,
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
        url = reverse('account_register')
        response = self.client.post(url, data=self.data)

    def test_app(self):
        self.assertEqual("accounts", AccountsConfig.name)
        self.assertEqual("accounts", apps.get_app_config("accounts").name)

    def test_account_registration_is_successful(self):
        username = self.email
        user_new = get_object_or_404(User, username=self.email)

        user_length = User.objects.count()

        self.assertGreater(user_length, 0)
        self.assertEqual(username, user_new.username)

    def test_profile_successfully_created(self):

        user = get_object_or_404(User, username=self.email)

        url = f"/api/profile/{str(user.id)}"

        client = APIClient()
        client.force_authenticate(user)

        response = client.get(url)
        profile_email = response.data.get('email')
        self.assertEqual(profile_email, self.email)
        self.assertEqual(status.HTTP_200_OK, response.status_code)


class AccountLogin(APITestCase):
    def setUp(self):
        self.email = "test@gmail.com"
        self.password = "test_password"
        self.client = APIClient()
        self.user = User.objects.create_user(
            username=self.email, password=self.password)
        self.user.save()

    def test_login_with_valid_username(self):
        url = reverse('account_login')
        data = {
            "username": self.email,
            "password": self.password
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_check_if_user_exist(self):
        url = reverse('account_check')

        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, {'email': self.email})
        username = response.data.get('username')

        self.assertEqual(username, self.email)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_login_with_invalid_username(self):

        url = reverse('account_login')
        data = {
            "username": "test_username_wrong",
            "password": self.password
        }
        response = self.client.post(url, data)

        message = response.data.get('message')
        self.assertEqual('Invalid username or password.', message)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_with_invalid_password(self):

        url = reverse('account_login')
        data = {
            "username": self.email,
            "password": "test_password_wrong"
        }
        response = self.client.post(url, data)

        message = response.data.get('message')
        self.assertEqual('Invalid username or password.', message)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AccountUpdate(APITestCase):
    def setUp(self):
        # create a user first
        self.email = "test@gmail.com"
        self.password = "test_password"
        self.client = APIClient()
        self.data = {
            "email": self.email,
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

        self.user = User.objects.create_user(
            username=self.email, password=self.password)

        profile_new = ProfileSerializer(data=self.data)
        profile_new.is_valid(raise_exception=True)
        profile_new.save(owner=self.user)

    def test_change_password_with_valid_old_password(self):

        url = reverse('password_update')
        data = {
            "password_old": self.password,
            "password_new": "test_password_new"
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)

        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_change_password_with_invalid_old_password(self):
        url = reverse('password_update')
        data = {
            "password_old": 'test_password_wrong',
            "password_new": "test_password_new"
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)
        message = response.data.get('message')
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(message, "Old password is invalid")

    def test_update_profile_with_valid_data(self):

        url = f'/api/profile/update/1'

        self.client.force_authenticate(user=self.user)
        profile_previous = get_object_or_404(ProfileModel, owner=self.user)

        profile_new_data = {
            "email": self.email,
            "first_name": "test_first_name_new",
            "last_name": "test_last_name",
            "mobile": "01239475",
            "address_line1": "Mankato Mississippi 96522",
            "address_line2": "711-2880 Nulla St.",
            "city": "Celbridge",
            "county": "Kildare"
        }

        response = self.client.post(url, data=profile_new_data)

        profile_new = get_object_or_404(ProfileModel, owner=self.user)

        self.assertNotEqual(profile_new.first_name,
                            profile_previous.first_name)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_account(self):
        url = reverse('account_delete')
        self.client.force_authenticate(user=self.user)

        response = self.client.post(url, data={})
        user_length = User.objects.count()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(user_length, 0)
