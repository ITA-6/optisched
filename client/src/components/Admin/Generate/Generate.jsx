import React, { useState, useEffect } from "react";
import api from "../../../api"; // Import Axios for API requests
import loadingVideo from "../../../assets/loadingVideo.mp4";
import GeneratedTable from "./Files/GeneratedTable";
import GenerateTableHeaders from "./Files/GenerateTableHeaders";
import ViewTableSchedule from "./ViewSchule/ViewTableSchedule";
import { ScheduleData } from "./ViewSchule/ScheduleData";
import PrintModal from "./ViewSchule/PrintModal";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";
const Generate = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSidebarOpen } = useSidebar();

  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [department, setDepartment] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const togglePrintModal = () => {
    setPrintModalOpen(!printModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("departments/");
      const program = await api("programs/");
      setDepartment(response.data);
      setPrograms(program.data);
    };
    fetchData();
  }, []);

  const viewProgram = (programName) => {
    setSelectedProgram(programName);
    setActiveDepartment(!activeDepartment);
  };

  // filter the data by selecting a program
  const filteredScheduleProgram = schedules.filter(
    (program) => program.program_name === selectedProgram,
  );

  // get all the section available
  const getAllSection = [
    ...new Set(filteredScheduleProgram.map((section) => section.section_label)),
  ];

  // get all year
  const getAllYear = [
    ...new Set(filteredScheduleProgram.map((section) => section.year_level)),
  ];

  // filter the subjects by year
  const filterScheduleSections = getAllYear.map((year) => {
    return filteredScheduleProgram.filter(
      (subject) => subject.year_level === year,
    );
  });

  // filter the array by section
  const data = filterScheduleSections.map((section) =>
    section.filter((sec) => sec.section_label),
  );

  const filteredPrograms = programs.filter(
    (program) => program.department === +selectedDepartment,
  );

  const handleButtonClickDepartment = (department) => {
    setSelectedDepartment(department);
    setActiveDepartment(false);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get("schedule/");
        setSchedules(response.data); // Set the fetched schedule data to `schedules` array
        setScheduleData(response.data); // Optionally, set `scheduleData` as well if you need it
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedule();
  }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
    setScheduleData([]); // Clear the schedule data when switching departments
  };

  const handleGenerateSchedule = async () => {
    setLoading(true); // Show loading screen
    setError(null);
    try {
      const response = await api.get("schedule/generate/"); // Fetch schedule data from the API
      setSchedules(response.data); // Set the fetched schedule data to `schedules` array
      setScheduleData(response.data); // Optionally, set `scheduleData` as well if you need it
    } catch (err) {
      setError("Error generating schedule");
      console.error("Error generating schedule:", err);
    } finally {
      setLoading(false); // Hide loading screen after operation
    }
  };

  const handleConfirmSchedule = async () => {
    setLoading(true); // Show loading screen
    setError(null);
    try {
      await api.post("schedule/generate/", { schedule_data: scheduleData }); // API request to confirm and save schedule
      alert("Schedule confirmed and saved!");
    } catch (err) {
      setError("Error confirming schedule");
    } finally {
      setLoading(false); // Hide loading screen
    }
  };

  return (
    <div className="h-screen overflow-auto bg-white">
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
        <div
          className={`mr-[1rem] h-full ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} font-noto duration-300 ease-out`}
        >
          <div className="grid">
            <div className="text-md mt-20 flex gap-x-1 font-bold">
              {/* Department selection buttons */}
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              onClick={handleGenerateSchedule}
              className="rounded bg-green px-4 py-2 text-white hover:bg-dark-green"
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

          <div className="flex h-[80%] gap-x-2">
            <div className="flex flex-1 flex-col">
              <GenerateTableHeaders
                department={department}
                selectedDepartment={selectedDepartment}
                handleButtonClickDepartment={handleButtonClickDepartment}
              />
              {activeDepartment ? (
                <div
                  className={`${data.length > 0 ? "overflow-y-scroll" : "overflow-hidden"} flex h-full flex-col gap-5 p-5`}
                >
                  {data.length > 0 ? (
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-10">
                        {data.map((section) =>
                          section.map((sectionArray, index) => (
                            <ViewTableSchedule
                              key={index}
                              sectionArray={sectionArray}
                            />
                          )),
                        )}
                      </div>
                      <div className="flex items-center justify-end py-10">
                        <button
                          className="rounded-md bg-green px-10 py-2 text-base font-bold text-white"
                          onClick={togglePrintModal}
                        >
                          Print Schedule
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-gray-500">No Data Available</p>
                    </div>
                  )}
                </div>
              ) : (
                <GeneratedTable
                  filteredPrograms={filteredPrograms}
                  viewProgram={viewProgram}
                />
              )}
            </div>
            <div
              className={`flex-col items-center justify-center gap-2 ${activeDepartment ? "flex" : "hidden"}`}
            >
              <button className="bg-green p-3"></button>
              <button className="bg-green p-3"></button>
              <button className="bg-green p-3"></button>
            </div>
          </div>
          {printModalOpen && (
            <PrintModal
              togglePrintModal={togglePrintModal}
              filterScheduleSections={filterScheduleSections}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Generate;
