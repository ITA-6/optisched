import { useEffect, useState } from "react";
import add from "../../../../assets/add.png";

import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import ProgramForms from "./Files/ProgramForms";
import api from "../../../../api";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartment] = useState("");
  const [initialData, setInitialData] = useState(null);
  
  const [SelectedProgram, setSelectedProgram] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen)
    setSelectedProgram(id)
  }
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
    toggleDialog()
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ProgramTable
           toggleDialog={toggleDialog}
            programs={programs}
            openUpdate={openUpdate}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl  bg-light-green text-white"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
              <div className="w-[20rem] h-[10rem] flex flex-col justify-center items-center bg-white rounded-md">
                <div className="flex justify-end w-full">
                  <button 
                    className="mr-5 text-white  bg-red-500 rounded-xl text-center pb-0.5 px-2"
                    onClick={() => toggleDialog()}
                  >
                    x
                  </button>
                </div>
                <div className=" mb-3 h-1/3 flex text-md font-medium items-center text-center px-10">
                  <h1>
                    Are you sure? you want to delete this item?
                    </h1>
                </div>
                <div 
                  className="flex gap-4"
                >
                  <button 
                    className=" bg-green text-white  py-2 px-10 text-center"
                    onClick={() => DeleteProgram(SelectedProgram)}
                    >
                      Yes
                  </button>
                  <button
                    className="py-2 px-10 bg-red-500 text-white"
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
