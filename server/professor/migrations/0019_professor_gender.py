# Generated by Django 5.0.6 on 2024-09-08 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0018_professor_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], default='O', max_length=10),
        ),
    ]
