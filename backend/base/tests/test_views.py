from decimal import Decimal
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from base.models import Product, Order
import json
from django.contrib.auth.models import User
from base.serializers import OrderSerializer, UserSerializerWithToken

class TestViews(APITestCase):


    def setUp(self):

        self.user = User.objects.create_user(
            username='testuser', 
            password='testPassword1', 
            email="test_user@gmail.com", 
            first_name='Test',
            last_name='User',
            )
        
        self.client = APIClient()

        self.product = Product.objects.create(
            user=self.user,
            name="Narnia",
            category="candles",
            description="I am candle", 
            rating=4.5,
            review_count=17,
            price=15.99,
            stock_count=10,
        )


    def test_create_order(self):
      self.client.force_authenticate(user=self.user)
      
      items_data = [
          {
              "product_id": self.product.pk,
              "quantity": 2,
              "price": self.product.price 
          }

      ]
      
      order_data = {
          'items': items_data,
          'total_price': 31.98,
      }
      
      response = self.client.post(reverse('create_order'), data=order_data, format='json')
      
      self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      self.assertTrue(Order.objects.exists())
          
      self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      
      self.assertTrue(Order.objects.exists())


    def test_get_orders(self):
        response = self.client.get(reverse('get_orders'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_user_orders_view(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse('get_user_orders'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

    def test_delete_order_view(self):
        Order.objects.create(user=self.user)

        response = self.client.post(reverse('delete_order'))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Order.objects.exists())


    def test_register_user_view(self):
        response = self.client.post(reverse('register_user'), data={
            "username": "TestUser23",
            "email": "TestUser23@gmail.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "SomethingSpecial1",
            "passwordConfirm": "SomethingSpecial1"
        })
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(User.objects.exists())