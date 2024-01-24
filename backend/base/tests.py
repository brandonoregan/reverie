from rest_framework.test import APITestCase
from rest_framework import status
from .models import Product
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class ProductTests(APITestCase):
    def setUp(self):
        Product.objects.create(
            name="Product 1", description="Description 1", price=10.00
        )
        Product.objects.create(
            name="Product 2", description="Description 2", price=20.00
        )

    def test_get_all_products(self):
        url = reverse("get_all_products")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.count(), 2)


class UserRegistrationTests(APITestCase):
    def test_register_user(self):
        url = reverse("register_user")
        data = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@example.com",
            "password": "testpassword123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)


class TokenObtainPairViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpassword123"
        )

    def test_token_obtain_pair(self):
        url = reverse("token_obtain_pair")
        data = {"username": "testuser", "password": "testpassword123"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in response.data)
        self.assertTrue("refresh" in response.data)


class TokenRefreshViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpassword123"
        )
        refresh = RefreshToken.for_user(self.user)

        self.valid_refresh_token = str(refresh)
        self.invalid_refresh_token = "invalidtoken"

    def test_token_refresh(self):
        url = reverse("token_refresh")
        data = {"refresh": self.valid_refresh_token}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in response.data)

    def test_token_refresh_fail(self):
        url = reverse("token_refresh")
        data = {"refresh": self.invalid_refresh_token}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
