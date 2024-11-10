import SearchField from "./Files/SearchField";
import ClassroomTable from "./Files/ClassroomTable";
import { useState, useEffect } from "react";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";
import add from "../../../../assets/add.png";
import api from "../../../../api";
import ClassroomForm from "./Files/ClassroomForm";

const Classroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [buildings, setBuilding] = useState([]);
  const [errorMessage, setErrorMessage] = useState({}); // State to store error messages
  const { isSidebarOpen } = useSidebar();

  const [SelectedClassroom, setSelectedClassroom] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedClassroom(id);
  };

  const totalRows = classrooms.length < 10 ? 10 : classrooms.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("rooms/");
        const building = await api.get("buildings/");
        setClassrooms(response.data);
        setBuilding(building.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setInitialData(null);
      setErrorMessage({}); // Clear errors when closing the modal
    }
  };

  const submitClassroom = async (classroom) => {
    try {
      await api.post("rooms/", classroom);
      const response = await api.get("rooms/");
      setClassrooms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Capture validation errors
        setErrorMessage(error.response.data);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const updateClassroom = async (classroom) => {
    try {
      await api.put(`rooms/${classroom.id}/`, classroom);
      const response = await api.get("rooms/");
      setClassrooms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Capture validation errors
        setErrorMessage(error.response.data);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteClassroom = async (id) => {
    try {
      await api.delete(`rooms/${id}`);
      const response = await api.get("rooms/");
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
    toggleDialog();
  };

  return (
    <div className="h-screen w-screen bg-white font-noto">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField />
        <div
          className={`mr-5 h-full grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${classrooms.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <ClassroomTable
            toggleDialog={toggleDialog}
            classrooms={classrooms}
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
          errorMessage={errorMessage} // Pass down errorMessage
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
                onClick={() => DeleteClassroom(SelectedClassroom)}
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

export default Classroom;
