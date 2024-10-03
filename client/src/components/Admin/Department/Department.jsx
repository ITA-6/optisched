
import DepartmentTable from "./Files/DepartmentTable";
import SearchField from "./Files/SearchField";
import { useState, useEffect } from "react";
import api from "../../../api";

const ViewDepartment = () => {
  const [departments, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("departments/");
      setDepartment(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_6fr_2fr] grid-areas-user-layout">
        <SearchField />
        <div className="mr-5 grid grid-areas-user-table-layout grid-in-userTable">
         
          <DepartmentTable
            departments={departments}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewDepartment;
