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
      <table className="relative mb-16 table-fixed bg-white grid-in-table xm:w-full">
        <thead className="z-0 sticky top-0 border-separate border border-gray-100 bg-green text-xs text-white xm:text-[0.5em]">
          <tr>
            <th scope="col" className="border border-white p-2 xm:p-[0.2rem] xm:w-20 ">
              Name
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Session
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Time
            </th>
            <th scope="col" className="border border-white xm:w-20">
              IP Address
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Browser
            </th>
            <th scope="col" className="border border-white xm:w-20">
              OS
            </th>
            <th scope="col" className="border border-white xm:w-20">
              Device
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
