from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics, permissions
from .models import Article
from .serializers import ArticleSerializer, UserDetailSerializer
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth import get_user_model
import json

User = get_user_model()

stripe.api_key = settings.STRIPE_SECRET_KEY


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserDetailSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        new_password_confirm = request.data.get("new_password_confirm")

        if not current_password or not new_password or not new_password_confirm:
            return Response({"detail": "Tous les champs sont necessaire."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"current_password": "Mot de passe actuel incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != new_password_confirm:
            return Response({"new_password_confirm": "La confirmation du nouveau mot de passe ne correspond pas."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"detail": "Mot de passe changé avec succès."}, status=status.HTTP_200_OK)

class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
class CreateStripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        YOUR_DOMAIN = "http://localhost:3000"  # Update for production
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 500,  # $5.00
                        'product_data': {'name': 'Premium Subscription'},
                    },
                    'quantity': 1,
                }],
                mode='payment',
                customer_email=request.user.email,
                success_url=YOUR_DOMAIN + '/dashboard?payment=success',
                cancel_url=YOUR_DOMAIN + '/dashboard?payment=cancel',
                metadata={'user_id': request.user.id},
            )
            return Response({'id': checkout_session.id, 'url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=400)
@csrf_exempt
def stripe_webhook(request):
    import stripe
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception as e:
        return HttpResponse(status=400)
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_id = session['metadata'].get('user_id')
        if user_id:
            user = User.objects.filter(id=user_id).first()
            if user:
                user.is_subscriber = True
                user.save()
    return HttpResponse(status=200)