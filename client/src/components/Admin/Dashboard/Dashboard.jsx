
import user from "../../../assets/user.png";
import section from "../../../assets/section.png";
import classroom from "../../../assets/classroom.png";
import course from "../../../assets/course.png";

const Dashboard = () => {
    return (
        <div class="bg-white-grayish h-screen w-screen">
          <div class="grid grid-areas-layout grid-cols-[1fr_4fr_1fr] grid-rows-[1fr_1fr_3fr_1fr_8fr] justify-between ml-[10rem] mr-[2rem] h-screen">
            <div class=" grid-in-admin text-3xl font-extrabold mt-10 whitespace-nowrap">
              Admin Dashboard
              </div>
            <div class="grid-in-profile mt-10 flex justify-end items-end">
              <img src={user} class="w-8 h-8 mb-2 mr-2" />
            </div>
            
            <div class="grid-in-adminname mt-7  font-extrabold text-2xl">
              Welcome John Doe
            </div>
            <div class=" grid-in-box flex gap-10 justify-between items-center bg-light-green">
              <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center ml-10">
                <img src={user} alt="" class="w-1/3 p-8"/>
                <div class="w-2/3">
                    <p class="text-4xl font-extrabold">##</p>
                    <p class="text-2xl">Professors</p>
                </div>
              </div>
              <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center">
                <img src={section} alt="" class="w-1/3 p-7"/>
                <div class="w-2/3">
                    <p class="text-4xl font-extrabold">##</p>
                    <p class="text-2xl">Section</p>
                </div>
              </div>
              <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center">
                <img src={classroom} alt="" class="w-1/3 p-7"/>
                <div class="w-2/3">
                    <p class="text-4xl font-extrabold">##</p>
                    <p class="text-2xl">Classroom</p>
                </div>
              </div>
              <div  class="flex flex-1 h-2/3 bg-white rounded-3xl items-center mr-10">
                <img src={course} alt="" class="w-1/3 p-8"/>
                <div class="w-2/3">
                    <p class="text-4xl font-extrabold">##</p>
                    <p class="text-2xl">Courses</p>
                </div>
              </div>
            </div>
            <div class="grid grid-areas-text-user grid-cols-[1fr_5fr_1.5fr_1.5fr_1fr] grid-in-text  items-center">
              <p class="text-2xl grid-in-userText mt-5">User Login History</p>
              <div className="grid-in-search">
                <input type="text" name="search" id="search" placeholder="Search" className=" border pl-7 rounded-md" />
              </div>
              <div className="grid-in-list text-center ml-7 " >
                <select className="w-full">
                      <option value="">List: All users</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                  </select>
              </div>
            </div>
            <div class="grid grid-cols-[1fr_8fr_1fr] grid-areas-table grid-in-history h-full text-center">
              <table class="bg-white grid-in-table table-fixed mb-5">
                <thead class="bg-green" >
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last Seen</th>
                    <th scope="col">First Seen</th>
                    <th scope="col">Department</th>
                    <th scope="col">Count of Sessions</th>
                    <th scope="col">Last Session</th>
                  </tr>
                </thead>
                <tbody class="mb-10 overflow-auto h-full">
                  <tr class="h-[30px]">
                    <th scope="row">Chris</th>
                    <td>HTML tables</td>
                    <td>22</td>
                    <th>Chris</th>
                    <td>HTML tables</td>
                    <td>22</td>
                  </tr>
                  <tr class="h-[30px]">
                    <th scope="row">Dennis</th>
                    <td>Web accessibility</td>
                    <td>45</td>
                    <th>Dennis</th>
                    <td>Web accessibility</td>
                    <td>45</td>
                  </tr>
                  <tr class="h-[30px]" >
                    <th scope="row">Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                    <th>Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                  </tr>
                  <tr class="h-[30px]" >
                    <th scope="row">Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                    <th>Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                  </tr>
                  <tr class="h-[30px]" >
                    <th scope="row">Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                    <th>Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                  </tr>
                  <tr class="h-[30px]" >
                    <th scope="row">Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                    <th>Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                  </tr>
                  <tr class="h-[30px]" >
                    <th scope="row">Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                    <th>Sarah</th>
                    <td>JavaScript frameworks</td>
                    <td>29</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>

    )
};

export default Dashboard;
