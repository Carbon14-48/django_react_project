# Generated by Django 4.2.1 on 2025-07-23 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_article_useraccount_is_subscriber_and_more'),
    ]

    operations = [
       migrations.AddField(
    model_name='useraccount',
    name='username',
    field=models.CharField(max_length=150, blank=True, null=True),
),
    ]
