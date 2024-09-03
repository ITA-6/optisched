import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import section from "../../../assets/section.png";
import add from "../../../assets/add.png";
import { useState } from "react";

const Section = () => {
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
                <th scope="col">Section Name</th>
                <th scope="col">Maximum Capacity</th>
                <th scope="col">Section Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              <tr class="h-[30px]">
                <th scope="row">1</th>
                <td>IT-A</td>
                <td>50</td>
                <td>Lecture & Lab</td>
                <td>
                  <div className="flex items-center justify-center">
                    <span>Open</span>
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
                <td>IT-B</td>
                <td>50</td>
                <td>Lecture</td>
                <td>
                  <div className="flex items-center justify-center">
                    <span>Open</span>
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
                <td>IT-C</td>
                <td>50</td>
                <td>Laboratory</td>
                <td>
                  <div className="flex items-center justify-center">
                    <span>Closed</span>
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
                <td>IT-D</td>
                <td>50</td>
                <td>Lecture</td>
                <td>
                  <div className="flex items-center justify-center">
                    <span>Closed</span>
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
                <td>IT-E</td>
                <td>50</td>
                <td>Lecture & Lab</td>
                <td>
                  <div className="flex items-center justify-center">
                    <span>Open</span>
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
          <button className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black">
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span onClick={openModal}>Add New Section</span>
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
              <form className="mr-5 mt-5 space-y-6 text-lg font-medium">
                <div className="flex">
                  <label htmlFor="sectionId"> Section ID :</label>
                  <p className="text-lg font-medium">1</p>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="section">Section Name</label>
                    <input
                      type="text"
                      name="section"
                      id="section"
                      placeholder="Section Name"
                      className="rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="maximumCount">Maximum Capacity</label>
                    <input
                      type="number"
                      name="maximumCount"
                      id="maximumCount"
                      placeholder="0"
                      className="rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="sectionType">Section Type</label>
                    <select
                      name="sectionType"
                      id="sectionType"
                      className="flex-1 rounded-lg border border-gray-300 p-2"
                    >
                      <option value="Lecture">Lecture</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="labLec">Laboratory && Lecture</option>
                    </select>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="sectionStatus">Status</label>
                    <select
                      name="sectionStatus"
                      id="sectionStatus"
                      className="flex-1 rounded-lg border border-gray-300 p-2"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
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
    </div>
  );
};

export default Section;
