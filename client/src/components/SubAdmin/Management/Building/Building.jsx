import { useEffect, useState } from "react";

import BuildingForm from "./Files/BuildingForm";
import BuildingTable from "./Files/BuildingTable";
import SearchField from "./Files/SearchField";
import api from "../../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [SelectedBuilding, setSelectedBuilding] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedBuilding(id);
  };
  const totalRows = (buildings.length < 10) ? 10 : buildings.length;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("buildings/");
      setBuildings(response.data);
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitBuilding = async (building) => {
    try {
      await api.post("buildings/", building);
      const response = await api("buildings/");
      setBuildings(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBuilding = async (building) => {
    try {
      await api.put(`buildings/${building.id}/`, building);
      const response = await api("buildings/");
      setBuildings(response.data);
      setInitialData(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteBuilding = async (id) => {
    try {
      await api.delete(`buildings/${id}`);
      const response = await api.get("buildings/");
      setBuildings(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog(id);
  };

  return (
    <div className=" h-screen w-screen bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(buildings.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <BuildingTable
            toggleDialog={toggleDialog}
            buildings={buildings}
            openUpdate={openUpdate}
            totalRows={totalRows}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-[4rem] w-52 items-center justify-center space-x-2 rounded-3xl border-2 bg-light-green text-white font-medium"
            onClick={toggleModal}
          >
           <FontAwesomeIcon icon={faPlus}  color="white" size="xl"/>
            <span>Add New Building</span>
          </button>
        </div>
        {isModalOpen && (
          <BuildingForm
            DeleteBuilding={DeleteBuilding}
            handler={initialData ? updateBuilding : submitBuilding}
            initialData={initialData}
            toggleModal={toggleModal}
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
                  onClick={() => DeleteBuilding(SelectedBuilding)}
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

export default Buildings;


