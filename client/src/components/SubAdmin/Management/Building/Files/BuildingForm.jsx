import course from "../../../../../assets/course.png";
import { useState, useEffect } from "react";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BuildingForm = ({ handler, initialData, toggleModal, errorMessage }) => {
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
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <FontAwesomeIcon
            className="m-3 mr-4 sm:h-[1.5em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em] text-white"
            icon={faBuilding}
           />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            {initialData ? "Update Building" : "Create New Building"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            {/* Building Name Field with Error Handling */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="BuildingName" className="text-lg font-medium">
                Building Name *
              </label>
              <input
                type="text"
                id="BuildingName"
                name="BuildingName"
                placeholder="Building Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage?.name ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage?.name && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.name[0]}
                </span>
              )}
            </div>

            {/* Total Rooms Field */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="totalRooms" className="text-lg font-medium">
                Total Rooms *
              </label>
              <input
                type="number"
                id="totalRooms"
                name="totalRooms"
                placeholder="0"
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage?.total_rooms ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage?.total_rooms && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.total_rooms[0]}
                </span>
              )}
            </div>

            {/* Available Rooms Field */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="availableRooms" className="text-lg font-medium">
                Available Rooms *
              </label>
              <input
                type="number"
                id="availableRooms"
                name="availableRooms"
                placeholder="0"
                value={availableRooms}
                onChange={(e) => setAvailableRooms(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage?.available_rooms ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage?.available_rooms && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.available_rooms[0]}
                </span>
              )}
            </div>

            <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
              <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl bg-green xm:w-28">
                <span className="text-white xm:text-xs font-bold">Confirm</span>
              </button>
            </div>
          </form>
          <button
            className="absolute right-4 top-4 rounded-full bg-red-500 px-1 text-white"
            onClick={toggleModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingForm;
