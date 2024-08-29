import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png"
import { useState } from "react";
const Course = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="h-screen w-screen bg-white-grayish">
            <div className="grid grid-areas-user-layout grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] h-screen ml-[18rem]  mr-[2rem]">
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
                                <td>Active</td>
                            </tr>
                            <tr class="h-[30px]">
                                <th scope="row">2</th>
                                <td>Jane Smith</td>
                                <td>Human Resources</td>
                                <td>Part-Time</td>
                                <td>Active</td>
                            </tr>
                            <tr class="h-[30px]">
                                <th scope="row">3</th>
                                <td>Mike Johnson</td>
                                <td>Marketing</td>
                                <td>Full-Time</td>
                                <td>Inactive</td>
                            </tr>
                            <tr class="h-[30px]">
                                <th scope="row">4</th>
                                <td>Emily Davis</td>
                                <td>Finance</td>
                                <td>Contract</td>
                                <td>Active</td>
                            </tr>
                            <tr class="h-[30px]">
                                <th scope="row">5</th>
                                <td>Robert Brown</td>
                                <td>IT</td>
                                <td>Full-Time</td>
                                <td>Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex items-start justify-end grid-in-button">
                    <button
                        className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-white"
                        onClick={openModal}>
                        <img src={add} alt="" className="h-[30px] w-[30px]" />
                        <span>Add New Course</span>
                    </button>
                </div>
            </div>
            {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
                    <div className="flex h-1/5 items-center justify-center bg-green">
                    <img src={user} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
                    <h2 className="ml-2 text-3xl font-extrabold">Create New Course</h2>
                    </div>
                    <div className="p-5">
                    <form className="mt-5 space-y-6">
                        <div className="flex items-center">
                            <div className=" flex flex-1">
                            <label htmlFor="classroomId" className="font-medium text-lg">
                                Course ID :
                                </label>
                            <p 
                            id="courseId"
                            name="courseId"
                            className="font-medium text-lg inlin"
                            >
                                1
                            </p>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="courseTitle" className="font-medium text-lg"> Course Title</label>
                            <input type="text" id="courseTitle" name="courseTitle" placeholder="Course Title" className="border border-gray-300 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="courseCode" className="font-medium text-lg"> Course Code</label>
                            <input type="text" name="courseCode" id="courseCode" placeholder="Course Code" className="border border-gray-300 p-2 rounded-md" />
                        </div>
                        <div className="flex gap-5 ">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="department" className="font-medium text-lg">Department</label>
                                <select name="department" id="department" className="border border-gray-300 rounded-md p-2">
                                    <option value="CCS">CCS</option>
                                    <option value="CCS">CCS</option>
                                    <option value="CCS">CCS</option>
                                    <option value="CCS">CCS</option>
                                    <option value="CCS">CCS</option>
                                </select>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="courseType" className="font-medium text-lg">Course Type</label>
                                <select name="courseType" id="courseType" className="border border-gray-300 rounded-md p-2">
                                    <option value="CCS">Lecture</option>
                                    <option value="CCS">Laboratory</option>
                                    <option value="Both">Laboratory && Lecture</option>
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

export default Course;
