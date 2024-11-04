import React, { useState, useEffect } from "react";
import api from "../../../api"; // Import Axios for API requests
import loadingVideo from "../../../assets/loadingVideo.mp4";
import GeneratedTable from "./Files/GeneratedTable";
import GenerateTableHeaders from "./Files/GenerateTableHeaders";
import ViewTableSchedule from "./ViewSchule/ViewTableSchedule";
import {ScheduleData} from "./ViewSchule/ScheduleData";
import PrintModal from "./ViewSchule/PrintModal";

const Generate = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [department, setDepartment] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [activeDepartment , setActiveDepartment] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("");
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const togglePrintModal = () => {
    setPrintModalOpen(!printModalOpen)
  }

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
    setActiveDepartment(!activeDepartment)
  };

  // filter the data by selecting a program
  const filteredScheduleProgram = schedules.filter((program) => program.program_name === selectedProgram)


  // get all the section available
  const getAllSection = [...new Set(filteredScheduleProgram.map(section => section.section_label))];

  // get all year
  const getAllYear= [...new Set(filteredScheduleProgram.map(section => section.year_level))];
  
  // filter the subjects by year
  const filterScheduleSections = getAllYear.map(year => {
    return filteredScheduleProgram.filter(subject => subject.year_level === year)
  })

  // filter the array by section
  const data = filterScheduleSections.map(section => section.filter(sec => sec.section_label));

  const filteredPrograms = programs.filter(
    (program) => program.department === +selectedDepartment,
  );

  const handleButtonClickDepartment = (department) => {
    setSelectedDepartment(department);
    setActiveDepartment(false)
  };


  // useEffect(() => {
  //   setSelectedDepartment("CSS");
  //   const fetchData = async () => {
  //     setLoading(true); // Show loading screen
  //     try {
  //       const response = await api.get("schedule/list/");
  //       setScheduleData(response.data);
  //     } catch (err) {
  //       setError("Error fetching schedule");
  //     } finally {
  //       setLoading(false); // Hide loading screen when data is fetched
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
    setScheduleData([]); // Clear the schedule data when switching departments
  };

  const handleGenerateSchedule = async () => {
    setLoading(true); // Show loading screen
    setError(null);
    try {
      const response = await api.get("schedule/"); // Fetch schedule data from the API
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
      await api.post("schedule/confirm/", scheduleData); // API request to confirm and save schedule
      alert("Schedule confirmed and saved!");
    } catch (err) {
      setError("Error confirming schedule");
    } finally {
      setLoading(false); // Hide loading screen
    }
  };

  return (
    <div className="h-screen bg-white overflow-auto">
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
        <div className="ml-[18rem] mr-[1rem] h-full">
          <div className="grid">
            <div className="text-md mt-20 flex gap-x-1 font-bold">
              {/* Department selection buttons */}
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              onClick={handleGenerateSchedule}
              className="hover:bg-dark-green rounded bg-green px-4 py-2 text-white"
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
            <div className="flex flex-col flex-1">
              <GenerateTableHeaders 
                department={department}
                selectedDepartment={selectedDepartment} 
                handleButtonClickDepartment={handleButtonClickDepartment} 
              />
              {activeDepartment  ? (
                <div className={`${data.length > 0 ? "overflow-y-scroll" : "overflow-hidden"} flex flex-col gap-5 p-5 h-full`}>
                  {data.length > 0 ? (
                    <div className="flex flex-col">
                       <div className="flex flex-col gap-10">
                        {data.map((section) =>(
                          section.map((sectionArray, index) => (
                            <ViewTableSchedule 
                            key={index}
                            sectionArray={sectionArray}
                          />
                          ))
                        ))}
                      </div>
                      <div className="flex justify-end items-center py-10 ">
                        <button 
                          className="bg-green text-white py-2 px-10 rounded-md font-bold text-base"
                          onClick={togglePrintModal}
                        >
                          Print Schedule
                        </button>
                      </div>
                    </div>
                  ) :
                  (
                   <div className="h-full w-full flex justify-center items-center">
                      <p className="text-gray-500">No Data Available</p>
                   </div>
                  )}
                </div>
              ) :
              (
                <GeneratedTable filteredPrograms={filteredPrograms} viewProgram={viewProgram}/>
              )}
            </div>
            <div className={`gap-2 flex-col justify-center items-center ${activeDepartment ? "flex " : "hidden" }`}>
              <button className="bg-green p-3"></button>
              <button className="bg-green p-3"></button>
              <button className="bg-green p-3"></button>
            </div>
          </div>
          {printModalOpen && (
            <PrintModal togglePrintModal={togglePrintModal} filterScheduleSections={filterScheduleSections}/>
          )}
        </div>
      )}
    </div>
  );
};

export default Generate;
