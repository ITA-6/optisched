import React, { useState, useEffect } from "react";
import api from "../../../api";
import completeMark from "../../../assets/completeMark.png";
import failedMark from "../../../assets/FailedMark.png";
import loadingVideo from "../../../assets/loadingVideo.mp4";

const Constraint = () => {
  const [constraints, setConstraints] = useState({
    semester: "FIRST_SEMESTER",
    transition_time_value: 30,
    wait_time_value: 6,
    teaching_time_value: 6,
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
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchConstraints = async () => {
    try {
      setLoading(true);
      const response = await api.get("constraint/");
      setConstraints((prev) => ({
        ...prev,
        ...response.data,
        employment_workload: {
          permanent: response.data?.permanent_workload || 0,
          temporary: response.data?.temporary_workload || 0,
          partTime: response.data?.part_time_workload || 0,
        },
        schedule: {
          startTime: response.data?.start_time || "08:00",
          endTime: response.data?.end_time || "18:00",
        },
      }));
    } catch (err) {
      setError("Failed to load constraints");
    } finally {
      setLoading(false);
    }
  };

  const saveConstraints = async () => {
    setSaving(true);
    try {
      await api.put("constraint/", {
        semester: constraints.semester,
        transition_time_value: constraints.transition_time_value,
        wait_time_value: constraints.wait_time_value,
        teaching_time_value: constraints.teaching_time_value,
        permanent_workload: constraints.employment_workload.permanent,
        temporary_workload: constraints.employment_workload.temporary,
        part_time_workload: constraints.employment_workload.partTime,
        start_time: constraints.schedule.startTime,
        end_time: constraints.schedule.endTime,
      });
      setSuccess("Constraints updated successfully!");
      setError(null);
    } catch (err) {
      setError("Failed to update constraints");
      setSuccess(null);
    } finally {
      setSaving(false);
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
    }
  };

  const handleInputChange = (field, value) => {
    setConstraints((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setConstraints((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    fetchConstraints();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-noto sm:text-sm md:text-base lg:text-lg xl:text-xl xm:text-xs">
      <div className="w-full max-w-4xl space-y-8 p-8">
        <div className="ml-20 mt-10 rounded-lg bg-white p-6 shadow-lg sm:ml-0 xm:ml-0">
          <h2 className="mb-6 text-xl font-semibold text-dark-green">
            <b>Scheduling Constraints</b>
          </h2>

          {/* Semester */}
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Semester:</b>
              <select
                value={constraints.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                className="ml-2 rounded border px-2 py-1"
              >
                <option value="FIRST_SEMESTER">First Semester</option>
                <option value="SECOND_SEMESTER">Second Semester</option>
              </select>
            </span>
          </div>

          {/* Transition Time */}
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Transition Time:</b>
              <input
                type="number"
                min="30"
                max="60"
                step="1"
                className="ml-2 rounded border px-2 py-1"
                value={constraints.transition_time_value}
                onChange={(e) =>
                  handleInputChange(
                    "transition_time_value",
                    Number(e.target.value),
                  )
                }
              />{" "}
              minutes transition time between rooms.
            </span>
          </div>

          {/* Wait Time */}
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Wait Time:</b> Maximum wait time of{" "}
              <input
                type="number"
                className="ml-2 w-20 rounded border px-2 py-1"
                value={constraints.wait_time_value}
                onChange={(e) =>
                  handleInputChange("wait_time_value", Number(e.target.value))
                }
              />{" "}
              hours between courses.
            </span>
          </div>

          {/* Daily Teaching Limit */}
          <div className="mb-4 flex items-center justify-between">
            <span>
              <b>Daily Teaching Limit:</b> Maximum of{" "}
              <input
                type="number"
                className="ml-2 w-20 rounded border px-2 py-1"
                value={constraints.teaching_time_value}
                onChange={(e) =>
                  handleInputChange(
                    "teaching_time_value",
                    Number(e.target.value),
                  )
                }
              />{" "}
              teaching hours per day.
            </span>
          </div>

          {/* Employment Workload */}
          <div className="mb-4">
            <span>
              <b>Employment Position Workload:</b>
            </span>
            <div className="mt-2 flex gap-4">
              {["permanent", "temporary", "partTime"].map((type) => (
                <label key={type} className="flex flex-col items-center gap-1">
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <input
                    type="number"
                    value={constraints.employment_workload[type]}
                    onChange={(e) =>
                      handleNestedChange(
                        "employment_workload",
                        type,
                        Number(e.target.value),
                      )
                    }
                    className="w-20 rounded-md border border-gray-300 p-1 text-center"
                    min="0"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-6">
            <span>
              <b>Schedule:</b>
            </span>
            <div className="mt-2 flex gap-4">
              <label className="flex flex-col items-center">
                <span>Start Time</span>
                <input
                  type="time"
                  value={constraints.schedule.startTime}
                  onChange={(e) =>
                    handleNestedChange("schedule", "startTime", e.target.value)
                  }
                  className="rounded-md border border-gray-300 p-1 text-center"
                />
              </label>
              <label className="flex flex-col items-center">
                <span>End Time</span>
                <input
                  type="time"
                  value={constraints.schedule.endTime}
                  onChange={(e) =>
                    handleNestedChange("schedule", "endTime", e.target.value)
                  }
                  className="rounded-md border border-gray-300 p-1 text-center"
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
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {(saving || success || error) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-auto w-1/4 rounded-lg bg-white shadow-lg">
            {saving ? (
              <div className="flex h-10 flex-col items-center justify-center py-10">
                <video
                  src={loadingVideo}
                  autoPlay
                  loop
                  className="translate-x-0 transform rounded-lg"
                />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10">
                <img src={failedMark} alt="Failed" className="w-24" />
                <p>{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <img src={completeMark} alt="Success" className="w-24" />
                <p>{success}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Constraint;
