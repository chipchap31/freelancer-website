import json
from django.urls import reverse
from django.test import TestCase, Client
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from rest_framework import status
from .models import ProjectConfig
from rest_framework.authtoken.models import Token
from .serializers import ConfigSerializer


class ConfigTestCase(APITestCase):
    def setUp(self):

        self.get_config_url = '/api/config/1'

        self.first_instance = ProjectConfig.objects.create()
        self.second_instance = ProjectConfig.objects.create(
            accept_project=True)

    def test_config(self):

        response = self.client.get(self.get_config_url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_config_accept_project_defaults_to_false(self):

        response = self.client.get(self.get_config_url)
        json_content = json.loads(response.content)

        self.assertFalse(json_content['accept_project'])

    def test_create_object(self):

        queryset = ProjectConfig.objects.all()
        serializer = ConfigSerializer(queryset, many=True)
        data = serializer.data

        get_data = get_object_or_404(ProjectConfig, pk=2)

        self.assertTrue(get_data.accept_project)

    def test_contains_expected_fields(self):
        queryset = ProjectConfig.objects.last()
        serializer = ConfigSerializer(queryset)
        data = serializer.data

        self.assertEqual(set(data.keys()), set(['id', 'accept_project']))


class AdminTestView(TestCase):

    def setUp(self):
        self.client = Client()
        User.objects.create_superuser(
            username='admin', email='jacob@…', password='admin')

    def test_post_create_an_item_authenticated(self):
        c = Client()
        c.login(username='admin', password='admin')

        response = c.post(
            "/admin/config/projectconfig/add/", {"accept_project": True})

        self.assertEqual(ProjectConfig.objects.count(), 1)

        data = get_object_or_404(ProjectConfig, pk=1)

        self.assertEqual(data.accept_project, True)

    def test_post_create_an_item_unathorized(self):
        c = Client()

        response = c.post(
            "/admin/config/projectconfig/add/", {"accept_project": True})

        self.assertEqual(ProjectConfig.objects.count(), 0)
