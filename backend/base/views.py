from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.serializers import UserSerializer


@api_view(["GET"])
def get_user(request):
    user = User.objects.get(pk=1)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
