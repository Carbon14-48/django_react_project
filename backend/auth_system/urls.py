from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import stripe_webhook
from django.urls import path

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('api/accounts/', include('accounts.urls')),  # This is where your articles/me/change-password live
   
]

urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name="index.html")),
]
urlpatterns += [
    path('webhook/stripe/', stripe_webhook, name='stripe-webhook'),
]