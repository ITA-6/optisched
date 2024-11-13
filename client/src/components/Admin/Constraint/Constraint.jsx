import React, { useState, useEffect } from "react";
import api from "../../../api";

const Constraint = () => {
  const [constraints, setConstraints] = useState({
    transition_time: true,
    wait_time: true,
    daily_teaching_limit: true,
    room_occupancy: true,
    laboratory_sessions: true,
    employment_workload: {
      permanent: 0,
      temporary: 0,
      partTime: 0,
    },
    schedule: {
      startTime: "08:00",
      endTime: "18:00",
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConstraints = async () => {
    try {
      const response = await api.get("constraint/");
      setConstraints({
        ...constraints,
        ...response.data,
        employment_workload: {
          permanent: response.data?.permanent_workload ?? 0,
          temporary: response.data?.temporary_workload ?? 0,
          partTime: response.data?.part_time_workload ?? 0,
        },
        schedule: {
          startTime: response.data?.start_time ?? "08:00",
          endTime: response.data?.end_time ?? "18:00",
        },
      });
      setLoading(false);
    } catch (error) {
      setError("Failed to load constraints");
      setLoading(false);
    }
  };

  const saveConstraints = async () => {
    try {
      await api.put("constraint/", {
        transition_time: constraints.transition_time,
        wait_time: constraints.wait_time,
        daily_teaching_limit: constraints.daily_teaching_limit,
        room_occupancy: constraints.room_occupancy,
        laboratory_sessions: constraints.laboratory_sessions,
        permanent_workload: constraints.employment_workload.permanent,
        temporary_workload: constraints.employment_workload.temporary,
        part_time_workload: constraints.employment_workload.partTime,
        start_time: constraints.schedule.startTime,
        end_time: constraints.schedule.endTime,
      });
      alert("Constraints updated successfully!");
    } catch (error) {
      alert("Failed to update constraints");
    }
  };

  useEffect(() => {
    fetchConstraints();
  }, []);

  const handleCheckboxChange = (key) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNumberChange = (type, value) => {
    setConstraints((prev) => ({
      ...prev,
      employment_workload: {
        ...prev.employment_workload,
        [type]: value,
      },
    }));
  };

  const handleTimeChange = (field, value) => {
    setConstraints((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
      },
    }));
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-noto sm:text-sm md:text-base lg:text-lg xl:text-xl xm:text-xs">
      <div className="w-full max-w-4xl space-y-8 p-8">
        <div className="ml-20 mt-10 rounded-lg bg-white p-6 shadow-lg sm:ml-0 xm:ml-0">
          <h2 className="mb-6 text-xl font-semibold text-dark-green">
            <b>General Constraints</b>
          </h2>

          {/* General Constraints */}
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Transition Time:</b> Minimum of 30 minutes to 1 hour for
              transitions between rooms.
            </span>
            <ToggleSwitch
              isChecked={constraints.transition_time}
              onChange={() => handleCheckboxChange("transition_time")}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Wait Time:</b> Maximum wait time of 6 hours between courses.
            </span>
            <ToggleSwitch
              isChecked={constraints.wait_time}
              onChange={() => handleCheckboxChange("wait_time")}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Daily Teaching Limit:</b> Maximum of 6 teaching hours per day.
            </span>
            <ToggleSwitch
              isChecked={constraints.daily_teaching_limit}
              onChange={() => handleCheckboxChange("daily_teaching_limit")}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Room Occupancy:</b> Classrooms should not remain empty for
              extended periods.
            </span>
            <ToggleSwitch
              isChecked={constraints.room_occupancy}
              onChange={() => handleCheckboxChange("room_occupancy")}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Laboratory Sessions:</b> Classrooms with laboratory sessions
              must be located in the same building or area as the next scheduled
              session.
            </span>
            <ToggleSwitch
              isChecked={constraints.laboratory_sessions}
              onChange={() => handleCheckboxChange("laboratory_sessions")}
            />
          </div>

          {/* Employment Position Workload */}
          <div>
            <span>
              <b>Employment Position Workload:</b>
            </span>
            <div className="mt-2 flex gap-4">
              {["permanent", "temporary", "partTime"].map((type) => (
                <label key={type} className="flex flex-col items-center gap-1">
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <input
                    type="number"
                    value={constraints.employment_workload[type] ?? 0}
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

          {/* Schedule Constraint */}
          <div className="mt-6">
            <span>
              <b>Schedule:</b>
            </span>
            <div className="mt-2 flex gap-4">
              <label className="flex flex-col items-center">
                <span>Start Time</span>
                <input
                  type="time"
                  value={constraints.schedule.startTime ?? "08:00"}
                  onChange={(e) =>
                    handleTimeChange("startTime", e.target.value)
                  }
                  className="w-24 rounded-md border border-gray-300 p-1 text-center"
                />
              </label>
              <label className="flex flex-col items-center">
                <span>End Time</span>
                <input
                  type="time"
                  value={constraints.schedule.endTime ?? "18:00"}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  className="w-24 rounded-md border border-gray-300 p-1 text-center"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveConstraints}
            className="rounded-lg bg-green px-6 py-2 text-white shadow-md hover:bg-green"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Constraint;
