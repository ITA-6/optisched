# Generated by Django 5.0.6 on 2024-09-06 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0008_remove_professor_account'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='date_of_birth',
        ),
    ]
