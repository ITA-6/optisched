import { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png";

import api from "../../../api";

const Building = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);

  // edit modal data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const setBuilding = data.filter(
    (building) => building.id === selectedBuilding,
  );

  // toggle the state
  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (building) => {
    // set the value of selected building to the value of the row of the button
    setSelectedBuilding(building);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("buildings/");
      setData(response.data);
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("buildings/", {
        name: buildingName,
        total_rooms: totalRooms,
        available_rooms: availableRooms,
      });
      const response = await api.get("buildings/");
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`buildings/${id}`);
      const response = await api.get("buildings/");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
          <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-div">
            <input
              type="text"
              placeholder="search"
              className="rounded-md border pl-7 grid-in-search"
            />
            <div className="text-center grid-in-list">
              <select className="w-full">
                <option value="">List: All users</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <table className="w-full table-fixed bg-white text-center grid-in-table">
            <thead className="bg-green">
              <tr className="h-[30px]">
                <th scope="col">Building Name</th>
                <th scope="col">Total Rooms</th>
                <th scope="col">Available Rooms</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.total_rooms}</td>
                  <td>{item.available_rooms}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button
                          className="h-7 w-20 bg-green text-white"
                          onClick={() => openEditModal(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="h-7 w-20 bg-red-500 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
            onClick={openModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Building</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Building
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="BuildingName" className="text-lg font-medium">
                    {" "}
                    Building Name
                  </label>
                  <input
                    type="text"
                    id="BuildingName"
                    name="BuildingName"
                    placeholder="Building  Name"
                    onChange={(e) => setBuildingName(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="totalRooms" className="text-lg font-medium">
                      {" "}
                      Total Rooms
                    </label>
                    <input
                      type="number"
                      id="totalRooms"
                      name="totalRooms"
                      placeholder="0"
                      onChange={(e) => setTotalRooms(e.target.value)}
                      className="rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor="availableRooms"
                      className="text-lg font-medium"
                    >
                      {" "}
                      Available Rooms
                    </label>
                    <input
                      type="number"
                      id="availableRooms"
                      name="availableRooms"
                      placeholder="0"
                      onChange={(e) => setAvailableRooms(e.target.value)}
                      className="rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>
                </div>
                <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
                  <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl border-2 border-black bg-green">
                    <span>Confirm</span>
                  </button>
                </div>
              </form>
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Edit Building
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {setBuilding?.map((building,index) => (
                  <>
                    <div className="flex flex-1 flex-col" key={index}>
                      <label
                        htmlFor="BuildingName"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Building Name
                      </label>
                      <input
                        type="text"
                        id="BuildingName"
                        name="BuildingName"
                        value={building.name}
                        placeholder="Building  Name"
                        onChange={(e) => setBuildingName(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      />
                    </div>
                    <div className="flex gap-10">
                      <div className="flex flex-1 flex-col">
                        <label
                          htmlFor="totalRooms"
                          className="text-lg font-medium"
                        >
                          {" "}
                          Total Rooms
                        </label>
                        <input
                          type="number"
                          id="totalRooms"
                          name="totalRooms"
                          placeholder="0"
                          value={building.total_rooms}
                          onChange={(e) => setTotalRooms(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label
                          htmlFor="availableRooms"
                          className="text-lg font-medium"
                        >
                          {" "}
                          Available Rooms
                        </label>
                        <input
                          type="number"
                          id="availableRooms"
                          name="availableRooms"
                          placeholder="0"
                          value={building.available_rooms}
                          onChange={(e) => setAvailableRooms(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                    </div>
                  </>
                ))}
                <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
                  <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl border-2 border-black bg-green">
                    <span>Confirm</span>
                  </button>
                </div>
              </form>
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={closeEditModal}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Building;
