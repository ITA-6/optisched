# Generated by Django 5.0.6 on 2024-09-06 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0005_alter_professor_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
    ]
