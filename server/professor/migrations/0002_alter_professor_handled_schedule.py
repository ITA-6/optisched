# Generated by Django 5.0.6 on 2024-08-28 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0001_initial'),
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='handled_schedule',
            field=models.ManyToManyField(null=True, to='schedule.schedule'),
        ),
    ]
