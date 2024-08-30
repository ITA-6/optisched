import { useState } from "react";
import user from "../../../assets/user.png";
import add from "../../../assets/add.png";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[20rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_6fr_6fr] grid-areas-user-layout">
        <div className="mr-5 grid grid-rows-[1fr_4fr] grid-areas-user-table-layout grid-in-userTable">
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
          <table className="table-fixed bg-white grid-in-table">
            <thead className="bg-green">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              <tr className="h-[30px] text-center">
                <th scope="row">1</th>
                <td>John Doe</td>
                <td>johndoe2922@gmail.com</td>
                <th>21312323213</th>
              </tr>
              <tr className="h-[30px] text-center">
                <th scope="row">2</th>
                <td>Jane Smith</td>
                <td>janesmith1234@gmail.com</td>
                <th>31231231231</th>
              </tr>
              <tr className="h-[30px] text-center">
                <th scope="row">3</th>
                <td>Michael Johnson</td>
                <td>michaeljohnson5678@gmail.com</td>
                <th>42342342342</th>
              </tr>
              <tr className="h-[30px] text-center">
                <th scope="row">4</th>
                <td>Emily Davis</td>
                <td>emilydavis9012@gmail.com</td>
                <th>53453453453</th>
              </tr>
              <tr className="h-[30px] text-center">
                <th scope="row">5</th>
                <td>Daniel Brown</td>
                <td>danielbrown3456@gmail.com</td>
                <th>64564564564</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-white"
            onClick={openModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">Create New User</h2>
            </div>
            <div className="p-5">
              <form className="mt-5 space-y-6">
                {/* Role Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="role"
                    className="text-lg font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
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

export default User;
