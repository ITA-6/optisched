# Generated by Django 5.0.6 on 2024-09-08 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0019_professor_gender'),
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='handled_schedule',
            field=models.ManyToManyField(blank=True, to='schedule.schedule'),
        ),
    ]