# Generated by Django 5.0.6 on 2024-09-06 20:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0007_alter_professor_date_of_birth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='account',
        ),
    ]