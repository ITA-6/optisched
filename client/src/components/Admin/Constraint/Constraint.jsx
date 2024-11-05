import React, { useState } from "react";

const Constraint = () => {
  const [studentConstraints, setStudentConstraints] = useState({
    transitionTime: true,
    waitTime: true,
  });

  const [professorConstraints, setProfessorConstraints] = useState({
    teachingLoad: true,
    dailyTeachingLimit: true,
    employmentWorkload: {
      permanent: 0,
      temporary: 0,
      partTime: 0,
    },
  });

  const [classroomConstraints, setClassroomConstraints] = useState({
    classroomCapacity: true,
    roomOccupancy: true,
    laboratorySessions: true,
  });

  const handleCheckboxChange = (section, key) => {
    if (section === "student") {
      setStudentConstraints({
        ...studentConstraints,
        [key]: !studentConstraints[key],
      });
    } else if (section === "professor") {
      setProfessorConstraints({
        ...professorConstraints,
        [key]: !professorConstraints[key],
      });
    } else if (section === "classroom") {
      setClassroomConstraints({
        ...classroomConstraints,
        [key]: !classroomConstraints[key],
      });
    }
  };

  const handleNumberChange = (type, value) => {
    setProfessorConstraints({
      ...professorConstraints,
      employmentWorkload: {
        ...professorConstraints.employmentWorkload,
        [type]: value,
      },
    });
  };

  const ToggleSwitch = ({ isChecked, onChange }) => (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div className="relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-dark-green peer-checked:after:translate-x-full peer-focus:ring-4 peer-focus:ring-dark-green dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-dark-green"></div>
    </label>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-noto">
      <div className="w-full max-w-4xl space-y-8 p-8">
        {/* Student Constraints */}
        <div className="ml-20 mt-10 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-dark-green">
            <b>Student Constraints</b>
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Transition Time:</b> Minimum of 30 minutes to 1 hour for
              transitions between rooms.
            </span>
            <ToggleSwitch
              isChecked={studentConstraints.transitionTime}
              onChange={() => handleCheckboxChange("student", "transitionTime")}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>
              <b>Wait Time:</b> Maximum wait time of 6 hours between courses
            </span>
            <ToggleSwitch
              isChecked={studentConstraints.waitTime}
              onChange={() => handleCheckboxChange("student", "waitTime")}
            />
          </div>
        </div>

        {/* Professor Constraints */}
        <div className="ml-20 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-dark-green">
            <b>Professor Constraints</b>
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Teaching Load:</b> Professors should not teach two different
              courses simultaneously.
            </span>
            <ToggleSwitch
              isChecked={professorConstraints.teachingLoad}
              onChange={() => handleCheckboxChange("professor", "teachingLoad")}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Daily Teaching Limit:</b> Maximum of 6 teaching hours per day
            </span>
            <ToggleSwitch
              isChecked={professorConstraints.dailyTeachingLimit}
              onChange={() =>
                handleCheckboxChange("professor", "dailyTeachingLimit")
              }
            />
          </div>
          <div>
            <span>
              <b>Employment Position Workload:</b>
            </span>
            <div className="mt-2 flex gap-4">
              {["Permanent", "Temporary", "Part-time"].map((type) => (
                <label key={type} className="flex flex-col items-center gap-1">
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <input
                    type="number"
                    value={professorConstraints.employmentWorkload[type]}
                    onChange={(e) =>
                      handleNumberChange(type, Number(e.target.value))
                    }
                    className="w-20 rounded-md border border-gray-300 p-1 text-center"
                    min="0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Classroom Utilization Constraints */}
        <div className="ml-20 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-dark-green">
            <b>Classroom Utilization Constraints</b>
          </h2>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Classroom Capacity:</b> Each classroom should accommodate up to
              50 students.
            </span>
            <ToggleSwitch
              isChecked={classroomConstraints.classroomCapacity}
              onChange={() =>
                handleCheckboxChange("classroom", "classroomCapacity")
              }
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Room Occupancy:</b> Classrooms should not remain empty for
              extended periods.
            </span>
            <ToggleSwitch
              isChecked={classroomConstraints.roomOccupancy}
              onChange={() =>
                handleCheckboxChange("classroom", "roomOccupancy")
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span>
              <b>Laboratory Sessions:</b> Classrooms with laboratory sessions
              must be located in <br></br>the same building or area as the next
              scheduled session.
            </span>
            <ToggleSwitch
              isChecked={classroomConstraints.laboratorySessions}
              onChange={() =>
                handleCheckboxChange("classroom", "laboratorySessions")
              }
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button className="rounded-lg bg-green px-6 py-2 text-white shadow-md hover:bg-green">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Constraint;
