import { useState } from "react";
import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import add from "../../../assets/add.png";
const Building = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return(
        <div className="w-screen h-screen flex justify-center items-center bg-white-grayish">
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
                                <th scope="col">ID</th>
                                <th scope="col">Building Name</th>
                                <th scope="col">Total Rooms</th>
                                <th scope="col">Available Rooms</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Main Building PNC Campus</td>
                                <td>10</td> 
                                <td>20</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Main Building PNC Campus</td>
                                <td>8</td>
                                <td>15</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Building C Citech Campus</td>
                                <td>12</td> 
                                <td>30</td> 
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Building B Citech Campus</td>
                                <td>9</td> 
                                <td>25</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Bagong Cabuyao Hall PNC Campus</td>
                                <td>7</td>
                                <td>10</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Building D Citech Campus</td>
                                <td>11</td>
                                <td>18</td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="ml-5 flex gap-2">
                                            <button className="h-7 w-20 bg-green text-white">
                                                Edit
                                            </button>
                                            <button className="h-7 w-20 bg-red-500 text-white">
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
                        <span>Add New Building</span>
                    </button>
                    </div>
                </div>
                {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
                    <div className="flex h-1/5 items-center justify-center bg-green">
                    <img src={course} alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
                    <h2 className="ml-2 text-3xl font-extrabold">
                        Create New Building
                    </h2>
                    </div>
                    <div className="p-5">
                    <form className="mt-5 space-y-6">
                        <div className="flex items-center">
                        <div className="flex flex-1">
                            <label
                            htmlFor="BuildingId"
                            className="text-lg font-medium"
                            >
                            Building ID :
                            </label>
                            <p
                            id="BuildingId"
                            name="BuildingId"
                            className="inlin text-lg font-medium"
                            >
                            1
                            </p>
                        </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <label htmlFor="BuildingName" className="text-lg font-medium">
                                {" "}
                                Building Name
                            </label>
                            <input
                                type="text"
                                id="BuildingName"
                                name="BuildingName"
                                placeholder="Building  Name"
                                className="rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>
                        <div className="flex gap-10">
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="NoFloors" className="text-lg font-medium">
                                    {" "}
                                    No. Floors
                                </label>
                                <input
                                    type="number"
                                    id="NoFloors"
                                    name="NoFloors"
                                    placeholder="No. Floors"
                                    className="rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="availableRooms" className="text-lg font-medium">
                                    {" "}
                                    Available Rooms
                                </label>
                                <input
                                    type="number"
                                    id="availableRooms"
                                    name="availableRooms"
                                    placeholder="availableRooms"
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
    )
}

export default Building;