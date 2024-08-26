import user from "../../../assets/user.png";

const User = () =>{
    return (

        <div className="grid grid-areas-user-layout grid-cols-[2fr_1fr] grid-rows-[1fr_6fr_6fr] h-screen  ml-[10rem]  mr-[2rem]">
            <div class=" grid-in-userText font-extrabold text-4xl  mt-10">All User</div>
            <div class="grid-in-Profile flex justify-end items-end mt-10">
                <img src={user} class="w-15 h-15 mb-2 mr-2" />
            </div>
            <div className="grid-in-user-table-layout grid grid-areas-user-table-layout grid-rows-[1fr_8fr]">
                <div class="grid-in-div grid grid-areas-user-filter grid-cols-[8fr_2fr_2fr] gap-5 h-full justify-center items-center">
                    <input type="text" placeholder="search" class="grid-in-search border pl-7 rounded-md"  />
                    <div className="grid-in-list bg-green text-center" > Filter</div>
                </div>
                <table class="grid-in-table table-fixed w-full ">
                    <thead class="bg-green" >
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody class="mb-10 overflow-auto h-full">
                        <tr class="h-[30px] text-center">
                            <th scope="row">1</th>
                            <td>John Doe</td>
                            <td>johndoe2922@gmail.com</td>
                            <th>21312323213</th>
                        </tr>
                        <tr class="h-[30px] text-center">
                            <th scope="row">2</th>
                            <td>Jane Smith</td>
                            <td>janesmith1234@gmail.com</td>
                            <th>31231231231</th>
                        </tr>
                        <tr class="h-[30px] text-center">
                            <th scope="row">3</th>
                            <td>Michael Johnson</td>
                            <td>michaeljohnson5678@gmail.com</td>
                            <th>42342342342</th>
                        </tr>
                        <tr class="h-[30px] text-center">
                            <th scope="row">4</th>
                            <td>Emily Davis</td>
                            <td>emilydavis9012@gmail.com</td>
                            <th>53453453453</th>
                        </tr>
                        <tr class="h-[30px] text-center">
                            <th scope="row">5</th>
                            <td>Daniel Brown</td>
                            <td>danielbrown3456@gmail.com</td>
                            <th>64564564564</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-newUser grid grid-areas-create-user-layout grid-rows-[1fr_8fr]">
                <div className="grid-in-table">
                    <div className="flex items-center justify-center bg-green h-1/5">
                        <img src={user} alt="" className="h-[50px] w-[50px]" />
                        <h2 className="text-3xl font-extrabold ml-2 ">Create New User</h2>
                    </div>
                    <div>
                        <form action="" className="grid gap-5 mt-5">
                            <div className="flex justify-start items-center ml-20">
                                <label for="role" className=" font-extrabold text-base"> Role </label>
                                <input type="text" className=" border pl-3 rounded-md w-3/5 ml-[1rem]"/>
                            </div>
                            <div className="flex  items-center ml-[4.5rem]">
                                <label for="name" className="font-extrabold text-base text-center "> Name </label>
                                <div className="grid mr-2 ml-[1rem]">
                                    <label for="firstname"> Firstname </label>
                                    <input type="text" className=" border pl-3 rounded-md"/>
                                </div>
                                <div className="grid">
                                    <label for="lastname"> lastname </label>
                                    <input type="text" className=" border pl-3 rounded-md "/>
                                </div>
                            </div>
                            <div className="flex justify-start items-center ">
                                <label for="mail" className="mr-3 font-extrabold text-base ml-[0.7rem]"> Email Address </label>
                                <input type="email" className=" border pl-3 rounded-md w-3/4"/>
                             </div>
                             <div className="flex justify-start items-center ">
                                <label for="department" className="mr-3 font-extrabold text-base ml-2">Department </label>
                                <select id="department" className="w-full  border pl-2 rounded-md ml-[1rem]">
                                    <option value="CCS">CCS</option>
                                    <option value="BSeD">BSeD</option>
                                    <option value="CoE">CoE</option>
                                    <option value="BSBA">BSBA</option>
                                </select>
                             </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="grid-in-button flex justify-end items-start">
                <button className="w-52 h-20 mr-5 bg-light-green text-white border-2 border-black rounded-3xl">
                    <img src="" alt="plus"  />
                    Add New User
                </button>
            </div>
        </div>   
    )
}


export default User;