from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from base.models import Product, Order
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class TestViews(APITestCase):


    def setUp(self):
        
        self.admin_user = User.objects.create_superuser(
            username='admin', 
            password='adminPassword', 
            email="admin@gmail.com"
        )

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


    def test_token_obtain_pair(self):
        url = reverse("token_obtain_pair")

        response = self.client.post(url, data={
           "username": self.user.username,
           "password": "testPassword1"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertTrue("access" in response.data)

        self.assertTrue("refresh" in response.data)


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


    def test_get_users(self):
      self.client.force_authenticate(user=self.admin_user)

      response = self.client.get(reverse('get_users'))

      self.assertEqual(response.status_code, status.HTTP_200_OK)
      self.assertTrue(len(response.data) > 0)

    
    def test_get_user(self):
      self.client.force_authenticate(user=self.admin_user)
      
      url = reverse('get_user', args=[self.user.pk])

      response = self.client.get(url)

      self.assertEqual(response.status_code, status.HTTP_200_OK)

      self.assertEqual(response.data['email'], self.user.email)


    def test_update_user(self):
      self.client.force_authenticate(user=self.admin_user)

      url = reverse('update_user', args=[self.user.pk])

      response = self.client.put(url, {
         'username': self.user.username,
         'first_name': 'UpdatedName',
         'last_name': self.user.last_name,
         'email': self.user.email,
         'is_staff': self.user.is_staff
         })

      self.user.refresh_from_db()

      self.assertEqual(response.status_code, status.HTTP_200_OK)

      self.assertEqual(self.user.first_name, 'UpdatedName')


    def test_delete_user(self):
      self.client.force_authenticate(user=self.admin_user)

      url = reverse('delete_user', args=[self.user.pk])
      
      response = self.client.delete(url)

      self.assertEqual(response.status_code, status.HTTP_200_OK)

      self.assertFalse(User
      .objects.filter(pk=self.user.pk).exists())


    def test_blacklist_token_update(self):
      refresh = RefreshToken.for_user(self.user)

      response = self.client.post(reverse('blacklist'), {'refresh_token': str(refresh)})

      self.assertEqual(response.status_code, status.HTTP_200_OK)
