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

  const [SelectedClassroom, setSelectedClassroom] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen)
    setSelectedClassroom(id)
  }

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
    toggleModal()
  };

  const DeleteClassroom = async (id) => {
    try {
      await api.delete(`rooms/${id}`);
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog()
  };
  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <ClassroomTable
            toggleDialog={toggleDialog}
            classrooms={classrooms}
            openUpdate={openUpdate}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
            <span className="text-base">Add New Classroom</span>
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
                    onClick={() => DeleteClassroom(SelectedClassroom)}
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
export default Classroom;
