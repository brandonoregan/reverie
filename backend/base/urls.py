from django.urls import path
from . import views

urlpatterns = [
    path("get-user/", views.get_user, name="get_user"),
]
