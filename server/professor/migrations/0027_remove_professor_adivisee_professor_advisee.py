# Generated by Django 5.0.6 on 2024-10-26 15:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0026_professor_adivisee'),
        ('section', '0008_remove_section_adviser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='adivisee',
        ),
        migrations.AddField(
            model_name='professor',
            name='advisee',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='adviser', to='section.section'),
        ),
    ]
