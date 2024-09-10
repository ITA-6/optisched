# Generated by Django 5.0.6 on 2024-09-09 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_customuser_options_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={},
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='user_permissions',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_login',
            field=models.DateTimeField(null=True),
        ),
    ]