# Generated by Django 5.0.6 on 2024-09-06 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0013_alter_professor_account'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='account',
        ),
    ]