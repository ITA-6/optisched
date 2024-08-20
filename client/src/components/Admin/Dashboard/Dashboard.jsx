
import user from "../../../assets/user.png";

const Dashboard = () => {
    return (
      <div class="grid grid-areas-layout grid-cols-[1fr_4fr_1fr] grid-rows-[1fr_1fr_3fr_1fr_8fr] justify-between ml-[10rem] mr-[2rem] h-screen">
        <div class=" grid-in-admin text-3xl font-extrabold mt-10">Admin Dashboard</div>
        <div class="grid-in-profile mt-10 flex justify-end items-end">
          <img src={user} class="w-15 h-15 mb-2 mr-2" />
        </div>
          
        <div class="grid-in-adminname mt-10  font-extrabold text-2xl">
          Admin User Name
        </div>
        <div class=" grid-in-box flex gap-10 justify-between items-center bg-light-green">
          <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center ml-10">
          <img src={user} alt="" class="w-1/3 p-7"/>
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-3xl">Professors</p>
            </div>
          </div>
          <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center">
          <img src={user} alt="" class="w-1/3 p-7"/>
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-3xl">Section</p>
            </div>
          </div>
          <div class=" flex flex-1 h-2/3 bg-white rounded-3xl items-center">
          <img src={user} alt="" class="w-1/3 p-7"/>
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-3xl">Classroom</p>
            </div>
          </div>
          <div  class="flex flex-1 h-2/3 bg-white rounded-3xl items-center mr-10">
          <img src={user} alt="" class="w-1/3 p-7"/>
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-3xl">Courses</p>
            </div>
          </div>
        </div>
        <div class="grid grid-areas-text-user grid-cols-[1fr_5fr_1.5fr_1.5fr_1fr] grid-in-text items-center">
          <p class="text-2xl grid-in-userText">User Login History</p>
          <input class ="grid-in-search border pl-7 rounded-md" type="text" name="search" id="search" placeholder="Search" />
        </div>
        <div class="grid grid-cols-[1fr_8fr_1fr] grid-areas-table grid-in-history h-full">
          <table class="grid-in-table table-fixed">
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
    )



};

export default Dashboard;
