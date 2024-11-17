import { useEffect, useState } from "react";
import classroom from "../../../../../assets/classroom.png";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClassroomForm = ({
  toggleModal,
  buildings,
  handler,
  initialData,
  errorMessage,
}) => {
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
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
        <FontAwesomeIcon
            className="m-3 mr-4 sm:h-[1.5em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em] text-white"
            icon={faChalkboardUser}
           />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            {initialData ? "Update Classroom" : "Create New Classroom"}
          </h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            {/* Display non_field_errors if available */}
            {errorMessage.non_field_errors && (
              <div className="mb-4 text-sm text-red-500">
                {errorMessage.non_field_errors[0]}
              </div>
            )}

            <div className="flex flex-1 flex-col">
              <label htmlFor="building" className="text-lg font-medium">
                Building Name *
              </label>
              <select
                id="building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className={`mt-1 w-full rounded-lg border p-2 ${errorMessage.building ? "border-red-500" : "border-gray-300"}`}
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
              {errorMessage.building && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.building[0]}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="floorNumber" className="text-lg font-medium">
                Floor Number *
              </label>
              <input
                type="number"
                id="floorNumber"
                placeholder="Floor Number"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage.floor ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage.floor && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.floor[0]}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="roomNumber" className="text-lg font-medium">
                Room Number *
              </label>
              <input
                type="number"
                id="roomNumber"
                name="roomNumber"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className={`rounded-md border p-2 ${errorMessage.number ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errorMessage.number && (
                <span className="ml-2 text-sm text-red-500">
                  {errorMessage.number[0]}
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

export default ClassroomForm;
