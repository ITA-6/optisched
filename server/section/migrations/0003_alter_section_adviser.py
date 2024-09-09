# Generated by Django 5.0.6 on 2024-09-08 16:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0021_alter_professor_current_units_and_more'),
        ('section', '0002_section_created_at_section_is_active_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='adviser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='professor.professor'),
        ),
    ]
