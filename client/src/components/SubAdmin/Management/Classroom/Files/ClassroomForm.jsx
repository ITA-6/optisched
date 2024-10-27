import { useEffect, useState } from "react";
import classroom from "../../../../../assets/classroom.png";

const ClassroomForm = ({ toggleModal, buildings, handler, initialData }) => {
  const [building, setBuilding] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    if (initialData) {
      setBuilding(initialData.building || "");
      setFloorNumber(initialData.floor || "");
      setRoomNumber(initialData.number || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      number: roomNumber,
      floor: floorNumber,
      building: building,
    };
    if (initialData) formData.id = initialData.id;
    handler(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={classroom} alt="" className="m-3 mr-4 h-[40px] w-[40px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Classroom" : "Create New Classroom"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div className="flex flex-1 flex-col">
              <label htmlFor="building" className="text-lg font-medium">
                Building Name
              </label>
              <select
                id="building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
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
                Floor Number
              </label>
              <input
                type="number"
                id="floorNumber"
                placeholder="Floor Number"
                value={floorNumber}
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
                  value={roomNumber}
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
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomForm;
