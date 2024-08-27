import user from "../../../assets/user.png";
import course from "../../../assets/course.png";

const Course = () =>{
    return (
        <div className="h-screen w-screen bg-white-grayish">
            <div className="grid grid-areas-user-layout grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] h-screen  ml-[10rem]  mr-[2rem]">
                <div className="grid-in-userText font-extrabold text-4xl  mt-10">All Users</div>
                <div className="grid-in-Profile flex justify-end items-end mt-10">
                    <img src={user} alt="" className="w-8 h-8 mb-2 mr-2" />
                </div>
                <div className="grid-in-user-table-layout grid grid-areas-user-table-layout grid-rows-[1fr_8fr] mr-5">
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
                <div className="grid-newUser grid grid-areas-create-user-layout grid-rows-[1fr_8fr]">
                    <div className="grid-in-table h-full">
                        <div className="flex items-center  justify-center bg-green h-1/6">
                            <img src={user} alt="plus" className="h-[50px] w-[50px]" />
                            <h2 className="text-3xl font-extrabold ml-2 ">Add New Course</h2>
                        </div>
                        <form action="" className="bg-white  grid gap-5 h-5/6 pb-5">
                            <div className="flex  items-center ml-[4.5rem]">
                                <label for="name" className="font-extrabold text-base text-center ">Name</label>
                                <div className="grid mr-2 ml-[1rem]">
                                    <label for="firstname"> firstname</label>
                                    <input type="text" className=" border pl-3 rounded-md"/>
                                </div>
                                <div className="grid">
                                    <label for="lastname"> lastname</label>
                                    <input type="text" className=" border pl-3 rounded-md"/>
                                </div>
                            </div>
                            <div className="flex justify-start items-center ">
                                <label for="mail" className="mr-3 font-extrabold text-base ml-[0.7rem]">Email Address</label>
                                <input type="email" name="mail" id="mail" className=" border pl-3 rounded-md w-3/4" />
                            </div>
                            <div className="flex justify-start items-center ">
                                <label for="department" className="mr-3 font-extrabold text-base ml-2">Department</label>
                                <select name="department" id="department" className="w-full  border pl-2 rounded-md ml-[1rem]">
                                    <option value="CCS">"CCS</option>
                                    <option value="BSED">BSED</option>
                                    <option value="COE">COE</option>
                                    <option value="BSBA">BSBA</option>
                                </select>
                            </div>
                            <div className="flex justify-start items-center ">
                                <label for="expertise" className="mr-3 font-extrabold text-base ml-[3rem]">Expertise</label>
                                <input type="email" name="expertise" id="expertise" className=" border pl-3 rounded-md w-3/4 " />
                            </div>
                            <div className="flex justify-center items-center">
                                <button type="submit" className=" bg-green text-white font-extrabold text-2xl rounded-2xl w-52">
                                    Add New Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Course;
