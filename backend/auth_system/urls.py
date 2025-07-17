from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import CurrentUserView, ChangePasswordView  # importer ChangePasswordView aussi

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    # Route pour current user
    path('accounts/me/', CurrentUserView.as_view(), name='current-user'),

    # Route pour changer le mot de passe
    path('auth/change-password/', ChangePasswordView.as_view(), name='change-password'),
]

urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name="index.html")),
]

