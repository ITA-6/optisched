# Generated by Django 5.0.6 on 2024-11-22 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0014_alter_course_options'),
        ('professor', '0032_alter_professor_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='course_specialization',
            field=models.ManyToManyField(to='course.course'),
        ),
    ]