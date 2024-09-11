import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import section from "../../../assets/section.png";
import add from "../../../assets/add.png";
import { useEffect, useState } from "react";

import api from "../../../api";

const Section = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState("");
  const [yearLevel, setYearLevel] = useState(0);


   // edit modal data
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedSection, setSelectedSection] = useState("")
   const setSection = data.filter(section => section.id === selectedSection)
  
   // toggle the state
   const closeEditModal = () => setIsEditModalOpen(false);
   const openEditModal = (section) => {
     // set the value of selected Section to the value of the row of the button
     setSelectedSection(section)
     setIsEditModalOpen(true)
     console.log(setSection)
   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("sections/");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("sections/", {
        label: label,
        year_level: yearLevel,
      });
      const response = await api.get("sections/");
      setData(response.data);
      setIsModalOpen(false);
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
                <th scope="col">Label</th>
                <th scope="col">Year Level</th>
                <th scope="col">Adviser</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              {data?.map((item) => (
                <tr key={item.id} className="h-[30px]">
                  <td>{item.label}</td>
                  <td>{item.year_level}</td>
                  <td>{item.adviser}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button className="-h5 w-16 bg-green text-white" onClick={()=> openEditModal(item.id)}>
                          {" "}
                          Edit
                        </button>
                        <button className="-h5 w-16 bg-red-500 text-white">
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
            onClick={openModal}
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Section</span>
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={section}
                alt=""
                className="m-3 mr-4 h-[30px] w-[40px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Section
              </h2>
            </div>
            <div className="p-5">
              <form
                onSubmit={handleSubmit}
                className="mr-5 mt-5 space-y-6 text-lg font-medium"
              >
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="section">Label</label>
                    <input
                      type="text"
                      name="label"
                      id="label"
                      placeholder="Label"
                      onChange={(e) => setLabel(e.target.value)}
                      className="rounded-lg border border-gray-300 p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="maximumCount">Year Level</label>
                    <input
                      type="number"
                      name="maximumCount"
                      id="maximumCount"
                      placeholder="0"
                      onChange={(e) => setYearLevel(e.target.value)}
                      className="rounded-lg border border-gray-300 p-2"
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

      {/* edit Modal Section */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={section}
                alt=""
                className="m-3 mr-4 h-[30px] w-[40px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">
                Edit Section
              </h2>
            </div>
            <div className="p-5">
              <form
                onSubmit={handleSubmit}
                className="mr-5 mt-5 space-y-6 text-lg font-medium"
              >
                {setSection.map(section => (
                  <>
                    <div className="flex gap-5">
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="section">Label</label>
                        <input
                          type="text"
                          name="label"
                          id="label"
                          placeholder="Label"
                          value={section.label}
                          onChange={(e) => setLabel(e.target.value)}
                          className="rounded-lg border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="maximumCount">Year Level</label>
                        <input
                          type="number"
                          name="maximumCount"
                          id="maximumCount"
                          placeholder="0"
                          value={section.year_level}
                          onChange={(e) => setYearLevel(e.target.value)}
                          className="rounded-lg border border-gray-300 p-2"
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

export default Section;
