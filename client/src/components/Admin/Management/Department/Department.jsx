import DepartmentForm from "./Files/DepartmentForm";
import DepartmentTable from "./Files/DepartmentTable"
import SearchField from "./Files/SearchField"
import add from "../../../../assets/add.png"
import { useState, useEffect } from "react";
import api from "../../../../api";


const Department = () => {

    const [departments, setDepartment] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          const response = await api.get("departments/");
          setDepartment(response.data)
        };
        fetchData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    

    const submitDepartment = async (department) => {
        try {
          await api.post("departments/", department);
          const response = await api("departments/");
          setDepartment(response.data);
          setIsModalOpen(false);
        } catch (error) {
          console.error(error);
        }
      };

      const UpdateDepartment= async (department) => {
        try {
          await api.put(`departments/${department.id}`, department);
          const response = await api("departments/");
          setDepartment(response.data);
          setIsModalOpen(false);
        } catch (error) {
          console.error(error);
        }
      };

      const openUpdate = (initialData) => {
        setInitialData(initialData);
        openModal();
      }

      const DeleteDepartment = async (id) => {
        try {
          await api.delete(`departments/${id}`);
          const response = await api.get("departments/");
          setDepartment(response.data);
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
        <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
            <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
                <SearchField />
                <DepartmentTable
                  departments={departments}
                  DeleteDepartment={DeleteDepartment}
                  openUpdate={openUpdate}
              />
            </div>
            <div className="mt-5 flex items-start justify-end grid-in-button">
              <button
                className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
                onClick={openModal}
              >
                <img src={add} alt="" className="h-[30px] w-[30px]" />
                <span>Add New Department</span>
              </button>
            </div>
        </div>
        
        {isModalOpen && (
            <DepartmentForm 
                closeModal={closeModal}
                departments={departments}
                handler={initialData ? UpdateDepartment : submitDepartment}
                initialData={initialData}
            />
        )}
    </div>
  )
}
export default Department