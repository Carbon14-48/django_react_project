from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'username', 
            'first_name',
            'last_name',
            'date_joined',
            'is_subscriber'
        )
        read_only_fields = ('id', 'email', 'date_joined', 'is_subscriber')

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'summary', 'body', 'created_at']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = self.context['request'].user
        body = rep['body']
        if not user.is_authenticated:
            rep['body'] = body[:len(body)//3] + "..."
        elif not getattr(user, "is_subscriber", False):
            rep['body'] = body[:2*len(body)//3] + "..."
        # else: full body
        return rep