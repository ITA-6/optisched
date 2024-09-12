import { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png";

import api from "../../../api";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [programName, setProgramName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);

  // edit modal data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const setProgramId = programs.filter(
    (section) => section.name === selectedProgram,
  );

  // toggle the state
  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (program) => {
    // set the value of selected Section to the value of the row of the button
    setSelectedProgram(program);
    setIsEditModalOpen(true);
    console.log(programs);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("programs/");
        const departmentResponse = await api.get("departments/");

        setPrograms(response.data);
        setDepartments(departmentResponse.data);
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
      await api.post("programs/", {
        name: programName,
        department: department,
      });
      const response = await api.get("programs/");
      setPrograms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`programs/${id}`);
      const response = await api.get("programs/");
      setPrograms(response.data);
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
                <th scope="col">Program Name</th>
                <th scope="col">Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {programs?.map((program) => (
                <tr>
                  <td>{program.name}</td>
                  <td>{program.department_name}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button
                          className="h-7 w-20 bg-green text-white"
                          onClick={() => openEditModal(program.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="h-7 w-20 bg-red-500 text-white"
                          onClick={() => handleDelete(program.name)}
                        >
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
            <span>Add New Program</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Program
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="programName" className="text-lg font-medium">
                    {" "}
                    Program Name
                  </label>
                  <input
                    type="text"
                    id="programName"
                    name="programName"
                    placeholder="Program Name"
                    onChange={(e) => setProgramName(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="departmentName"
                    className="text-lg font-medium"
                  >
                    {" "}
                    Department
                  </label>
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  >
                    <option selected disabled value="">
                      Select Department
                    </option>
                    {departments?.map((department) => (
                      <option value={department.id}>{department.name}</option>
                    ))}
                  </select>
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

      {/* editModal Program */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">Edit Program</h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {setProgramId?.map((program) => (
                  <>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="programName"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Program Name
                      </label>
                      <input
                        type="text"
                        id="programName"
                        name="programName"
                        value={program.name}
                        placeholder="Program Name"
                        onChange={(e) => setProgramName(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="departmentName"
                        className="text-lg font-medium"
                      >
                        {" "}
                        Department
                      </label>
                      <select
                        value={program.department_name}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2"
                      >
                        <option selected disabled value="">
                          Select Department
                        </option>
                        {departments?.map((department) => (
                          <option value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
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

export default Program;
