# Generated by Django 5.0.6 on 2024-10-30 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0006_coursescheduletime_alter_courseschedule_end_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseschedule',
            name='is_lab',
            field=models.BooleanField(default=False),
        ),
    ]
