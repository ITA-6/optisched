import { useEffect, useState } from "react";
import DashboardRow from "./DashboardRow";

import api from "../../../../api";

const DashboardTable = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("account/login-history/");
      setDatas(...[response.data]);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-[1fr_8fr_1fr] text-center grid-areas-table grid-in-history">
      <table className="relative table-fixed bg-white grid-in-table xm:w-full">
        <thead className="sticky top-0 z-0 border-separate border border-gray-100 bg-green text-xs text-white xm:text-[0.5em]">
          <tr>
            <th
              scope="col"
              className="border border-white p-2 xm:w-20 xm:p-[0.2rem]"
            >
              Name
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Activity
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Time
            </th>
            <th>Description</th>
            <th scope="col" className="border border-white xm:w-20">
              IP Address
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Browser
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {datas?.map((data, index) => (
            <DashboardRow key={index} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
