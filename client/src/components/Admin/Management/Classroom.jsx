import user from "../../../assets/user.png";
import classroom from "../../../assets/classroom.png";
import add from "../../../assets/add.png"
import { useState } from "react";
const Classroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        
        <div className="grid-in-userTable grid grid-areas-user-table-layout grid-rows-[1fr_8fr] mr-5">
            <div className="grid-in-div grid grid-areas-user-filter grid-cols-[8fr_2fr_2fr] gap-5 h-full justify-center items-center">
                <input type="text" placeholder="search" className="grid-in-search border pl-7 rounded-md" />
                <div className="grid-in-list  text-center">
                    <select className="w-full">
                        <option value="">List: All users</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
            </div>
            <table class="bg-white  grid-in-table table-fixed text-center w-full">
                <thead className="bg-green">
                    <tr class="h-[30px]">
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Employment Status</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="mb-10 overflow-auto h-full">
                    <tr class="h-[30px]">
                        <th scope="row">1</th>
                        <td>John Doe</td>
                        <td>Engineering</td>
                        <td>Full-Time</td>
                        <td>
                          <div className="flex justify-center items-center">
                              <span>Active</span>
                              <div className="ml-5 flex gap-2">
                                  <button className="w-16 -h5 bg-green text-white"> Edit</button>
                                  <button className="w-16 -h5 bg-green text-white"> Delete</button>
                              </div>
                          </div>
                        </td>
                    </tr>
                    <tr class="h-[30px]">
                        <th scope="row">2</th>
                        <td>Jane Smith</td>
                        <td>Human Resources</td>
                        <td>Part-Time</td>
                        <td>
                          <div className="flex justify-center items-center">
                              <span>Active</span>
                              <div className="ml-5 flex gap-2">
                                  <button className="w-16 -h5 bg-green text-white"> Edit</button>
                                  <button className="w-16 -h5 bg-green text-white"> Delete</button>
                              </div>
                          </div>
                        </td>
                    </tr>
                    <tr class="h-[30px]">
                        <th scope="row">3</th>
                        <td>Mike Johnson</td>
                        <td>Marketing</td>
                        <td>Full-Time</td>
                        <td>
                          <div className="flex justify-center items-center">
                              <span>Inactive</span>
                              <div className="ml-5 flex gap-2">
                                  <button className="w-16 -h5 bg-green text-white"> Edit</button>
                                  <button className="w-16 -h5 bg-green text-white"> Delete</button>
                              </div>
                          </div>
                        </td>
                    </tr>
                    <tr class="h-[30px]">
                        <th scope="row">4</th>
                        <td>Emily Davis</td>
                        <td>Finance</td>
                        <td>Contract</td>
                        <td>
                          <div className="flex justify-center items-center">
                              <span>Active</span>
                              <div className="ml-5 flex gap-2">
                                  <button className="w-16 -h5 bg-green text-white"> Edit</button>
                                  <button className="w-16 -h5 bg-green text-white"> Delete</button>
                              </div>
                          </div>
                        </td>
                    </tr>
                    <tr class="h-[30px]">
                        <th scope="row">5</th>
                        <td>Robert Brown</td>
                        <td>IT</td>
                        <td>Full-Time</td>
                        <td>
                          <div className="flex justify-center items-center">
                              <span>Active</span>
                              <div className="ml-5 flex gap-2">
                                  <button className="w-16 -h5 bg-green text-white"> Edit</button>
                                  <button className="w-16 -h5 bg-green text-white"> Delete</button>
                              </div>
                          </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-white"
            onClick={openModal}>
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New Classroom</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
              <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
              <h2 className="ml-2 text-3xl font-extrabold">Create New Section</h2>
            </div>
            <div className="p-5">
              <form className="mt-5 space-y-6">
                <div className="flex items-center">
                    <div className=" flex flex-1">
                      <label htmlFor="classroomId" className="font-medium text-lg">
                         Classroom ID :
                         </label>
                      <p 
                      id="classroomId"
                      name="classroomId"
                      className="font-medium text-lg inlin"
                      >
                        1
                      </p>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="buildingName" className="font-medium text-lg"> Building Name</label>
                  <input type="text" placeholder="Building Name" className="border border-gray-300 p-2 rounded-md" />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="floorNumber" className="font-medium text-lg"> Floor Number</label>
                  <input type="number" placeholder="Floor Number" className="border border-gray-300 p-2 rounded-md" />
                </div>
                <div className="flex gap-5 ">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="roomNumber" className="font-medium text-lg">Room Number</label>
                    <input type="number" id="roomNumber" name="roomNumber" placeholder="Room Number" className="border border-gray-300 p-2 rounded-md" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="roomCapacity" className="font-medium text-lg">Room Capacity</label>
                    <input type="number" id="roomCapacity" name="roomCapacity" placeholder="Room Number" className="border border-gray-300 p-2 rounded-md" />
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
