import { useEffect, useState } from "react";
import api from "../../../../api";
import add from "../../../../assets/add.png"

import SearchField from "./Files/SearchField";
import ProfessorForm from "./Files/ProfessorForm";
import ProfessorTable from "./Files/ProfessorTables";


const Professor = () => {
    const [professors, setProfessor] = useState([]);
    const [departments, setDepartments] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await api("professors/");
          const department = await api("departments/");
          setProfessor(response.data);
          setDepartments(department.data)
        };
        fetchData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const submitProfessor = async (professor) => {
        try {
          await api.post("professors/", professor);
          const response = await api("professor/");
          setProfessor(response.data);
          setIsModalOpen(false);
        } catch (error) {
          console.error(error);
        }
      };

      const updateProfessor = async (professor) => {
        try {
          await api.put(`professors/${professor.id}/`, professor);
          const response = await api("professor/");
          setProfessor(response.data);
          setIsModalOpen(false);
        } catch (error) {
          console.error(error);
        }
      };

      const openUpdate = (initialData) => {
        setInitialData(initialData);
        openModal();
      };
    
      const DeleteProfessor = async (id) => {
        try {
          await api.delete(`professor/${id}`);
          const response = await api.get("professor/");
          setProfessor(response.data);
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className="h-screen w-screen bg-white-grayish">
        <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
            <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
                <SearchField />
                <ProfessorTable
                    DeleteProfessor={DeleteProfessor}
                    professors={professors}
                    openUpdate={openUpdate}
                />
            </div>
            <div className="mt-5 flex items-start justify-end grid-in-button">
                <button
                    className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
                    onClick={openModal}
                >
                    <img src={add} alt="" className="h-[30px] w-[30px]" />
                    <span>Add New Professor</span>
                </button>
            </div>
            {isModalOpen && (
                <ProfessorForm
                departments={departments}
                closeModal={closeModal}
                handler={initialData ? updateProfessor : submitProfessor}
                initialData={initialData}
                />
            )}
        </div>
    </div>
  )
}
export default Professor