from django.test import TestCase
from unittest.mock import patch, MagicMock
from datetime import time
from schedule.management.commands.genetic_algorithm import GeneticAlgorithmRunner
from room.models import Room
from professor.models import Professor
from curriculum.models import Curriculum
from section.models import Section
from constraint.models import Constraint
from course.models import Course
from building.models import Building
from department.models import Department
from program.models import Program


class GeneticAlgorithmRunnerTests(TestCase):
    def setUp(self):
        # Create mock data for Building with available rooms
        self.building = Building.objects.create(
            name="Main Building",
            total_rooms=10,
            available_rooms=10,
        )

        # Create mock data for Department and Program
        self.department = Department.objects.create(name="Computer Science")
        self.program = Program.objects.create(
            name="BS Computer Science",
            department=self.department,
        )

        # Create mock data for Rooms
        self.room1 = Room.objects.create(
            number=101,
            floor=1,
            building=self.building,
            department=self.department,
            program=self.program,
            room_category="LECTURE",
            is_active=True,
        )
        self.room2 = Room.objects.create(
            number=102,
            floor=1,
            building=self.building,
            department=self.department,
            program=self.program,
            room_category="LABORATORY",
            is_active=True,
        )

        # Create mock data for Professors with prof_id
        self.professor1 = Professor.objects.create(
            prof_id="2101263",
            first_name="John",
            last_name="Doe",
            department=self.department,
            is_active=True,
            required_units=12,
        )
        self.professor2 = Professor.objects.create(
            prof_id="2101264",
            first_name="Jane",
            last_name="Smith",
            department=self.department,
            is_active=True,
            required_units=9,
        )

        # Create mock data for Courses
        self.course1 = Course.objects.create(
            code="CS101",
            name="Intro to CS",
            lecture_unit=3,
            lab_unit=1,
            department=self.department,
        )
        self.course2 = Course.objects.create(
            code="CS102",
            name="Data Structures",
            lecture_unit=3,
            lab_unit=0,
            department=self.department,
        )

        # Create a Curriculum
        self.curriculum = Curriculum.objects.create(
            year_level=1,
            semester="FIRST_SEMESTER",
            program=self.program,
            department=self.department,
        )
        self.curriculum.courses.add(self.course1, self.course2)

        # Create a Section
        self.section = Section.objects.create(
            label="1A",
            year_level=1,
            program=self.program,
            is_active=True,
        )

        # Create a Constraint
        self.constraint = Constraint.objects.create(
            start_time=time(7, 0),
            end_time=time(20, 0),
            semester=1,
        )

        self.runner = GeneticAlgorithmRunner()

    def test_generate_schedule_for_section(self):
        # Generate schedule
        curriculum_courses = [self.course1, self.course2]
        schedule = self.runner.generate_schedule_for_section(
            self.section, curriculum_courses
        )

        # Assert that schedule is not empty
        self.assertGreater(len(schedule), 0)

        # Assert that all courses in the curriculum are included in the schedule
        scheduled_courses = {entry[0] for entry in schedule}
        self.assertSetEqual(set(curriculum_courses), scheduled_courses)

        # Assert that professor and room are assigned
        for entry in schedule:
            course, professor, room, day_pair, timeslot = entry
            self.assertIn(professor, [self.professor1, self.professor2])
            self.assertIn(room, [self.room1, self.room2])

    def test_serialize_schedule(self):
        # Generate schedule
        curriculum_courses = [self.course1, self.course2]
        schedule = self.runner.generate_schedule_for_section(
            self.section, curriculum_courses
        )

        # Serialize schedule
        serialized_schedule = self.runner.serialize_schedule(
            schedule, self.section, self.constraint.semester
        )

        # Assert serialized structure
        self.assertIn("courses", serialized_schedule)
        self.assertEqual(len(serialized_schedule["courses"]), len(curriculum_courses))
        for course_entry in serialized_schedule["courses"]:
            self.assertIn("course_id", course_entry)
            self.assertIn("professor_id", course_entry)
            self.assertIn("lecture_time_range", course_entry)

    def test_format_schedule_output(self):
        # Generate schedule
        curriculum_courses = [self.course1, self.course2]
        schedule = self.runner.generate_schedule_for_section(
            self.section, curriculum_courses
        )

        # Format schedule for output
        formatted_output = self.runner.format_schedule_output(
            self.section, self.curriculum, schedule
        )

        # Assert output structure
        self.assertIn("courses", formatted_output)
        self.assertEqual(len(formatted_output["courses"]), len(curriculum_courses))
        for course_entry in formatted_output["courses"]:
            self.assertIn("course_code", course_entry)
            self.assertIn("professor_name", course_entry)
            self.assertIn("lecture_time_range", course_entry)

    @patch("schedule.management.commands.genetic_algorithm.pygad.GA")
    def test_fitness_function_integration(self, MockGA):
        # Mock GA behavior to test integration
        mock_ga_instance = MagicMock()
        mock_ga_instance.best_solution.return_value = ([0, 0, 0, 0] * 2, 0, 0)
        MockGA.return_value = mock_ga_instance

        curriculum_courses = [self.course1, self.course2]
        schedule = self.runner.generate_schedule_for_section(
            self.section, curriculum_courses
        )

        # Assert that the genetic algorithm ran
        mock_ga_instance.run.assert_called_once()

        # Assert that schedule contains all curriculum courses
        self.assertEqual(len(schedule), len(curriculum_courses))
