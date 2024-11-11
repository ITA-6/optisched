import React from "react";
import { format, addMinutes, parse } from "date-fns";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Helper function to calculate the row span based on start and end time
const calculateRowSpan = (startTime, endTime) => {
  const start = parse(startTime, "h:mm a", new Date());
  const end = parse(endTime, "h:mm a", new Date());
  const differenceInMinutes = (end - start) / (1000 * 60); // Time difference in minutes
  return differenceInMinutes / 30; // Convert to 30-minute intervals
};

// Helper function to get consistent color based on course code
const getColorForCourse = (courseCode) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-orange-500", "bg-green"];
  const index = courseCode.charCodeAt(0) % colors.length;

  return colors[index];
};

// Function to find the course for a specific day and timeslot
const findCourseForSlot = (day, timeslot, scheduleData, type) => {
  if (!Array.isArray(scheduleData)) {
    console.error("scheduleData should be an array. Received:", scheduleData);
    return null;
  }

  for (const entry of scheduleData) {
    for (const course of entry.courses) {
      const timeRange =
        type === "LECTURE" ? course.lecture_time_range : course.lab_time_range;
      const room = type === "LECTURE" ? course.lecture_room : course.lab_room;

      if (
        timeRange &&
        timeRange.day_of_week === day &&
        timeRange.start_time === timeslot.start
      ) {
        const color = getColorForCourse(course.course.code);
        return {
          ...course,
          room: room ? `Room ${room.number}` : null,
          rowSpan: calculateRowSpan(timeRange.start_time, timeRange.end_time),
          type: type,
          color: color, // Apply the dynamic color based on course code
          section_label: entry.section_label,
          professor: entry.professor,
        };
      }
    }
  }
  return null;
};

const ScheduleRow = ({ timeslot, scheduleData = [] }) => {
  const renderedSlots = {};

  return (
    <tr className="h-[3rem] border-b bg-white">
      <td className="border">{`${timeslot.start} - ${timeslot.end}`}</td>
      {daysOfWeek.map((day) => {
        const lecture = findCourseForSlot(
          day,
          timeslot,
          scheduleData,
          "LECTURE",
        );
        const lab = findCourseForSlot(day, timeslot, scheduleData, "LAB");

        // Render lecture slot if available and not yet rendered
        if (lecture && !renderedSlots[`${day}-${timeslot.start}-LECTURE`]) {
          for (let i = 0; i < lecture.rowSpan; i++) {
            const slotTime = format(
              addMinutes(parse(timeslot.start, "h:mm a", new Date()), i * 30),
              "h:mm a",
            );
            renderedSlots[`${day}-${slotTime}-LECTURE`] = true;
          }

          return (
            <td
              key={`${day}-lecture`}
              className={`border text-white ${lecture.color}`}
              rowSpan={lecture.rowSpan}
            >
              <div className="flex flex-col p-1 text-xs">
                <p className="text-[0.6rem] font-light">
                  Class #{lecture.section_label}
                </p>
                <p className="text-base font-bold">{lecture.course.code}</p>
                <p>
                  {lecture.professor.first_name} {lecture.professor.last_name}
                </p>
                <p className="text-[0.7rem] font-light">({lecture.type})</p>
                <p className="text-[0.8rem] font-light">{lecture.room}</p>
              </div>
            </td>
          );
        }

        // Render lab slot if available and not yet rendered
        else if (lab && !renderedSlots[`${day}-${timeslot.start}-LAB`]) {
          for (let i = 0; i < lab.rowSpan; i++) {
            const slotTime = format(
              addMinutes(parse(timeslot.start, "h:mm a", new Date()), i * 30),
              "h:mm a",
            );
            renderedSlots[`${day}-${slotTime}-LAB`] = true;
          }

          return (
            <td
              key={`${day}-lab`}
              className={`border text-white ${lab.color}`}
              rowSpan={lab.rowSpan}
            >
              <div className="flex flex-col p-1 text-xs">
                <p className="text-[0.6rem] font-light">
                  Class #{lab.section_label}
                </p>
                <p className="text-base font-bold">{lab.course.code}</p>
                <p>
                  {lab.professor.first_name} {lab.professor.last_name}
                </p>
                <p className="text-[0.7rem] font-light">({lab.type})</p>
                <p className="text-[0.8rem] font-light">{lab.room}</p>
              </div>
            </td>
          );
        }
        // Render empty cell if no course is scheduled for this timeslot
        else if (!renderedSlots[`${day}-${timeslot.start}`]) {
          return <td key={day} className="border"></td>;
        } else {
          return null;
        }
      })}
    </tr>
  );
};

export default ScheduleRow;
