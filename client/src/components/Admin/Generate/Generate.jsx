import React, { useState, useEffect } from "react";
import api from "../../../api"; // Import Axios for API requests
import loadingVideo from "../../../assets/loadingVideo.mp4";
import GeneratedTable from "./Files/GeneratedTable";
import GenerateTableHeaders from "./Files/GenerateTableHeaders";
import ViewTableSchedule from "./ViewSchule/ViewTableSchedule";
import PrintModal from "./ViewSchule/PrintModal";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import completeMark from "../../../assets/completeMark.png";
import failedMark from "../../../assets/FailedMark.png";
import GanttChartModal from "./GanttChartModal";

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const { isSidebarOpen } = useSidebar();
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [department, setDepartment] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [isGenerateClicked, setIsGenerateClicked] = useState();
  const [saveSchedule, setSaveSchedule] = useState();
  const [loadingModal, setLoadingModal] = useState();
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    setProgress(0); // Reset progress to 0
    setError(null);

    try {
      // Start both schedule generation and progress tracking simultaneously
      const generatePromise = generateSchedule();
      const progressPromise = handleProgress();

      // Wait for both processes to complete
      await Promise.all([generatePromise, progressPromise]);

      setLoading(false); // Hide loading after both processes complete
      setProgress(0);
    } catch (err) {
      console.error(
        "Error during schedule generation or progress tracking:",
        err,
      );
      setError("An error occurred while generating the schedule.");
      setLoading(false);
    }
  };

  const generateSchedule = async () => {
    try {
      // Trigger the schedule generation process
      const response = await api.get("schedule/generate/");
      setSchedules(response.data); // Set the fetched schedule data to schedules array
      setScheduleData(response.data); // Optionally, set scheduleData as well if you need it
      setIsGenerateClicked(true); // Indicate that generation was triggered
    } catch (err) {
      console.error("Error generating schedule:", err);
      setError("Error generating schedule.");
    }
  };

  const handleProgress = async () => {
    try {
      const interval = setInterval(async () => {
        try {
          // Poll progress from the API
          const response = await api.get("schedule/progress/");
          const currentProgress = response.data.generation_progress;

          setProgress(currentProgress); // Update progress state

          if (currentProgress >= 100) {
            clearInterval(interval); // Stop polling once progress reaches 100%

            // Optionally fetch the final schedules
            const scheduleResponse = await api.get("schedule/");
            setSchedules(scheduleResponse.data);
            setScheduleData(scheduleResponse.data);
          }
        } catch (err) {
          console.error("Error fetching progress:", err);
          clearInterval(interval); // Stop polling on error
          setError("Failed to fetch progress.");
        }
      }, 2000); // Poll every 2 seconds
    } catch (err) {
      console.error("Error in progress tracking:", err);
      setError("Failed to track progress.");
    }
  };

  const handleConfirmSchedule = async () => {
    setSaveSchedule(true);
    setLoadingModal(true);
    setError(null);
    try {
      const savePromise = saveSchedules();
      const progressPromise = trackSaveProgress();

      await Promise.all([savePromise, progressPromise]);

      setSuccess("Schedule has been saved successfully!");
      setProgress(0);
    } catch (err) {
      console.error("Error generating schedule:", err);
      setError("Failed to save the Schedule");
    } finally {
      setLoadingModal(false);
      setTimeout(() => {
        setSaveSchedule(false);
      }, [3000]);
    }
  };

  const saveSchedules = async () => {
    try {
      await api.post("schedule/generate/", { schedule_data: scheduleData });
    } catch (err) {
      throw new Error("Error saving schedule.");
    }
  };

  const trackSaveProgress = async () => {
    const interval = setInterval(async () => {
      try {
        const response = await api.get("schedule/progress/");
        const currentProgress = response.data.saving_progress;

        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching saving progress:", err);
        clearInterval(interval);
        setError("Failed to track saving progress.");
      }
    }, 2000);
  };

  return (
    <div className="h-screen overflow-auto bg-white">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <video src={loadingVideo} autoPlay loop className="h-1/2 w-7/12" />
          <p className="mt-4 text-lg font-bold">Progress</p>
          <div className="relative h-7 w-1/4 overflow-hidden rounded-xl border border-gray-500">
            {/* Progress bar */}
            <div
              className="h-full bg-green transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
            {/* Percentage text */}
            <p className="absolute inset-0 flex items-center justify-center font-semibold">
              {progress}%
            </p>
          </div>
        </div>
      ) : (
        // Main content is displayed when not loading
        <div
          className={`mr-[1rem] h-full ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} font-noto duration-300 ease-out sm:mx-4`}
        >
          <div className="grid">
            <div className="text-md mt-20 flex gap-x-1 font-bold">
              {/* Department selection buttons */}
            </div>
          </div>

          <div
            className={`mb-4 grid ${isGenerateClicked ? "grid-cols-[2fr_2fr_0.1fr]" : "grid-cols-[5fr_1fr]"} md:text-md items-center justify-between sm:mb-2 sm:text-sm xm:ml-4 xm:text-xs`}
          >
            <div className="justify flex items-center justify-start gap-4">
              <button
                onClick={handleGenerateSchedule}
                className="rounded bg-green px-4 py-2 text-white hover:bg-dark-green"
              >
                Generate Schedule
              </button>
              {scheduleData.length !== 0 && (
                <button
                  onClick={openModal}
                  className="rounded bg-green px-4 py-2 text-white hover:bg-dark-green"
                >
                  View Chart
                </button>
              )}
            </div>
            {isGenerateClicked && (
              <div className="flex items-center justify-end">
                <button
                  onClick={handleConfirmSchedule}
                  className="rounded bg-green px-4 py-2 text-white hover:bg-dark-green"
                >
                  Save Schedule
                </button>
              </div>
            )}
            {data.length !== 0 && (
              <div className="flex items-center justify-end py-10">
                <button className="rounded-md px-4 py-2 text-base font-bold text-white">
                  <FontAwesomeIcon
                    icon={faPrint}
                    color="black"
                    className="sm:text-lg md:text-2xl"
                    onClick={togglePrintModal}
                  />
                </button>
              </div>
            )}
          </div>

          <div className="flex min-h-screen gap-x-2 sm:w-full md:text-base lg:text-lg xl:text-xl xm:ml-4 xm:text-xs">
            <div className="flex flex-1 flex-col overflow-x-auto">
              <GenerateTableHeaders
                department={department}
                selectedDepartment={selectedDepartment}
                handleButtonClickDepartment={handleButtonClickDepartment}
              />
              {activeDepartment ? (
                data.length > 0 ? (
                  <div className="mt-10 flex flex-col overflow-auto">
                    <div className="flex flex-col overflow-auto lg:mx-4">
                      {data.map((section) =>
                        section.map((sectionArray, index) => (
                          <>
                            <div className="flex items-center justify-center">
                              Curriculum Year Batch 2023
                            </div>
                            <div className="flex justify-between">
                              <p className="">
                                {(() => {
                                  switch (sectionArray.year_level) {
                                    case 1:
                                      return "1st Year";
                                    case 2:
                                      return "2nd Year";
                                    case 3:
                                      return "3rd Year";
                                    case 4:
                                      return "4th Year";
                                    default:
                                      return "Unknown";
                                  }
                                })()}
                              </p>
                              <p className="">{sectionArray.semester}</p>
                            </div>
                            <ViewTableSchedule
                              key={index}
                              sectionArray={sectionArray}
                            />
                          </>
                        )),
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-gray-500">No Data Available</p>
                  </div>
                )
              ) : (
                <div className="m-h-screen sm:text-sm md:text-base lg:text-lg">
                  <GeneratedTable
                    filteredPrograms={filteredPrograms}
                    viewProgram={viewProgram}
                  />
                </div>
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
          {saveSchedule && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-1/4 rounded-lg bg-white shadow-lg">
                {loadingModal ? (
                  <div className="relative flex h-24 flex-col items-center justify-center rounded-lg bg-white py-10">
                    <video
                      src={loadingVideo}
                      autoPlay
                      loop
                      className="translate-x-0 transform rounded-lg"
                    />
                    <p className="absolute -bottom-14 mt-4 text-lg font-bold">
                      Progress: {progress}%
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white py-10 duration-75 ease-in-out">
                    <img src={failedMark} alt="" className="w-24" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white py-10 duration-75 ease-in-out">
                    <img src={completeMark} alt="" className="w-24" />
                    <p>{success}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <GanttChartModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Generate;
