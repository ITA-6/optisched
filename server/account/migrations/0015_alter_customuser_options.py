# Generated by Django 5.0.6 on 2024-11-15 01:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0014_alter_customuser_user_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ['-created_at']},
        ),
    ]