const DashboardRow = ({ data }) => {
    const { name, session_display, time, ip_address, user_agent_readable } = data;
    const { browser, os, device } = user_agent_readable;
  
    return (
      <tr className="">
        <th scope="row" className="border border-gray-200 xm:text-[0.7em]">
          {name}
        </th>
        <td className="border border-gray-200 xm:text-[0.7em]">{session_display}</td>
        <td className="border border-gray-200 xm:text-[0.7em]">{time}</td>
        <td className="border border-gray-200 xm:text-[0.7em]">{ip_address}</td>
        <td className="border border-gray-200 xm:text-[0.7em]">{browser}</td>
        <td className="border border-gray-200 xm:text-[0.7em]">{os}</td>
        <td className="border border-gray-200 xm:text-[0.7em]">{device}</td>
      </tr>
    );
  };
  
  export default DashboardRow;
  