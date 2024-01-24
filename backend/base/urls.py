from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("user/", views.get_user, name="get_user"),
    # Products URLS
    path("products/", views.get_all_products, name="get_all_products"),
    path("products/<str:pk>", views.get_product, name="get_product"),
    # User URLS
    path("user/register/", views.register_user, name="register_user"),
    # JWT/User URLS
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "user/logout/blacklist/",
        views.BlacklistTokenUpdateView.as_view(),
        name="blacklist",
    ),
    path("stripe/", views.StripeChechOutView.as_view(), name="stripe")
    # path(
    #     "user/logout/blacklist/",
    #     views.BlacklistTokenUpdateView.as_view(),
    #     name="blacklist",
    # ),
]
