import { useEffect, useState } from "react";
import add from "../../../../assets/add.png";

import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import ProgramForms from "./Files/ProgramForms";
import api from "../../../../api";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartment] = useState("");
  const [initialData, setInitialData] = useState(null);
  const totalRows = programs.length < 10 ? 10 : programs.length;
  const { isSidebarOpen } = useSidebar();

  const [SelectedProgram, setSelectedProgram] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedProgram(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await api("programs/");
      const department = await api("departments/");
      setPrograms(response.data);
      setDepartment(department.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitProgram = async (program) => {
    try {
      await api.post("programs/", program);
      const response = await api("programs/");
      setPrograms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgram = async (program) => {
    try {
      await api.put(`programs/${program.id}/`, program);
      const response = await api("programs/");
      setPrograms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteProgram = async (id) => {
    try {
      await api.delete(`programs/${id}`);
      const response = await api.get("programs/");
      setPrograms(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog();
  };

  return (
    <div className="h-screen w-screen bg-white">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField />
        <div
          className={`mr-5 h-full grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${programs.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <ProgramTable
            toggleDialog={toggleDialog}
            programs={programs}
            openUpdate={openUpdate}
            totalRows={totalRows}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
            <span>Add New Program</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ProgramForms
          toggleModal={toggleModal}
          handler={initialData ? updateProgram : submitProgram}
          initialData={initialData}
          departments={departments}
        />
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[10rem] w-[20rem] flex-col items-center justify-center rounded-md bg-white">
            <div className="flex w-full justify-end">
              <button
                className="mr-5 rounded-xl bg-red-500 px-2 pb-0.5 text-center text-white"
                onClick={() => toggleDialog()}
              >
                x
              </button>
            </div>
            <div className="text-md mb-3 flex h-1/3 items-center px-10 text-center font-medium">
              <h1>Are you sure? you want to delete this item?</h1>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-green px-10 py-2 text-center text-white"
                onClick={() => DeleteProgram(SelectedProgram)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 px-10 py-2 text-white"
                onClick={() => toggleDialog()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Program;
