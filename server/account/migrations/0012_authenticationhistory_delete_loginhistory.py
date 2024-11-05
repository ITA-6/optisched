# Generated by Django 5.0.6 on 2024-11-05 02:51

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_loginhistory'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthenticationHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('session', models.CharField(blank=True, choices=[('LOGIN', 'Login'), ('LOGOUT', 'Logout')], max_length=25, null=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('user_agent', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Login History',
                'verbose_name_plural': 'Login Histories',
            },
        ),
        migrations.DeleteModel(
            name='LoginHistory',
        ),
    ]