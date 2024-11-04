# Generated by Django 5.0.6 on 2024-11-02 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0011_remove_courseschedule_is_lab_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courseschedule',
            name='lab_end_time',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='lecture_end_time',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='lab_timeslot',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='lecture_timeslot',
        ),
        migrations.AddField(
            model_name='courseschedule',
            name='lab_timeslot',
            field=models.ManyToManyField(blank=True, null=True, related_name='lab_times', to='schedule.timeslot'),
        ),
        migrations.AddField(
            model_name='courseschedule',
            name='lecture_timeslot',
            field=models.ManyToManyField(blank=True, null=True, related_name='lecture_times', to='schedule.timeslot'),
        ),
    ]