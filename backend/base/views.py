from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User

from base.serializers import UserSerializer, ProductSerializer, UserSerializerWithToken

from .models import Product

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from django.contrib.auth.hashers import make_password


@api_view(["POST"])
def register_user(request):
    serializer = UserSerializerWithToken(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("ERROR ERROR:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
