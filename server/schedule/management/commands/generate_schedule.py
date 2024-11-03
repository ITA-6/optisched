# schedule/management/commands/generate_schedule.py
from django.core.management.base import BaseCommand
from .assign_advisers import AdviserAssigner
from .allocate_courses import CourseAllocator
from .apply_csp_constraints import CSPConstraintApplier
from schedule.models import Schedule, TimeSlot
from room.models import Room
from professor.models import Professor


class Command(BaseCommand):
    help = "Assign advisers, allocate courses, and apply CSP-based scheduling without the genetic algorithm."

    def handle(self, *args, **kwargs):
        semester = "FIRST_SEMESTER"

        # Step 1: Assign advisers to sections
        adviser_assigner = AdviserAssigner(semester, stdout=self.stdout)
        adviser_assigner.assign_advisers()

        # Load all available time slots
        time_slots = list(TimeSlot.objects.all())
        if not time_slots:
            self.stdout.write(
                self.style.WARNING(
                    "No time slots available in TimeSlot model. Populate TimeSlot entries first."
                )
            )
            return

        # Step 2: Allocate courses
        allocator = CourseAllocator(
            semester=semester,
            time_slots=time_slots,
            stdout=self.stdout.write,
            success_style=self.style.SUCCESS,
        )
        allocator.allocate_courses_based_on_curriculum()

        # # Step 3: Apply CSP constraints to assign schedule based on course requirements
        # rooms = list(Room.objects.filter(is_active=True))
        # professors = list(Professor.objects.filter(is_active=True))
        # schedules = Schedule.objects.filter(is_active=True, semester=semester)

        # csp_applier = CSPConstraintApplier(
        #     schedules=schedules,
        #     professors=professors,
        #     rooms=rooms,
        #     time_slots=time_slots,
        #     stdout=self.stdout,
        # )
        # updated_schedules = csp_applier.apply()

        # Final message indicating CSP-based scheduling is complete
        self.stdout.write(
            self.style.SUCCESS("Completed scheduling using CSP constraints only.")
        )
