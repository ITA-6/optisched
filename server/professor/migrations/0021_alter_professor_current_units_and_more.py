# Generated by Django 5.0.6 on 2024-09-08 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0020_alter_professor_handled_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='current_units',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='professor',
            name='required_units',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
