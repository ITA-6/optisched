import user from "../../../assets/user.png";
import course from "../../../assets/course.png";
import section from "../../../assets/section.png";

const Section = () => {
  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
        <div className="grid-in-userTable mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout">
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
          <table class="w-full table-fixed text-center bg-white grid-in-table">
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
      </div>
    </div>
  );
};

export default Section;
