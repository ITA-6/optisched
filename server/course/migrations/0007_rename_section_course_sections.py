# Generated by Django 5.0.6 on 2024-09-14 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0006_course_section'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='section',
            new_name='sections',
        ),
    ]
