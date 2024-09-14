import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";

import add from "../../../../assets/add.png";
import api from "../../../../api";
import ClassroomForm from "./Files/ClassroomForm";
const Classroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [buildings, setBuilding] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("rooms/");
      const building = await api.get("buildings/");
      setClassrooms(response.data);
      setBuilding(building.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitClassroom = async (classroom) => {
    try {
      await api.post("rooms/", classroom);
      const response = await api("rooms/");
      setClassrooms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClassroom = async (classroom) => {
    try {
      await api.put(`rooms/${classroom.id}/`, classroom);
      const response = await api("rooms/");
      setClassrooms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    openModal();
  };

  const DeleteClassroom = async (id) => {
    try {
      await api.delete(`rooms/${id}`);
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ClassroomTable
            DeleteClassroom={DeleteClassroom}
            classrooms={classrooms}
            openUpdate={openUpdate}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Classroom</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ClassroomForm
          toggleModal={toggleModal}
          buildings={buildings}
          handler={initialData ? updateClassroom : submitClassroom}
          initialData={initialData}
        />
      )}
    </div>
  );
};
export default Classroom;
