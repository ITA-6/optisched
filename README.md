# OptiSched: University of Cabuyao Scheduling System

OptiSched is designed to automate scheduling that is tailored to the needs of the University of Cabuyao.

# Let's create a README file with the provided simplified explanation.

readme_content = """

# Genetic Algorithm Scheduling - Overview

This code uses a **genetic algorithm** to create a schedule for classes, balancing room availability, professor qualifications, time slots, and curriculum requirements.

---

## Step-by-Step Breakdown

1. **Initialize Data and Constraints**

   - Load **rooms**, **professors**, and **sections** that are active.
   - Load **time constraints** (start and end times) for scheduling.
   - Set up **day pairs** (e.g., Monday & Thursday) and time slots (e.g., 7:00 AM to 9:00 PM).

2. **Generate a Schedule for Each Section**

   - For each section (e.g., Year 1 - Section A), define what each "gene" (part of the solution) represents:
     - Course, professor, room, day pair, and timeslot.
   - Use a **fitness function** to rate each schedule based on how well it meets requirements:
     - Avoid overlapping times.
     - Ensure professors meet course requirements.
     - Respect daily limits for hours.
     - Ensure rooms are available.

3. **Fitness Function Rules**

   - Penalize schedules that:
     - Overlap course times.
     - Use unqualified professors.
     - Exceed daily hours.
     - Schedule classes outside allowed hours.
   - Reward schedules that avoid conflicts and meet requirements.

4. **Formatting Output**

   - Prepare the schedule to be **saved as JSON** and **cached** for quick access.
   - Each schedule includes information like course name, professor, room, day, and time.

5. **Run the Algorithm**
   - For each section, use the genetic algorithm to **generate the best possible schedule** by running multiple iterations.
   - Save and cache the final schedules in JSON format.

---

## Code Highlights

- **genetic_algorithm.py**: Main file for generating schedules.
- **GeneticAlgorithmRunner**: The class that manages data, constraints, and the genetic algorithm.
- **Fitness Function**: Rates schedules based on rules (avoiding overlaps, meeting qualifications, etc.).
- **Output**: Saves schedules as JSON for easy storage and access.

---

## Summary

This code generates optimized class schedules by running multiple "generations" in a genetic algorithm, adjusting schedules to avoid conflicts and meet course requirements. The best schedule for each section is then saved and ready for use.
"""
