# schedule/management/commands/allocate_courses.py

from django.core.management.base import BaseCommand
from curriculum.models import Curriculum
from section.models import Section
from schedule.models import Schedule


class Command(BaseCommand):
    help = "Generate a basic schedule by allocating courses to each section based on the curriculum."

    def handle(self, *args, **options):
        # Fetch all curriculum entries with active programs
        curriculum_entries = Curriculum.objects.filter(program__is_active=True)

        # Process each curriculum entry
        for curriculum in curriculum_entries:
            self.allocate_courses_to_sections(curriculum)

        self.stdout.write(
            self.style.SUCCESS("Completed basic course allocation to sections.")
        )

    def allocate_courses_to_sections(self, curriculum):
        """Allocates each course in the curriculum to the relevant sections."""
        sections = self.get_sections_for_curriculum(curriculum)

        for course in curriculum.courses.all():
            for section in sections:
                self.allocate_course_to_section(curriculum, course, section)

    def get_sections_for_curriculum(self, curriculum):
        """Retrieve active sections for a given curriculum's program and year level."""
        return Section.objects.filter(
            program=curriculum.program,
            year_level=curriculum.year_level,
            is_active=True,
        )

    def allocate_course_to_section(self, curriculum, course, section):
        """Allocates a course to a section by creating or updating the schedule."""
        # Check if there's an existing schedule entry
        existing_schedule = Schedule.objects.filter(
            year_level=curriculum.year_level,
            semester=curriculum.semester,
            program=curriculum.program,
            department=curriculum.department,
            section=section,
            is_active=True,
        ).first()

        # If no schedule exists, create a new one and add the course
        if not existing_schedule:
            self.create_schedule_entry(curriculum, course, section)
        else:
            self.update_existing_schedule(existing_schedule, course, section)

    def create_schedule_entry(self, curriculum, course, section):
        """Create a new schedule entry for the given course and section."""
        schedule_entry = Schedule.objects.create(
            year_level=curriculum.year_level,
            semester=curriculum.semester,
            program=curriculum.program,
            department=curriculum.department,
            section=section,
            is_active=True,
        )
        schedule_entry.courses.add(course)  # Add course to M2M field
        self.stdout.write(
            f"Allocated course {course.code} to section {section.label} for {curriculum.semester}, Year {curriculum.year_level}"
        )

    def update_existing_schedule(self, schedule, course, section):
        """Update an existing schedule entry to include a new course if it's not already added."""
        if not schedule.courses.filter(id=course.id).exists():
            schedule.courses.add(course)
            self.stdout.write(
                f"Added course {course.code} to existing schedule for section {section.label} in {schedule.semester}, Year {schedule.year_level}"
            )
        else:
            self.stdout.write(
                f"Schedule already includes course {course.code} in section {section.label}"
            )
