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

import stripe
from django.conf import settings
from django.shortcuts import redirect


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


# This is your test secret API key.
stripe.api_key = settings.STRIPE_SECRET_KEY

def formatStripeLineItem(cartItems):
    print("CART ITEMS: ", cartItems)
    line_items = []
    for item in cartItems:
        unit_amount = int(float(item["price"]) * 100)

        line_items.append({
            "price_data": {
                "currency": "aud",
                "unit_amount": unit_amount,
                "product_data": {
                    "name": item["name"]
                },
            },
            "quantity": item["quantity"],
        })

    return line_items



class StripeChechOutView(APIView):
    def post(self, request):
        print("REQUEST DATA: ", request.data)
        line_items = formatStripeLineItem(request.data)
        print("CUSTOM LINE ITEMS: ", line_items)
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                # [
                #     {
                #         "price": "price_1OaF8fC4qoH0c9CccBwhJ86z",
                #         "quantity": 1,
                #     },
                # ],
                payment_method_types=["card"],
                mode="payment",
                success_url=settings.REACT_SITE_URL
                + "ll?success=true&session_id={CHECKOUT_SESSION_ID}",
                cancel_url=settings.REACT_SITE_URL + "cart?canceled=true",
            )
            return Response({"url": checkout_session.url})
        except:
            return Response(
                {"error": "Something went wrong when creating stripe checkout session"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
