from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),          # <-- ajoute cette ligne pour admin
    path('api/', include('auth_system.urls')), # tes routes API/auth
]

