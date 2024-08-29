import user from "../../../assets/user.png";
import add from "../../../assets/add.png"
const Professor = () => {
    return(
        <div className="h-screen w-screen bg-white-grayish">
            <div className="grid grid-areas-user-layout grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] h-screen  ml-[18rem]  mr-[2rem]">
                <div className="grid-in-userTable grid grid-areas-user-table-layout grid-rows-[1fr_8fr] mr-5">
                    <div className="grid-in-div grid grid-areas-user-filter grid-cols-[8fr_2fr_2fr] gap-5 h-full justify-center items-center">
                        <input type="text" placeholder="search" className="grid-in-search border pl-7 rounded-md" />
                        <div className="grid-in-list text-center">
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
                        <tbody className="mb-10 overflow-auto text-center h-full">
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
                    >
                        <img src={add} alt="" className="h-[30px] w-[30px]" />
                        <span>Add New Professor</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
    
export default Professor;