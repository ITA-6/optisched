import { useEffect, useState } from "react";

import BuildingForm from "./Files/BuildingForm";
import BuildingTable from "./Files/BuildingTable";
import api from "../../../../api";

import add from "../../../assets/add.png";

const Building = () => {
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("buildings/");
      setBuildings(response.data);
    };

    fetchData();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const submitCourse = async (course) => {
    try {
      await api.post("courses/", course);
      const response = await api("courses/");
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBuilding = async (course) => {
    try {
      await api.put(`courses/${course.id}/`, course);
      const response = await api("courses/");
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`courses/${id}`);
      const response = await api.get("courses/");
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <div className="mt-5 flex items-start justify-end grid-in-button">
            <button
              className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
              onClick={toggleModal}
            >
              <img src={add} alt="" className="h-[30px] w-[30px]" />
              <span>Add New Building</span>
            </button>
          </div>
        </div>
        {isModalOpen && <BuildingForm />}
      </div>
    </div>
  );
};

export default Building;
