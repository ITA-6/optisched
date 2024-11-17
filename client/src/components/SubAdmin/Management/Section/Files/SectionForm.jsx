import { useEffect, useState } from "react";
import section from "../../../../../assets/section.png";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SectionForm = ({
  toggleModal,
  handler,
  initialData,
  errors,
  errorMessage,
}) => {
  const [label, setLabel] = useState("");
  const [year, setYearLevel] = useState("");

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label || "");
      setYearLevel(initialData.year_level || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sectionData = {
      label: label,
      year_level: year,
    };
    if (initialData) sectionData.id = initialData.id;
    handler(sectionData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <FontAwesomeIcon
            className="m-3 mr-4 sm:h-[1.5em] sm:w-[1.7em] md:h-[2em] md:w-[2em] xm:h-[1.5em] xm:w-[1.5em] text-white"
            icon={faChalkboard}
           />
          <h2 className="ml-2 text-3xl font-extrabold text-white sm:ml-0 sm:text-lg md:text-xl xm:ml-0 xm:text-sm">
            {initialData ? "Update Section" : "Create New Section"}
          </h2>
        </div>
        <div className="p-5">
          <form
            onSubmit={handleSubmit}
            className="mr-5 mt-5 space-y-6 text-lg font-medium"
          >
            {/* Display non_field_errors if available */}
            {errorMessage.non_field_errors && (
              <div className="mb-4 text-sm text-red-500">
                {errorMessage.non_field_errors[0]}
              </div>
            )}

            <div className="flex flex-col gap-5">
              {/* Label Field with Error Handling */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="section">Label *</label>
                <input
                  type="text"
                  name="label"
                  id="label"
                  placeholder="Label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className={`rounded-lg border p-2 ${errorMessage.label ? "border-red-500" : "border-gray-300"}`}
                  required
                />
                <span
                  className={`${errorMessage.label ? "inline" : "hidden"} ml-2 text-sm text-red-500`}
                >
                  {errorMessage.label && "* Label is required or invalid"}
                </span>
              </div>

              {/* Year Level Field with Error Handling */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="yearLevel">Year Level *</label>
                <input
                  type="number"
                  name="yearLevel"
                  id="yearLevel"
                  placeholder="0"
                  value={year}
                  onChange={(e) => setYearLevel(e.target.value)}
                  className={`rounded-lg border p-2 ${errorMessage.year_level ? "border-red-500" : "border-gray-300"}`}
                  required
                />
                <span
                  className={`${errorMessage.year_level ? "inline" : "hidden"} ml-2 text-sm text-red-500`}
                >
                  {errorMessage.year_level &&
                    "* Year Level is required or invalid"}
                </span>
              </div>
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

export default SectionForm;
