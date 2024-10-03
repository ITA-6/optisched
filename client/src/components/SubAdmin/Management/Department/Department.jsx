import DepartmentForm from "./Files/DepartmentForm";
import DepartmentTable from "./Files/DepartmentTable";
import SearchField from "./Files/SearchField";
import add from "../../../../assets/add.png";
import { useState, useEffect } from "react";
import api from "../../../../api";

const Department = () => {
  const [departments, setDepartment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const totalRows = (departments.length < 10) ? 10 : departments.length;

  const [SelectedDepartment, setSelectedDepartment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedDepartment(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("departments/");
      setDepartment(response.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

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

  const UpdateDepartment = async (department) => {
    try {
      await api.put(`departments/${department.id}/`, department);
      const response = await api("departments/");
      setDepartment(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteDepartment = async (id) => {
    try {
      await api.delete(`departments/${id}`);
      const response = await api.get("departments/");
      setDepartment(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog();
  };

  return (
   <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(departments.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <DepartmentTable
            departments={departments}
            toggleDialog={toggleDialog}
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
            <span>Add New College</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <DepartmentForm
          toggleModal={toggleModal}
          departments={departments}
          handler={initialData ? UpdateDepartment : submitDepartment}
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
                onClick={() => DeleteDepartment(SelectedDepartment)}
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
export default Department;
