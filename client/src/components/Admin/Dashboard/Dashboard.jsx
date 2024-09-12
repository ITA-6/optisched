import user from "../../../assets/user.png";
import section from "../../../assets/section.png";
import classroom from "../../../assets/classroom.png";
import course from "../../../assets/course.png";

const Dashboard = () => {
  return (
    <div class="h-screen w-screen bg-white-grayish">
      <div class="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[1fr_4fr_1fr] grid-rows-[1fr_1fr_3fr_1fr_8fr] justify-between grid-areas-layout">
        <div class="mt-7 text-2xl font-extrabold grid-in-adminname">
          Welcome John Doe
        </div>
        <div class="flex items-center justify-between gap-10 bg-light-green grid-in-box">
          <div class="ml-10 flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={user} alt="" class="w-1/3 p-8" />
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-2xl">Professors</p>
            </div>
          </div>
          <div class="flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={section} alt="" class="w-1/3 p-7" />
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-2xl">Section</p>
            </div>
          </div>
          <div class="flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={classroom} alt="" class="w-1/3 p-7" />
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-2xl">Classroom</p>
            </div>
          </div>
          <div class="mr-10 flex h-2/3 flex-1 items-center rounded-3xl bg-white">
            <img src={course} alt="" class="w-1/3 p-8" />
            <div class="w-2/3">
              <p class="text-4xl font-extrabold">##</p>
              <p class="text-2xl">Courses</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-[1fr_5fr_1.5fr_1.5fr_1fr] items-center grid-areas-text-user grid-in-text">
          <p class="mt-5 text-2xl grid-in-userText">User Login History</p>
          <div className="grid-in-search">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="rounded-md border pl-7"
            />
          </div>
          <div className="ml-7 text-center grid-in-list">
            <select className="w-full">
              <option value="">List: All users</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <div class="grid h-full grid-cols-[1fr_8fr_1fr] text-center grid-areas-table grid-in-history">
          <table class="mb-5 table-fixed bg-white grid-in-table">
            <thead class="bg-green">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Last Seen</th>
                <th scope="col">First Seen</th>
                <th scope="col">Department</th>
                <th scope="col">Count of Sessions</th>
                <th scope="col">Last Session</th>
              </tr>
            </thead>
            <tbody class="mb-10 h-full overflow-auto">
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
              <tr class="h-[30px]">
                <th scope="row">Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
                <th>Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
                <th>Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
                <th>Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
              </tr>
              <tr class="h-[30px]">
                <th scope="row">Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
                <th>Sarah</th>
                <td>JavaScript frameworks</td>
                <td>29</td>
              </tr>
              <tr class="h-[30px]">
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
  );
};

export default Dashboard;
