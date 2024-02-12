from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from rest_framework_simplejwt.views import TokenRefreshView
from base import views


class TestUrls(APITestCase):
    

    def test_get_all_products_url_resolves(self):
        url = reverse("get_all_products")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetAllProducts)


    def test_get_product_url_resolves(self):
        url = reverse("get_product", kwargs={"pk": "example_id"})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetProduct)


    def test_update_product_url_resolves(self):
        url = reverse("update_product", kwargs={"id": 1})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.UpdateProduct)


    def test_delete_product_url_resolves(self):
        url = reverse("delete_product", kwargs={"id": 1})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.DeleteProduct)


    def test_get_users_url_resolves(self):
        url = reverse("get_users")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetUsers)


    def test_register_user_url_resolves(self):
        url = reverse("register_user")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.RegisterUser)


    def test_get_user_url_resolves(self):
        url = reverse("get_user", kwargs={"id": 1})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetUser)


    def test_delete_user_url_resolves(self):
        url = reverse("delete_user", kwargs={"id": 1})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.DeleteUser)


    def test_update_user_url_resolves(self):
        url = reverse("update_user", kwargs={"id": 1})
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.UpdateUser)


    def test_create_order_url_resolves(self):
        url = reverse("create_order")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.CreateOrder)


    def test_delete_order_url_resolves(self):
        url = reverse("delete_order")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.DeleteOrderView)


    def test_get_orders_url_resolves(self):
        url = reverse("get_orders")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetOrders)


    def test_get_user_orders_url_resolves(self):
        url = reverse("get_user_orders")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.GetUserOrdersView)


    def test_token_obtain_pair_url_resolves(self):
        url = reverse("token_obtain_pair")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.MyTokenObtainPairView)


    def test_token_refresh_url_resolves(self):
        url = reverse("token_refresh")
        resolver = resolve(url)
        print(resolver)
        self.assertEqual(resolver.func.view_class, TokenRefreshView)


    def test_blacklist_url_resolves(self):
        url = reverse("blacklist")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.BlacklistTokenUpdateView)


    def test_stripe_url_resolves(self):
        url = reverse("stripe")
        resolver = resolve(url)
        self.assertEqual(resolver.func.view_class, views.StripeChechOutView)


    def test_stripe_webhook_url_resolves(self):
        url = reverse("stripe_webhook")
        resolver = resolve(url)
        self.assertEqual(resolver.func, views.stripe_webhook)
