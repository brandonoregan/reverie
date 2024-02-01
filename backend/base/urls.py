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
    path("products/update/<int:id>/", views.UpdateProduct.as_view(), name="update_product"), 
    path("products/delete/<int:id>/", views.DeleteProduct.as_view(), name="delete_product"), 

    # User URLS
    path("users/", views.GetUsers.as_view(), name="get_users"),
    path("user/register/", views.RegisterUser.as_view(), name="register_user"),
    path("user/<int:id>/", views.GetUser.as_view(), name="get_user"),
    path('user/delete/<int:id>/', views.DeleteUser.as_view(), name='delete_user'),
    path('user/update/<int:id>/', views.UpdateUser.as_view(), name='update_user'),

    # Order URLS
    path("order/", views.CreateOrder.as_view(), name="create_order"),
    path("order/delete/", views.DeleteOrderView.as_view(), name="delete_order"),
    path("orders/", views.GetOrders.as_view(), name="get_orders"),
    path("user/orders/", views.GetUserOrdersView.as_view(), name="get_user_orders"),
    

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
