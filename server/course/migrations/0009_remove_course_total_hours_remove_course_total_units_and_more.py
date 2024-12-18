# Generated by Django 5.0.6 on 2024-10-17 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0008_remove_course_current_hours_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='total_hours',
        ),
        migrations.RemoveField(
            model_name='course',
            name='total_units',
        ),
        migrations.AddField(
            model_name='course',
            name='co_requisites',
            field=models.ManyToManyField(blank=True, related_name='course_co_requisites', to='course.course'),
        ),
        migrations.AddField(
            model_name='course',
            name='lab_hours',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='lab_unit',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='lecture_hours',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='lecture_unit',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='pre_requisites',
            field=models.ManyToManyField(blank=True, related_name='course_pre_requisites', to='course.course'),
        ),
    ]
