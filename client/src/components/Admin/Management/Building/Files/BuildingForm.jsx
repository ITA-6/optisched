import course from "../../../../../assets/course.png";
import { useState, useEffect } from "react";
const BuildingForm = ({closeModal, handler, initialData}) => {
  
  const [name, setName] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setTotalRooms(initialData.total_rooms || 0);
      setAvailableRooms(initialData.available_rooms || 0);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const buildingData = {
      name: name,
      total_rooms: totalRooms,
      available_rooms: availableRooms,
    };
    if (initialData) buildingData.id = initialData.id;
    handler(buildingData);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            {initialData ? "Update Building" : "Create New Building"}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  value={totalRooms}
                  onChange={(e) => setTotalRooms(e.target.value)}
                  className="rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="availableRooms" className="text-lg font-medium">
                  {" "}
                  Available Rooms
                </label>
                <input
                  type="number"
                  id="availableRooms"
                  name="availableRooms"
                  placeholder="0"
                  value={availableRooms}
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
  );
};

export default BuildingForm;
