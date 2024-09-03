# Generated by Django 5.0.6 on 2024-09-02 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='current_hours',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='current_units',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='total_hours',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='course',
            name='total_units',
            field=models.IntegerField(default=0),
        ),
    ]
