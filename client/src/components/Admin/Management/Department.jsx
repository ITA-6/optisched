import { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png";

import api from "../../../api";

const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

   // edit modal data
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedDepartment, setSelectedDepartment] = useState("")
   const setDepartment = data.filter(department => department.id === selectedDepartment)
  
   // toggle the state
   const closeEditModal = () => setIsEditModalOpen(false);
   const openEditModal = (department) => {
     // set the value of selected Department to the value of the row of the button
     setSelectedDepartment(department)
     setIsEditModalOpen(true)
     console.log(setDepartment)
   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("departments/");
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
      await api.post("departments/", {
        name: departmentName,
        acronym: departmentCode,
      });
      const response = await api.get("departments/");
      setData(response.data);
      setIsModalOpen(false);
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
                <th scope="col">Department Name</th>
                <th scope="col">Department Code</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.acronym}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button className="h-7 w-20 bg-green text-white" onClick={() => openEditModal(item.id)}>
                          Edit
                        </button>
                        <button className="h-7 w-20 bg-red-500 text-white">
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
            <span>Add New Department</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Course
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="departmentName"
                    className="text-lg font-medium"
                  >
                    {" "}
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="departmentName"
                    name="departmentName"
                    placeholder="Department Name"
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="departmentCode"
                    className="text-lg font-medium"
                  >
                    {" "}
                    Department Code
                  </label>
                  <input
                    type="text"
                    id="departmentCode"
                    name="departmentCode"
                    placeholder="Department Code"
                    onChange={(e) => setDepartmentCode(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
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

      {/* edit Modal Department */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Edit Course
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {setDepartment.map(department => (
                  <>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="departmentName"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Department Name
                      </label>
                      <input
                        type="text"
                        id="departmentName"
                        name="departmentName"
                        value={department.name}
                        placeholder="Department Name"
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="departmentCode"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Department Code
                      </label>
                      <input
                        type="text"
                        id="departmentCode"
                        name="departmentCode"
                        value={department.acronym}
                        placeholder="Department Code"
                        onChange={(e) => setDepartmentCode(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      />
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

export default Department;
