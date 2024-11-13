import { useEffect, useState } from "react";
import section from "../../../../../assets/section.png";

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
      <div className="relative w-2/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src={section} alt="" className="m-3 mr-4 h-[30px] w-[40px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
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

            <div className="flex gap-5">
              {/* Label Field with Error Handling */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="section">Label</label>
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
                <label htmlFor="yearLevel">Year Level</label>
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

export default SectionForm;
