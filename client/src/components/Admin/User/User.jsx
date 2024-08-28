import user from "../../../assets/user.png";
import add from "../../../assets/add.png";

const User = () => {
  return (
    <div class="h-screen w-screen bg-white-grayish">
      <div className="ml-[19rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_6fr_6fr] grid-areas-user-layout">
        <div className="grid-in-userTable mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout">
          <div class="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-div">
            <input
              type="text"
              placeholder="search"
              class="rounded-md border pl-7 grid-in-search"
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
          <table class="w-full table-fixed bg-white grid-in-table">
            <thead class="bg-green">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody class="mb-10 h-full overflow-auto">
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
        <div className="grid-in-newUser grid grid-rows-[1fr_8fr] grid-areas-create-user-layout">
          <div className="grid-in-table  bg-white">
            <div className="flex h-1/5 items-center justify-center  bg-green">
              <img src={user} alt="" className="h-[50px] w-[50px]" />
              <h2 className="ml-2 text-3xl font-extrabold">Create New User</h2>
            </div>
            <div className="p-5">
              <form action="" className="mt-5 grid gap-5">
                <div className="ml-20 flex items-center justify-start">
                  <label for="role" className="text-base font-extrabold">
                    Role
                  </label>
                  <input
                    type="text"
                    className="ml-[1rem] w-3/5 rounded-md border pl-3"
                  />
                </div>
                <div className="ml-[4.5rem] flex items-center">
                  <label
                    for="name"
                    className="text-center text-base font-extrabold"
                  >
                    Name
                  </label>
                  <div className="ml-[1rem] mr-2 grid">
                    <label for="firstname">Firstname</label>
                    <input type="text" className="rounded-md border pl-3" />
                  </div>
                  <div className="grid">
                    <label for="lastname">Lastname</label>
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
                    id="department"
                    className="ml-[1rem] w-full rounded-md border pl-2"
                  >
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
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-white">
            <img src={add} alt="" className="h-[30px] w-[30px]" />
            <span>Add New User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
