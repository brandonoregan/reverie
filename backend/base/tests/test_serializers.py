from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, Order, OrderItem
from base.serializers import (
    UserSerializerWithToken,
    MyTokenObtainPairSerializer,
    ProductSerializer,
    OrderItemSerializer,
    OrderSerializer,
)
from decimal import Decimal

class SerializerTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123', email='test@example.com')
        self.product = Product.objects.create(
            name='Test Product',
            price=Decimal('9.99'),
            stock_count=100,
            user=self.user
        )
        self.order = Order.objects.create(user=self.user)
        self.order_item = OrderItem.objects.create(
            order=self.order,
            product=self.product,
            quantity=2,
            price=Decimal('19.98')
        )


    def test_user_serializer_with_token(self):
        user_data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123',
            'passwordConfirm': 'newpass123',
            'first_name': 'New',
            'last_name': 'User',
        }
        serializer = UserSerializerWithToken(data=user_data)
        self.assertTrue(serializer.is_valid())
        
        user = serializer.save()
        self.assertIsNotNone(user)
        
        tokens = ['refresh_token', 'access_token']
        for token in tokens:
            self.assertIn(token, serializer.data)


    def test_product_serializer(self):
        serializer = ProductSerializer(instance=self.product)
        data = serializer.data
        self.assertEqual(data['name'], 'Test Product')
        self.assertEqual(Decimal(data['price']), Decimal('9.99'))


    def test_order_item_serializer(self):
        serializer = OrderItemSerializer(instance=self.order_item)
        data = serializer.data
        self.assertEqual(data['quantity'], 2)
        self.assertEqual(Decimal(data['price']), Decimal('19.98'))

        self.assertEqual(data['product']['name'], 'Test Product')


    def test_order_serializer(self):
        order_data = {
            'user': self.user.id,
            'items': [
                {
                    'product_id': self.product.id,
                    'quantity': 1,
                    'price': '9.99',
                }
            ]
        }

        serializer = OrderSerializer(instance=self.order)
        self.assertTrue(serializer.data['user']['username'], self.user.username)
