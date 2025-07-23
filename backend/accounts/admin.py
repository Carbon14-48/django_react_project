from django.contrib import admin
from .models import Article, UserAccount

admin.site.register(Article)
admin.site.register(UserAccount)