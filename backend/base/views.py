from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User

from base.serializers import (
    UserSerializer,
    ProductSerializer,
    UserSerializerWithToken,
    MyTokenObtainPairSerializer,
    OrderSerializer,
    OrderItemSerializer,
)

from .models import Product, Order, OrderItem

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView

from .view_utils import formatStripeLineItem, updateInventory, updateOrder

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import stripe
from django.conf import settings


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CreateOrder(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GetOrders(APIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

    def get(self, request):
        orders = Order.objects.all()
        serializer = self.serializer_class(orders, many=True)
        return Response(serializer.data)

class CreateOrderItems(CreateAPIView):
    serializer_class = OrderItemSerializer

    def create(self, request, *args, **kwargs):
        cart_items = request.data  # Assuming you're sending an array of objects in the request data

        order_items = []  # To store created order items

        # Loop through each item in the cart and create an OrderItem
        for item in cart_items:
            serializer = self.get_serializer(data=item)
            if serializer.is_valid():
                serializer.save()  # Save the OrderItem to the database
                order_items.append(serializer.data)  # Append the serialized data to the response

        return Response(order_items, status=status.HTTP_201_CREATED)


class RegisterUser(CreateAPIView):
    serializer_class = UserSerializerWithToken

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("ERROR ERROR:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUsers(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)
    

class GetUser(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get(self, request, id):
        user = get_object_or_404(User, pk=id)
        serializer = self.serializer_class(user, context={'request': request}, many=False)
        return Response(serializer.data)


class UpdateUser(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def put(self, request, id):
        user = get_object_or_404(User, pk=id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def delete(self, request, id):
        user = get_object_or_404(User, pk=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetAllProducts(APIView):
    serializer_class = ProductSerializer

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class GetProduct(APIView):
    serializer_class = ProductSerializer

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = self.serializer_class(product, many=False)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateProduct(APIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

    def put(self, request, id):
        product = get_object_or_404(Product, pk=id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProduct(APIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

    def delete(self, request, id):
        product = get_object_or_404(Product, pk=id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
WEBHOOK_SIGNING_SECRET = settings.WEBHOOK_SIGNING_SECRET


@csrf_exempt
@require_POST
def stripe_webhook(request):
    event = None
    payload = request.body
    sig_header = request.headers["STRIPE_SIGNATURE"]

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, WEBHOOK_SIGNING_SECRET
        )

    except ValueError as e:
        # Invalid payload
        print("INVALID PAYLOAD")
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print("INVALID SIGNATURE")
        return HttpResponse(status=400)

        # Handle the event
    if event.type == "payment_intent.succeeded":
        payment_intent = event.data.object

        updateOrder(payment_intent)

        print("PAYMENT INTENT: ", payment_intent)
    else:
        print("Unhandled event type {}".format(event.type))

    if event.type == "checkout.session.completed":
        session = event.data.object

        purchased_products = stripe.checkout.Session.list_line_items(
                    session.id, limit=100
                )

        print("PURCHASED PRODUCTS: ", purchased_products)

        updateInventory(purchased_products)



    else:
        print("Unhandled event type {}".format(event.type))
    return HttpResponse(status=200)


class StripeChechOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        line_items = formatStripeLineItem(request.data)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                payment_method_types=["card"],
                mode="payment",
                shipping_address_collection={
                    "allowed_countries": ["AU", "US", "CA"],
                },
                success_url=settings.REACT_SITE_URL
                + "products?success=true&session_id={CHECKOUT_SESSION_ID}",
                cancel_url=settings.REACT_SITE_URL + "cart?canceled=true",
            )
            return Response({"checkout_url": checkout_session.url})
        except:
            return Response(
                {"error": "Something went wrong when creating stripe checkout session"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
