# Generated by Django 5.0.6 on 2024-10-26 15:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0025_alter_professor_handled_schedule'),
        ('section', '0007_section_department_alter_section_program'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='adivisee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='section.section'),
        ),
    ]