# Generated by Django 5.0.6 on 2024-10-31 17:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0007_courseschedule_is_lab'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_of_week', models.IntegerField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday')])),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
            options={
                'ordering': ['day_of_week', 'start_time'],
                'unique_together': {('day_of_week', 'start_time', 'end_time')},
            },
        ),
        migrations.DeleteModel(
            name='CourseScheduleTime',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='day_of_week',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='end_time',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='start_time',
        ),
        migrations.AddField(
            model_name='courseschedule',
            name='timeslot',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='schedule.timeslot'),
        ),
    ]