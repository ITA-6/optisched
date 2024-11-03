# Generated by Django 5.0.6 on 2024-10-30 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0005_alter_courseschedule_end_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseScheduleTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AlterField(
            model_name='courseschedule',
            name='end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='courseschedule',
            name='start_time',
            field=models.TimeField(),
        ),
    ]
