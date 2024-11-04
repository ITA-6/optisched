# Generated by Django 5.0.6 on 2024-10-28 15:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0010_alter_course_code'),
        ('department', '0001_initial'),
        ('professor', '0027_remove_professor_adivisee_professor_advisee'),
        ('program', '0004_program_acronym'),
        ('room', '0003_room_room_category'),
        ('schedule', '0003_remove_schedule_course_schedule_courses_and_more'),
        ('section', '0008_remove_section_adviser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedule',
            name='day_of_week',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='end_time',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='professor',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='room',
        ),
        migrations.RemoveField(
            model_name='schedule',
            name='start_time',
        ),
        migrations.AlterField(
            model_name='schedule',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='department.department'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='program.program'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='section',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='section.section'),
        ),
        migrations.CreateModel(
            name='CourseSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_of_week', models.IntegerField(default=0)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='course.course')),
                ('professor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='professor.professor')),
                ('room', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='room.room')),
            ],
            options={
                'db_table': 'course_schedule',
            },
        ),
        migrations.AlterField(
            model_name='schedule',
            name='courses',
            field=models.ManyToManyField(blank=True, to='schedule.courseschedule'),
        ),
    ]