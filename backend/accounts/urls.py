from django.urls import path
from .views import (
    CurrentUserView,
    ChangePasswordView,
    ArticleListView,
    ArticleDetailView,
    CreateStripeCheckoutSession,
)

urlpatterns = [
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('create-checkout-session/', CreateStripeCheckoutSession.as_view(), name='create-checkout-session'),
]