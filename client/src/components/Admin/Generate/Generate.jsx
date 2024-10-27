import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api"; // Import Axios for API requests
import { departments } from "./data";
import loadingVideo from "../../../assets/loadingVideo.mp4";

const Generate = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("CSS");
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    setSelectedDepartment("CSS");
    const fetchData = async () => {
      setLoading(true); // Show loading screen
      try {
        const response = await api.get("schedule/list/");
        setScheduleData(response.data);
      } catch (err) {
        setError("Error fetching schedule");
      } finally {
        setLoading(false); // Hide loading screen when data is fetched
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
    setScheduleData([]); // Clear the schedule data when switching departments
  };

  const handleRowClick = (name) => {
    navigate(`/admin/generated/${encodeURIComponent(name)}`); // Navigate to details page with the name
  };

  const handleGenerateSchedule = async () => {
    setLoading(true); // Show loading screen
    setError(null);
    try {
      const response = await api.get("schedule/generate/"); // API request to generate schedule
      setScheduleData(response.data); // Set the generated schedule data
    } catch (err) {
      setError("Error generating schedule");
    } finally {
      setLoading(false); // Hide loading screen after operation
    }
  };

  const handleConfirmSchedule = async () => {
    setLoading(true); // Show loading screen
    setError(null);
    try {
      await api.post("schedule/confirm/", scheduleData); // API request to confirm and save schedule
      alert("Schedule confirmed and saved!");
    } catch (err) {
      setError("Error confirming schedule");
    } finally {
      setLoading(false); // Hide loading screen
    }
  };

  const filteredData = departments.filter(
    (item) => item.department === selectedDepartment,
  );

  return (
    <div className="h-screen bg-white">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <video
            src={loadingVideo}
            autoPlay
            loop
            className="h-[50vh] w-[50vw] translate-x-20 transform"
          />
        </div>
      ) : (
        // Main content is displayed when not loading
        <div className="ml-[18rem] mr-[2rem] h-full">
          <div className="grid">
            <div className="text-md mt-20 flex gap-x-1 font-bold">
              {/* Department selection buttons */}
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              onClick={handleGenerateSchedule}
              className="hover:bg-dakr-green rounded bg-green px-4 py-2 text-white"
            >
              Generate Schedule
            </button>
            {scheduleData.length > 0 && (
              <button
                onClick={handleConfirmSchedule}
                className="rounded bg-green px-4 py-2 text-white hover:bg-dark-green"
              >
                Confirm and Save Schedule
              </button>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {scheduleData.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 text-xl font-semibold">Generated Schedule</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Course</th>
                    <th className="py-2">Professor</th>
                    <th className="py-2">Room</th>
                    <th className="py-2">Section</th>
                    <th className="py-2">Day of Week</th>
                    <th className="py-2">Start Time</th>
                    <th className="py-2">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((schedule, index) => (
                    <tr key={index} className="border-t text-center">
                      <td className="py-2">{schedule.course_name}</td>
                      <td className="py-2">{`${schedule.professor_first_name} ${schedule.professor_last_name}`}</td>
                      <td className="py-2">{schedule.room_number}</td>
                      <td className="py-2">{schedule.section_label}</td>
                      <td className="py-2">{schedule.day_of_week}</td>
                      <td className="py-2">{schedule.start_time}</td>
                      <td className="py-2">{schedule.end_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Generate;
