import { useEffect, useState } from "react";
import DashboardRow from "./DashboardRow";

import api from "../../../../api";

const DashboardTable = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        "account/login-history/",
      );
      setDatas(...[response.data]);
    };

    fetchData();
  }, []);

  return (
    <table className="mb-16 table-fixed bg-white grid-in-table">
      <thead className="border-separate border border-gray-100 bg-green text-xs text-white">
        <tr>
          <th scope="col" className="border border-white p-2">
            Name
          </th>
          <th scope="col" className="border border-white">
            Login Time
          </th>
          <th scope="col" className="border border-white">
            IP Address
          </th>
          <th scope="col" className="border border-white">
            Browser
          </th>
          <th scope="col" className="border border-white">
            OS
          </th>
          <th scope="col" className="border border-white">
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
  );
};

export default DashboardTable;
