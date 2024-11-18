import unittest
from unittest.mock import MagicMock, patch
from datetime import datetime, time, timedelta
from schedule.management.commands.genetic_algorithm import GeneticAlgorithmRunner
from room.models import Room
from professor.models import Professor
from curriculum.models import Curriculum
from section.models import Section
from constraint.models import Constraint
from django.test import TestCase


class GeneticAlgorithmRunnerTest(TestCase):
    def setUp(self):
        # Mock data setup
        self.rooms = [MagicMock(id=1, number="101"), MagicMock(id=2, number="102")]
        self.professors = [
            MagicMock(
                id=1,
                first_name="John",
                last_name="Doe",
                department="CS",
                required_units=15,
                has_masteral="Y",
            ),
            MagicMock(
                id=2,
                first_name="Jane",
                last_name="Smith",
                department="CS",
                required_units=15,
                has_masteral="N",
            ),
        ]
        self.sections = [
            MagicMock(
                id=1,
                label="Section A",
                year_level=1,
                program=MagicMock(id=1, name="BSCPE"),
                department=MagicMock(id=1, name="Engineering"),
                is_active=True,
            )
        ]
        self.courses = [
            MagicMock(
                id=1,
                code="CPE101",
                name="Introduction to Engineering",
                lecture_unit=3,
                lab_unit=1,
                lecture_hours=1.5,
                lab_hours=2,
                department="CS",
                need_masteral=False,
            ),
            MagicMock(
                id=2,
                code="CPE102",
                name="Programming Fundamentals",
                lecture_unit=3,
                lab_unit=1,
                lecture_hours=1.5,
                lab_hours=2,
                department="CS",
                need_masteral=True,
            ),
        ]
        self.constraints = MagicMock(
            start_time=time(7, 0),
            end_time=time(21, 0),
            wait_time=True,
        )
        self.curriculum = MagicMock(courses=self.courses, semester="FIRST_SEMESTER")

        # Patch models to use mock data
        patch("room.models.Room.objects.filter", return_value=self.rooms).start()
        patch(
            "professor.models.Professor.objects.filter", return_value=self.professors
        ).start()
        patch(
            "section.models.Section.objects.filter", return_value=self.sections
        ).start()
        patch(
            "curriculum.models.Curriculum.objects.filter",
            return_value=[self.curriculum],
        ).start()
        patch(
            "constraint.models.Constraint.objects.first", return_value=self.constraints
        ).start()

    def tearDown(self):
        patch.stopall()

    def test_generate_schedule_for_section(self):
        runner = GeneticAlgorithmRunner()
        curriculum_courses = self.courses

        schedule = runner.generate_schedule_for_section(
            section=self.sections[0], curriculum_courses=curriculum_courses
        )

        # Assert the schedule is not empty
        self.assertIsNotNone(schedule)
        self.assertGreater(len(schedule), 0)

        # Check if all courses are assigned
        assigned_courses = {entry[0] for entry in schedule}
        self.assertEqual(len(assigned_courses), len(curriculum_courses))

    def test_format_schedule_output(self):
        runner = GeneticAlgorithmRunner()
        schedule = [
            (
                self.courses[0],
                self.professors[0],
                self.rooms[0],
                (0, 3),  # Monday and Thursday
                0,  # First timeslot
            )
        ]
        formatted_output = runner.format_schedule_output(
            section=self.sections[0], curriculum=self.curriculum, schedule=schedule
        )

        # Check the structure of the output
        self.assertIn("year_level", formatted_output)
        self.assertIn("semester", formatted_output)
        self.assertIn("program_name", formatted_output)
        self.assertIn("courses", formatted_output)
        self.assertGreater(len(formatted_output["courses"]), 0)

    def test_serialize_schedule(self):
        runner = GeneticAlgorithmRunner()
        schedule = [
            (
                self.courses[0],
                self.professors[0],
                self.rooms[0],
                (0, 3),  # Monday and Thursday
                0,  # First timeslot
            )
        ]
        serialized_schedule = runner.serialize_schedule(
            schedule=schedule, section=self.sections[0], semester="FIRST_SEMESTER"
        )

        # Assert serialized structure
        self.assertIn("courses", serialized_schedule)
        self.assertGreater(len(serialized_schedule["courses"]), 0)
        self.assertEqual(serialized_schedule["semester"], "FIRST_SEMESTER")
        self.assertEqual(serialized_schedule["year_level"], self.sections[0].year_level)

    def test_save_all_schedules_to_json(self):
        runner = GeneticAlgorithmRunner()
        all_schedules = {
            self.sections[0].id: {
                "year_level": self.sections[0].year_level,
                "semester": "FIRST_SEMESTER",
                "courses": [],
            }
        }
        with patch("builtins.open", unittest.mock.mock_open()) as mock_file:
            runner.save_all_schedules_to_json(all_schedules)
            mock_file.assert_called_once_with("generated_schedules.json", "w")

    def test_run(self):
        runner = GeneticAlgorithmRunner()
        with patch.object(runner, "generate_schedule_for_section", return_value=[]):
            output = runner.run()

        # Assert output is not None and matches section count
        self.assertIsNotNone(output)
        self.assertEqual(len(output), len(self.sections))


if __name__ == "__main__":
    unittest.main()
