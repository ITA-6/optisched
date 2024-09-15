import { useEffect, useState } from "react";

import BuildingForm from "./Files/BuildingForm";
import BuildingTable from "./Files/BuildingTable";
import SearchField from "./Files/SearchField";
import api from "../../../../api";

import add from "../../../../assets/add.png";

const Building = () => {
  const [buildings, setBuildings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [SelectedBuilding, setSelectedBuilding] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen)
    setSelectedBuilding(id)
  }
  
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
      setBuildings([]);
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
    toggleDialog(id)
  };


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <SearchField />
          <BuildingTable
            toggleDialog={toggleDialog}
            buildings={buildings}
            openUpdate={openUpdate}
          />
          </div>
          <div className="mt-5 flex items-start justify-end grid-in-button">
            <button
              className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
              onClick={toggleModal}
            >
              <img src={add} alt="" className="h-[30px] w-[30px]" />
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
                    onClick={() => DeleteBuilding(SelectedBuilding)}
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
    </div>
  );
};

export default Building;
