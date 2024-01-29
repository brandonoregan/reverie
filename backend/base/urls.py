from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Products URLS
    path("products/", views.GetAllProducts.as_view(), name="get_all_products"),
    path("products/<str:pk>", views.GetProduct.as_view(), name="get_product"),

    # User URLS
    path("user/register/", views.RegisterUser.as_view(), name="register_user"),
    path("users/", views.GetUsers.as_view(), name="get_users"),

    # Order URLS
    path("order/", views.CreateOrder.as_view(), name="create_order"),
    path("orders/", views.GetOrders.as_view(), name="get_orders"),

    # JWT/User URLS
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "user/logout/blacklist/",
        views.BlacklistTokenUpdateView.as_view(),
        name="blacklist",
    ),
    
    # Stripe URLS
    path("stripe/", views.StripeChechOutView.as_view(), name="stripe"),
    path("stripe/webhook", views.stripe_webhook, name="stripe_webhook"),
]
