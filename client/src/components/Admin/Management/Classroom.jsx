import user from "../../../assets/user.png";
import classroom from "../../../assets/classroom.png";
import add from "../../../assets/add.png";
import { useEffect, useState } from "react";

import api from "../../../api";

const Classroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floorNumber, setFloorNumber] = useState(0);
  const [roomNumber, setRoomNumber] = useState(0);
  const [building, setBuilding] = useState(0);

  // edit modal data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const setClassroom = data.filter(
    (classroom) => classroom.id === selectedClassroom,
  );

  // toggle the state
  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (classroom) => {
    // set the value of selected building to the value of the row of the button
    setSelectedClassroom(classroom);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("rooms/");
      const buildings = await api.get("buildings/");
      setBuildings(buildings.data);
      setData(response.data);
    };
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("rooms/", {
        number: roomNumber,
        floor: floorNumber,
        building: building,
      });
      const response = await api.get("rooms/");
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`rooms/${id}`);
      const response = await api.get("rooms/");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-white-grayish">
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
                <th scope="col">Room Number</th>
                <th scope="col">Floor Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              {data?.map((item) => (
                <tr key={item.id} className="h-[30px]">
                  <td>{item.building}</td>
                  <td>{item.number}</td>
                  <td>{item.floor}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button
                          className="-h5 w-16 bg-green text-white"
                          onClick={() => openEditModal(item.id)}
                        >
                          {" "}
                          Edit
                        </button>
                        <button
                          className="-h5 w-16 bg-red-500 text-white"
                          onClick={() => handleDelete(item.id)}
                        >
                          {" "}
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
            <span>Add New Classroom</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={classroom}
                alt=""
                className="m-3 mr-4 h-[40px] w-[40px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Section
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="buildingName" className="text-lg font-medium">
                    {" "}
                    Building Name
                  </label>
                  <select
                    id="building"
                    onChange={(e) => setBuilding(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option selected value="" disabled>
                      Select Building
                    </option>
                    {buildings?.map((building) => (
                      <option key={building.id} value={building.id}>
                        {building.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="floorNumber" className="text-lg font-medium">
                    {" "}
                    Floor Number
                  </label>
                  <input
                    type="number"
                    placeholder="Floor Number"
                    onChange={(e) => setFloorNumber(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="roomNumber" className="text-lg font-medium">
                      Room Number
                    </label>
                    <input
                      type="number"
                      id="roomNumber"
                      name="roomNumber"
                      placeholder="Room Number"
                      onChange={(e) => setRoomNumber(e.target.value)}
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

      {/* edit classroom modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={classroom}
                alt=""
                className="m-3 mr-4 h-[40px] w-[40px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">Edit Section</h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {setClassroom.map((classroom) => (
                  <>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="buildingName"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Building Name
                      </label>
                      <select
                        id="building"
                        value={classroom.id}
                        onChange={(e) => setBuilding(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option selected value="" disabled>
                          Select Building
                        </option>
                        {buildings?.map((building) => (
                          <option key={building.id} value={building.id}>
                            {building.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="floorNumber"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Floor Number
                      </label>
                      <input
                        type="number"
                        placeholder="Floor Number"
                        value={classroom.floor}
                        onChange={(e) => setFloorNumber(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      />
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-1 flex-col">
                        <label
                          htmlFor="roomNumber"
                          className="text-lg font-medium"
                        >
                          Room Number
                        </label>
                        <input
                          type="number"
                          id="roomNumber"
                          name="roomNumber"
                          placeholder="Room Number"
                          value={classroom.number}
                          onChange={(e) => setRoomNumber(e.target.value)}
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

export default Classroom;
