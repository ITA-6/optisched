import user from "../../../assets/user.png";
import course from "../../../assets/course.png";

const Classroom = () => {
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[10rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="mt-10 text-4xl font-extrabold grid-in-userText">
          All Users
        </div>
        <div className="mt-10 flex items-end justify-end grid-in-Profile">
          <img src={user} alt="" className="mb-2 mr-2 h-8 w-8" />
        </div>
        <div className="grid-in-user-table-layout mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout">
          <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-div">
            <input
              type="text"
              placeholder="search"
              className="rounded-md border pl-7 grid-in-search"
            />
            <div className="bg-green text-center grid-in-list">Filter</div>
          </div>
          <table class="w-full table-fixed bg-white grid-in-table">
            <thead className="bg-green">
              <tr class="h-[30px]">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Employment Status</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
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
        <div className="grid-newUser grid grid-rows-[1fr_8fr] grid-areas-create-user-layout">
          <div className="h-full grid-in-table">
            <div className="flex h-1/6 items-center justify-center bg-green">
              <img src={course} alt="plus" className="h-[50px] w-[50px]" />
              <h2 className="ml-2 text-3xl font-extrabold">Add New Course</h2>
            </div>
            <form action="" className="grid h-5/6 gap-5 bg-white pb-5">
              <div className="ml-[4.5rem] flex items-center">
                <label
                  for="name"
                  className="text-center text-base font-extrabold"
                >
                  Name
                </label>
                <div className="ml-[1rem] mr-2 grid">
                  <label for="firstname"> firstname</label>
                  <input type="text" className="rounded-md border pl-3" />
                </div>
                <div className="grid">
                  <label for="lastname"> lastname</label>
                  <input type="text" className="rounded-md border pl-3" />
                </div>
              </div>
              <div className="flex items-center justify-start">
                <label
                  for="mail"
                  className="ml-[0.7rem] mr-3 text-base font-extrabold"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  className="w-3/4 rounded-md border pl-3"
                />
              </div>
              <div className="flex items-center justify-start">
                <label
                  for="department"
                  className="ml-2 mr-3 text-base font-extrabold"
                >
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="ml-[1rem] w-full rounded-md border pl-2"
                >
                  <option value="CCS">"CCS</option>
                  <option value="BSED">BSED</option>
                  <option value="COE">COE</option>
                  <option value="BSBA">BSBA</option>
                </select>
              </div>
              <div className="flex items-center justify-start">
                <label
                  for="expertise"
                  className="ml-[3rem] mr-3 text-base font-extrabold"
                >
                  Expertise
                </label>
                <input
                  type="email"
                  name="expertise"
                  id="expertise"
                  className="w-3/4 rounded-md border pl-3"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-60 rounded-2xl bg-green px-4 py-2 text-2xl font-extrabold text-white"
                >
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

export default Classroom;
