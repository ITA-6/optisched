# Generated by Django 5.0.6 on 2024-09-08 00:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_remove_customuser_department_and_more'),
        ('professor', '0014_remove_professor_account'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='Professor',
        ),
        migrations.AddField(
            model_name='customuser',
            name='professor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='professor.professor'),
        ),
    ]
