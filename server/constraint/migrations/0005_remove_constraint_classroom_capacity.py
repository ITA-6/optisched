# Generated by Django 5.0.6 on 2024-11-12 23:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('constraint', '0004_remove_constraint_teaching_load'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='constraint',
            name='classroom_capacity',
        ),
    ]