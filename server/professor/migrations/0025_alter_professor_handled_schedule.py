# Generated by Django 5.0.6 on 2024-09-10 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0024_alter_professor_birth_date'),
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='handled_schedule',
            field=models.ManyToManyField(blank=True, related_name='professors', to='schedule.schedule'),
        ),
    ]
