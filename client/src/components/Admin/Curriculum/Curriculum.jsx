import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";
import api from "../../../api";

const Curriculum = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [department, setDepartment] = useState([]);
  const [programs, setPrograms] = useState([]);
  const { isSidebarOpen } = useSidebar();

  const navigate = useNavigate();
  useEffect(() => {
    setSelectedDepartment(1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("departments/");
      const program = await api("programs/");
      setDepartment(response.data);
      setPrograms(program.data);
    };
    fetchData();
  }, []);

  const viewProgram = (id) => {
    navigate(`/admin/curriculum/program`, {
      state: { id },
    });
  };

  const handleButtonClick = (department) => {
    setSelectedDepartment(department);
  };

  const filteredPrograms = programs.filter(
    (program) => program.department === +selectedDepartment,
  );

  return (
    <div className="h-screen">
      <div
        className={`mr-[2rem] h-full ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} font-noto duration-300 ease-out`}
      >
        <div className="mt-10 grid">
          <div className="text-md mt-20 flex gap-x-1 font-bold">
            {/* Button elements */}
            {department.map((college, index) => (
              <button
                key={index}
                className={`h-10 w-20 flex-1 rounded-t-lg ${
                  selectedDepartment === college.id
                    ? "bg-green text-white"
                    : "bg-gray-300 hover:bg-green hover:text-white"
                }`}
                onClick={() => handleButtonClick(college.id)}
              >
                {college.acronym}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full table-auto bg-white text-center">
          <thead className="bg-green-500 text-white">
            <tr className="h-12">
              <th scope="col">Program</th>
            </tr>
          </thead>
          <tbody className="mb-10 h-full">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <tr
                  key={index}
                  className="h-20 cursor-pointer hover:bg-gray-100 hover:text-black"
                >
                  <td onClick={() => viewProgram(program.id)}>
                    {program.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Curriculum;
