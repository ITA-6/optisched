# Generated by Django 5.0.6 on 2024-09-10 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professor', '0022_alter_professor_has_masteral'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='has_masteral',
            field=models.CharField(choices=[('Y', 'Yes'), ('N', 'No')], default='Y', max_length=3),
        ),
    ]
