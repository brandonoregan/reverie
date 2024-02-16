from django.test import TestCase
from django.contrib.auth.models import User
from base.models import Product, Review, Order, OrderItem
from decimal import Decimal


class ProductModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="user@test.com", password="testpass"
        )
        self.product = Product.objects.create(
            user=self.user,
            name="Test Product",
            category="Test Category",
            description="Test Description",
            rating=Decimal("4.50"),
            review_count=10,
            price=Decimal("19.99"),
            stock_count=50,
        )

    def test_product_creation(self):
        self.assertIsInstance(self.product, Product)

        self.assertEqual(str(self.product), "Test Product")


class ReviewModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="reviewuser", email="reviewer@test.com", password="testpass"
        )

        self.product = Product.objects.create(name="Review Product")
        self.review = Review.objects.create(
            product=self.product,
            user=self.user,
            name="Review User",
            rating=5,
            comment="Great Product!",
        )

    def test_review_creation(self):
        self.assertIsInstance(self.review, Review)
        self.assertEqual(str(self.review), "5")


class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="orderuser", email="orderuser@test.com", password="testpass"
        )
        self.order = Order.objects.create(
            user=self.user,
            payment_status=False,
            delivered=False,
            shipping_address="123 Test St",
            total_price=Decimal("59.97"),
        )

    def test_order_creation(self):
        self.assertIsInstance(self.order, Order)
        self.assertEqual(str(self.order), f"Order ID: {self.order.id}")


class OrderItemModelTest(TestCase):
    def setUp(self):
        self.order_user = User.objects.create_user(
            username="orderitemuser",
            email="orderitemuser@test.com",
            password="testpass",
        )

        self.order = Order.objects.create(
            user=self.order_user, total_price=Decimal("29.97")
        )

        self.product = Product.objects.create(
            name="OrderItem Product", price=Decimal("9.99")
        )

        self.order_item = OrderItem.objects.create(
            order=self.order,
            product=self.product,
            quantity=3,
            price=Decimal("9.99"),
        )

    def test_order_item_creation(self):
        self.assertIsInstance(self.order_item, OrderItem)

        self.assertEqual(self.order_item.quantity, 3)

        self.assertEqual(self.order_item.order, self.order)

        self.assertEqual(self.order_item.product, self.product)
