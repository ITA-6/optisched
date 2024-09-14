import user from "../../../assets/user.png";
import classroom from "../../../assets/classroom.png";
import add from "../../../assets/add.png";
import { useEffect, useState } from "react";
import api from "../../../api";

const Professors = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // stored data
  const [data, setData] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [departments, setDepartments] = useState([]);
  const [professorId, setProfessorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasMasteral, setHasMasteral] = useState("");
  const [birthDate, setBirthDate] = useState(Date.now());
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("O");
  const [employmentStatus, setEmploymentStatus] = useState("PERMANENT");
  const setProf = data.filter((item) => item.prof_id === selectedProf);

  const closeEditModal = () => setIsEditModalOpen(false);
  const openEditModal = (selectProf) => {
    setSelectedProf(selectProf);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("professors/");
        const departmentResponse = await api.get("departments/");
        setData(response.data);
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
      await api.post("professors/", {
        prof_id: professorId,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birth_date: birthDate,
        has_masteral: hasMasteral,
        department: department,
        email: email,
        gender: gender,
        employment_status: employmentStatus,
      });
      const response = await api.get("professors/");
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`professors/${id}`);
      const response = await api.get("professors/");
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
                <th scope="col" className="h-[30px] w-[100px]">
                  ID
                </th>
                <th scope="col" className="h-[30px] w-[150px]">
                  Name
                </th>
                <th scope="col" className="h-[30px] w-[150px]">
                  Birthdate
                </th>
                <th scope="col" className="h-[30px] w-[200px]">
                  Email Address
                </th>
                <th scope="col" className="h-[30px] w-[150px]">
                  Department
                </th>
                <th scope="col" className="h-[30px] w-[100px]">
                  Masteral
                </th>
                <th scope="col" className="h-[30px] w-[150px]">
                  Employment Status
                </th>
                <th scope="col" className="h-[30px] w-[200px]"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              {data?.map((item) => (
                <tr className="h-[30px]" key={item.prof_id}>
                  <th scope="row">{item.prof_id}</th>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.birth_date}</td>
                  <td>{item.email}</td>
                  <td className="w-[100px]">{item.department_name}</td>
                  <td>{item.has_masteral === "Y" ? "Yes" : "No"}</td>
                  <td>{item.employment_status}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="ml-5 flex gap-2">
                        <button
                          className="-h5 w-16 bg-green text-white"
                          onClick={() => openEditModal(item.prof_id)}
                        >
                          Edit
                        </button>
                        <button
                          className="-h5 w-16 bg-red-500 text-white"
                          onClick={() => handleDelete(item.prof_id)}
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
            <span>Add New Professor</span>
          </button>
        </div>
      </div>
      {/* modal command */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Add New Professor
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {/* Professor ID */}
                <div className="flex flex-col">
                  <label
                    htmlFor="mail"
                    className="text-lg font-medium text-gray-700"
                  >
                    Professor ID
                  </label>
                  <input
                    type="number"
                    id="professorID"
                    onChange={(e) => setProfessorId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Name Fields */}
                <div className="flex flex-col">
                  <label className="text-lg font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-2 flex space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Firstname
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="middlename"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Middlename
                      </label>
                      <input
                        type="text"
                        id="middlename"
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Lastname
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Gender Field */}
                <div className="flex gap-10">
                  <div className="flex-1">
                    <label
                      htmlFor="gender"
                      className="text-lg font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option selected value="" disabled>
                        Select Gender
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                  <div className="grid flex-1">
                    <label
                      htmlFor="birthdate"
                      className="text-lg font-medium text-gray-700"
                    >
                      Birthdate
                    </label>
                    <input
                      className="rounded-md border border-gray-300 p-2"
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Employment Status */}
                <div className="flex flex-col">
                  <label
                    htmlFor="employmentStatus"
                    className="text-lg font-medium text-gray-700"
                  >
                    Employment Status
                  </label>
                  <select
                    name="employmentStatus"
                    id="employmentStatus"
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option selected value="" disabled>
                      Select Employment Status
                    </option>
                    <option value="CASUAL">Casual</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="PERMANENT">Permanent</option>
                  </select>
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="mail"
                    className="text-lg font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="mail"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Department Field */}
                <div className="flex gap-10">
                  <div className="flex-1">
                    <label
                      htmlFor="department"
                      className="text-lg font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      onChange={(e) => setDepartment(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option selected value="" disabled>
                        Select Department
                      </option>
                      {departments?.map((department) => (
                        <>
                          <option value={department.id}>
                            {department.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  {/* Masteral Field */}
                  <div className="flex-1">
                    <label
                      htmlFor="masteral"
                      className="text-lg font-medium text-gray-700"
                    >
                      Masteral
                    </label>
                    <select
                      id="masteral"
                      onChange={(e) => setHasMasteral(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option selected value="" disabled>
                        Select If Has Masteral
                      </option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
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

      {/* edit moda */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">
                Add New Professor
              </h2>
            </div>
            <div className="p-5">
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                {/* Professor ID */}

                {setProf?.map((selectedProf) => (
                  <>
                    <div className="flex flex-col">
                      <label
                        htmlFor="mail"
                        className="text-lg font-medium text-gray-700"
                      >
                        Professor ID
                      </label>
                      <input
                        type="number"
                        id="professorID"
                        value={selectedProf.prof_id}
                        onChange={(e) => setProfessorId(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Name Fields */}
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-2 flex space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Firstname
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            value={selectedProf.first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="middlename"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Middlename
                          </label>
                          <input
                            type="text"
                            id="middlename"
                            value={selectedProf.middle_name}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Lastname
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            value={selectedProf.last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gender Field */}
                    <div className="flex gap-10">
                      <div className="flex-1">
                        <label
                          htmlFor="gender"
                          className="text-lg font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          value={selectedProf.gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          <option selected value="" disabled>
                            Select Gender
                          </option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </select>
                      </div>
                      <div className="grid flex-1">
                        <label
                          htmlFor="birthdate"
                          className="text-lg font-medium text-gray-700"
                        >
                          Birthdate
                        </label>
                        <input
                          className="rounded-md border border-gray-300 p-2"
                          type="date"
                          name="birthdate"
                          id="birthdate"
                          value={selectedProf.birth_date}
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Employment Status */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="employmentStatus"
                        className="text-lg font-medium text-gray-700"
                      >
                        Employment Status
                      </label>
                      <select
                        name="employmentStatus"
                        id="employmentStatus"
                        value={selectedProf.employment_status}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="rounded-md border border-gray-300 p-2"
                        required
                      >
                        <option selected value="" disabled>
                          Select Employment Status
                        </option>
                        <option value="CASUAL">Casual</option>
                        <option value="PART_TIME">Part-time</option>
                        <option value="PERMANENT">Permanent</option>
                      </select>
                    </div>

                    {/* Email Address Field */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="mail"
                        className="text-lg font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="mail"
                        value={selectedProf.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Department Field */}
                    <div className="flex gap-10">
                      <div className="flex-1">
                        <label
                          htmlFor="department"
                          className="text-lg font-medium text-gray-700"
                        >
                          Department
                        </label>
                        <select
                          id="department"
                          value={selectedProf.department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          <option selected value="" disabled>
                            Select Department
                          </option>
                          {departments?.map((department) => (
                            <>
                              <option value={department.id}>
                                {department.name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      {/* Masteral Field */}
                      <div className="flex-1">
                        <label
                          htmlFor="masteral"
                          className="text-lg font-medium text-gray-700"
                        >
                          Masteral
                        </label>
                        <select
                          id="masteral"
                          value={selectedProf.has_masteral}
                          onChange={(e) => setHasMasteral(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          <option selected value="" disabled>
                            Select If Has Masteral
                          </option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
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

export default Professors;