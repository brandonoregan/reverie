from django.http import HttpResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


from base.serializers import UserSerializer, ProductSerializer, UserSerializerWithToken

from .models import Product


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from .view_utils import formatStripeLineItem

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import stripe
from django.conf import settings


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
WEBHOOK_SIGNING_SECRET = settings.WEBHOOK_SIGNING_SECRET


@csrf_exempt
@require_POST
def stripe_webhook(request):
    event = None
    payload = request.body
    sig_header = request.headers['STRIPE_SIGNATURE']

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
    if event.type == 'payment_intent.succeeded':
      payment_intent = event.data.object
      print("HANDLE DB UPDATE: ", payment_intent)
    else:
      print('Unhandled event type {}'.format(event.type))

    if event.type == 'checkout.session.completed':
      session = event.data.object

      print("STRIPE SESSION LIST DATA", stripe.checkout.Session.list_line_items(session.id, limit=100))

      purchased_products = stripe.checkout.Session.list_line_items(session.id, limit=100)

      for product in purchased_products:
          db_product = Product.objects.get(name=product.description)
          db_product.stock_count -= product.quantity
          db_product.save()

    else:
      print('Unhandled event type {}'.format(event.type))
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
                shipping_address_collection={'allowed_countries': ['AU', 'US', 'CA'],},
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


