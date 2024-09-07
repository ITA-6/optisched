import user from "../../../assets/user.png";
import classroom from "../../../assets/classroom.png";
import add from "../../../assets/add.png";
import { useState } from "react";
const Classroom = () => {
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
                <th scope="col">ID</th>
                <th scope="col">Building Name</th>
                <th scope="col">Room Number</th>
                <th scope="col">Room Capacity</th>
                <th scope="col">Floor Number</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              <tr class="h-[30px]">
                <th scope="row">1</th>
                <td>Main Academic Building</td>
                <td>101</td>
                <td>40</td>
                <td>1</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">2</th>
                <td>Science Wing</td>
                <td>205</td>
                <td>35</td>
                <td>2</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">3</th>
                <td>Library Annex</td>
                <td>310</td>
                <td>50</td>
                <td>3</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">4</th>
                <td>Arts and Music Building</td>
                <td>415</td>
                <td>25</td>
                <td>4</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">5</th>
                <td>Administration Office</td>
                <td>520</td>
                <td>20</td>
                <td>5</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">6</th>
                <td>Sports Complex</td>
                <td>601</td>
                <td>100</td>
                <td>1</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">7</th>
                <td>Engineering Lab</td>
                <td>702</td>
                <td>30</td>
                <td>2</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">8</th>
                <td>Medical Center</td>
                <td>803</td>
                <td>15</td>
                <td>3</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">9</th>
                <td>Design Studio</td>
                <td>904</td>
                <td>20</td>
                <td>4</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
              <tr class="h-[30px]">
                <th scope="row">10</th>
                <td>Computer Science Building</td>
                <td>1010</td>
                <td>45</td>
                <td>5</td>
                <td>Open</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="ml-5 flex gap-2">
                      <button className="-h5 w-16 bg-green text-white">
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
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
            onClick={openModal}
          >
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Classroom</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img
                src={classroom}
                alt=""
                className="m-3 mr-4 h-[40px] w-[40px]"
              />
              <h2 className="ml-2 text-3xl font-extrabold">
                Create New Section
              </h2>
            </div>
            <div className="p-5">
              <form className="mt-5 space-y-6">
                <div className="flex items-center">
                  <div className="flex flex-1">
                    <label
                      htmlFor="classroomId"
                      className="text-lg font-medium"
                    >
                      Classroom ID :
                    </label>
                    <p
                      id="classroomId"
                      name="classroomId"
                      className="inlin text-lg font-medium"
                    >
                      1
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="buildingName" className="text-lg font-medium">
                    {" "}
                    Building Name
                  </label>
                  <input
                    type="text"
                    placeholder="Building Name"
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="floorNumber" className="text-lg font-medium">
                    {" "}
                    Floor Number
                  </label>
                  <input
                    type="number"
                    placeholder="Floor Number"
                    className="rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="roomNumber" className="text-lg font-medium">
                      Room Number
                    </label>
                    <input
                      type="number"
                      id="roomNumber"
                      name="roomNumber"
                      placeholder="Room Number"
                      className="rounded-md border border-gray-300 p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor="roomCapacity"
                      className="text-lg font-medium"
                    >
                      Room Capacity
                    </label>
                    <input
                      type="number"
                      id="roomCapacity"
                      name="roomCapacity"
                      placeholder="Room Number"
                      className="rounded-md border border-gray-300 p-2"
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
    </div>
  );
};

export default Classroom;
