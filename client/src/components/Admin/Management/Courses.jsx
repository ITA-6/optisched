import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png";
import { useEffect, useState } from "react";

import api from "../../../api";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [needMasteral, setNeedMasteral] = useState(true);
  
  // edit modal data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("")
  const setCourse = data.filter(course => course.id === selectedCourse)
  
  // toggle the state
  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (course) => {
    // set the value of selected course to the value of the row of the button
    setSelectedCourse(course)
    setIsEditModalOpen(true)
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api("courses/");
      setData(response.data);
    };
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("courses/", {
        name: name,
        code: code,
        category: category,
        total_units: totalUnits,
        total_hours: totalHours,
        need_masteral: needMasteral,
      });
      const response = await api("courses/");
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`courses/${id}`);
      const response = await api.get("courses/");
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
                <th scope="col">Course Title</th>
                <th scope="col">Course Code</th>
                <th scope="col">Course type</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              {data?.map((item) => (
                <tr className="h-[30px]">
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>{item.category}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button 
                          className="-h5 w-16 bg-green text-white" 
                          onClick={()=> openEditModal(item.id)}>
                          {" "}
                          Edit
                        </button>
                        <button 
                          className="-h5 w-16 bg-red-500 text-white" 
                          onClick={() => handleDelete(item.id)}>
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
            <span>Add New Course</span>
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
                  <label htmlFor="courseTitle" className="text-lg font-medium">
                    {" "}
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="courseTitle"
                    name="courseTitle"
                    placeholder="Course Title"
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="courseCode" className="text-lg font-medium">
                    {" "}
                    Course Code
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    id="courseCode"
                    placeholder="Course Code"
                    onChange={(e) => setCode(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="totalUnits" className="text-lg font-medium">
                    {" "}
                    Total Units
                  </label>
                  <input
                    type="number"
                    name="totalUnits"
                    id="totalUnits"
                    placeholder="Total Units"
                    onChange={(e) => setTotalUnits(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="totalHours" className="text-lg font-medium">
                    {" "}
                    Total Hours
                  </label>
                  <input
                    type="number"
                    name="totalHours"
                    id="totalHours"
                    placeholder="Total Hours"
                    onChange={(e) => setTotalHours(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="courseCode" className="text-lg font-medium">
                    {" "}
                    Need Masteral
                  </label>
                  <select
                    name="needMasteral"
                    id="needMasteral"
                    onChange={(e) => setNeedMasteral(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option selected disabled value="">
                      Select If Need Masteral
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="courseType" className="text-lg font-medium">
                      Course Type
                    </label>
                    <select
                      name="courseType"
                      id="courseType"
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-md border border-gray-300 p-2"
                      required
                    >
                      <option selected disabled value="">
                        Select Course Type
                      </option>
                      <option value="LECTURE">Lecture</option>
                      <option value="LABORATORY">Laboratory</option>
                      <option value="BOTH">Laboratory & Lecture</option>
                    </select>
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


      {/* edit Modal Course */}
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
                {setCourse.map(course => (
                  <>
                     <div className="flex flex-1 flex-col">
                        <label htmlFor="courseTitle" className="text-lg font-medium">
                          {" "}
                          Course Title
                        </label>
                        <input
                          type="text"
                          id="courseTitle"
                          name="courseTitle"
                          placeholder="Course Title"
                          value={course.name}
                          onChange={(e) => setName(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="courseCode" className="text-lg font-medium">
                          {" "}
                          Course Code
                        </label>
                        <input
                          type="text"
                          name="courseCode"
                          id="courseCode"
                          value={course.code}
                          placeholder="Course Code"
                          onChange={(e) => setCode(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="totalUnits" className="text-lg font-medium">
                          {" "}
                          Total Units
                        </label>
                        <input
                          type="number"
                          name="totalUnits"
                          id="totalUnits"
                          value={course.total_units}
                          placeholder="Total Units"
                          onChange={(e) => setTotalUnits(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="totalHours" className="text-lg font-medium">
                          {" "}
                          Total Hours
                        </label>
                        <input
                          type="number"
                          name="totalHours"
                          id="totalHours"
                          value={course.total_hours}
                          placeholder="Total Hours"
                          onChange={(e) => setTotalHours(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label htmlFor="courseCode" className="text-lg font-medium">
                          {" "}
                          Need Masteral
                        </label>
                        <select
                          name="needMasteral"
                          id="needMasteral"
                          value={course.need_masteral}
                          onChange={(e) => setNeedMasteral(e.target.value)}
                          className="rounded-md border border-gray-300 p-2"
                          required
                        >
                          <option selected disabled value="">
                            Select If Need Masteral
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>
                      <div className="flex gap-5">
                        <div className="flex flex-1 flex-col">
                          <label htmlFor="courseType" className="text-lg font-medium">
                            Course Type
                          </label>
                          <select
                            name="courseType"
                            id="courseType"
                            value={course.category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-md border border-gray-300 p-2"
                            required
                          >
                            <option selected disabled value="">
                              Select Course Type
                            </option>
                            <option value="LECTURE">Lecture</option>
                            <option value="LABORATORY">Laboratory</option>
                            <option value="BOTH">Laboratory & Lecture</option>
                          </select>
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

export default Course;
