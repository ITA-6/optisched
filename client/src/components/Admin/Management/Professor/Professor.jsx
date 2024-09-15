import { useEffect, useState } from "react";
import api from "../../../../api";
import add from "../../../../assets/add.png";

import SearchField from "./Files/SearchField";
import ProfessorForm from "./Files/ProfessorForm";
import ProfessorTable from "./Files/ProfessorTables";

const Professor = () => {
  const [professors, setProfessor] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const [SelectedProfessor, setSelectedProfessor] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedProfessor(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("professors/");
      const department = await api.get("departments/");
      setProfessor(response.data);
      setDepartments(department.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitProfessor = async (professor) => {
    try {
      await api.post("professors/", professor);
      const response = await api.get("professors/");
      setProfessor(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfessor = async (professor) => {
    try {
      await api.put(`professors/${professor.prof_id}/`, professor);
      const response = await api("professors/");
      setProfessor(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteProfessor = async (id) => {
    try {
      await api.delete(`professor/${id}`);
      const response = await api.get("professor/");
      setProfessor(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog();
  };

  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ProfessorTable
            toggleDialog={toggleDialog}
            professors={professors}
            openUpdate={openUpdate}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Professor</span>
          </button>
        </div>
        {isModalOpen && (
          <ProfessorForm
            departments={departments}
            toggleModal={toggleModal}
            handler={initialData ? updateProfessor : submitProfessor}
            initialData={initialData}
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
                  onClick={() => DeleteProfessor(SelectedProfessor)}
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
    </div>
  );
};
export default Professor;
