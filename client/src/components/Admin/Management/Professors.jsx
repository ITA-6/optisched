import user from "../../../assets/user.png";
import classroom from "../../../assets/classroom.png";
import add from "../../../assets/add.png";
import { useState } from "react";
const Professors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
          <table class="w-full table-fixed bg-white text-center grid-in-table">
            <thead className="bg-green">
              <tr class="h-[30px]">
                <th scope="col" className="w-[100px] h-[30px]">ID</th>
                <th scope="col" className="w-[150px] h-[30px]">Name</th>
                <th scope="col" className="w-[150px] h-[30px]">Gender</th>
                <th scope="col" className="w-[200px] h-[30px]">Email Address</th>
                <th scope="col" className="w-[150px] h-[30px]">Phone No.</th>
                <th scope="col" className="w-[150px] h-[30px]">Department</th>
                <th scope="col" className="w-[100px] h-[30px]">Masteral</th>
                <th scope="col" className="w-[150px] h-[30px]">Status</th>
                <th scope="col" className="w-[220px] h-[30px]"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              <tr class="h-[30px]">
                <th scope="row">1</th>
                <td>John Doe</td>
                <td>Male</td>
                <td>johndoe@example.com</td>
                <td>+63 912 345 6789</td>
                <td className="w-[100px]">Engineering</td>
                <td>MSc</td>
                <td>Active</td>
                <td>
                <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">2</th>
                <td>Jane Smith</td>
                <td>Female</td>
                <td>janesmith@example.com</td>
                <td>+63 987 654 3210</td>
                <td className="w-[100px]">Human Resources</td>
                <td>MBA</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">3</th>
                <td>Mike Johnson</td>
                <td>Male</td>
                <td>mikejohnson@example.com</td>
                <td>+63 555 123 4567</td>
                <td>Marketing</td>
                <td>BBA</td>
                <td>Inactive</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">4</th>
                <td>Emily Davis</td>
                <td>Female</td>
                <td>emilydavis@example.com</td>
                <td>+63 666 777 8888</td>
                <td>Finance</td>
                <td>MSc</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">5</th>
                <td>Robert Brown</td>
                <td>Male</td>
                <td>robertbrown@example.com</td>
                <td>+63 444 555 6666</td>
                <td>IT</td>
                <td>BSc</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">6</th>
                <td>Anna White</td>
                <td>Female</td>
                <td>annawhite@example.com</td>
                <td>+63 333 222 1111</td>
                <td>Mathematics</td>
                <td>MSc</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">7</th>
                <td>Chris Lee</td>
                <td>Male</td>
                <td>chrislee@example.com</td>
                <td>+63 888 999 0000</td>
                <td>Physics</td>
                <td>PhD</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">8</th>
                <td>Lisa Green</td>
                <td>Female</td>
                <td>lisagreen@example.com</td>
                <td>+63 777 888 9999</td>
                <td>Biology</td>
                <td>PhD</td>
                <td>Inactive</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">9</th>
                <td>David King</td>
                <td>Male</td>
                <td>davidking@example.com</td>
                <td>+63 999 111 2222</td>
                <td>Chemistry</td>
                <td>MSc</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">10</th>
                <td>Maria Garcia</td>
                <td>Female</td>
                <td>mariagarcia@example.com</td>
                <td>+63 555 333 4444</td>
                <td>Economics</td>
                <td>MSc</td>
                <td>Active</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
                        Edit
                      </button>
                      <button className="-h5 w-16 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
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
              <form className="mt-5 space-y-6">
                {/* Professor ID */}
                <div className="flex items-center">
                  <div className="flex flex-1">
                    <label
                      htmlFor="professorId"
                      className="text-lg font-medium"
                    >
                      Professor ID :
                    </label>
                    <p
                      id="professorId"
                      name="professorId"
                      className="inlin text-lg font-medium"
                    >
                      1
                    </p>
                  </div>
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
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
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
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
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
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Gender Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="gender"
                    className="text-lg font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-lg font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+63"
                  />
                </div>

                {/* Department Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="department"
                    className="text-lg font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="CCS">CCS</option>
                    <option value="BSeD">BSeD</option>
                    <option value="CoE">CoE</option>
                    <option value="BSBA">BSBA</option>
                  </select>
                </div>

                {/* Masteral Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="masteral"
                    className="text-lg font-medium text-gray-700"
                  >
                    Masteral
                  </label>
                  <select
                    id="masteral"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
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
    </div>
  );
};

export default Professors;
