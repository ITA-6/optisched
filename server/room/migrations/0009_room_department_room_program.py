# Generated by Django 5.0.6 on 2024-11-18 19:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('department', '0002_alter_department_acronym_alter_department_name'),
        ('program', '0007_alter_program_options'),
        ('room', '0008_alter_room_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='department.department'),
        ),
        migrations.AddField(
            model_name='room',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='program.program'),
        ),
    ]
