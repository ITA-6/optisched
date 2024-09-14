import { useEffect, useState } from "react";
import add from "../../../../assets/add.png";


import SearchField from "./Files/SearchField";
import ProgramTable from "./Files/ProgramTable";
import ProgramForms from "./Files/ProgramForms";
import api from "../../../../api";

const Program = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [departments ,setDepartment] = useState("");
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await api("programs/");
          const department = await api("departments/")
          setPrograms(response.data);
          setDepartment(department.data)
        };
        fetchData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        openModal();
      };

      const DeleteProgram = async (id) => {
        try {
          await api.delete(`programs/${id}`);
          const response = await api.get("programs/");
          setPrograms(response.data);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
        <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
            <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
                <SearchField/>
                <ProgramTable
                    DeleteProgram={DeleteProgram}
                    programs={programs}
                    openUpdate={openUpdate}
                />
            </div>
            <div className="mt-5 flex items-start justify-end grid-in-button">
                <button
                    className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
                    onClick={openModal}
                >
                    <img src={add} alt="" className="h-[30px] w-[30px]" />
                    <span>Add New Program</span>
                </button>
            </div>
        </div>
        {isModalOpen && (
            <ProgramForms
                closeModal={closeModal}
                handler={initialData ? updateProgram : submitProgram}
                initialData={initialData}
                departments={departments}
            />
        )}
    </div>
  )
}
export default Program