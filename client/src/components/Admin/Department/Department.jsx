
import DepartmentTable from "./Files/DepartmentTable";
import SearchField from "./Files/SearchField";
import { useState, useEffect } from "react";
import api from "../../../api";

const ViewDepartment = () => {
  const [departments, setDepartment] = useState([]);
  const totalRows = (departments.length < 10) ? 10 : departments.length;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("departments/");
      setDepartment(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(departments.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <DepartmentTable
            departments={departments}
            totalRows={totalRows}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewDepartment;
