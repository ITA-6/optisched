const DashboardRow = ({ data }) => {
  const { name, login_time, ip_address, user_agent_readable } = data;
  const { browser, os, device } = user_agent_readable;

  return (
    <tr className="h-10 max-h-10">
      <th scope="row" className="border border-gray-200">
        {name}
      </th>
      <td className="border border-gray-200">{login_time}</td>
      <td className="border border-gray-200">{ip_address}</td>
      <td className="border border-gray-200">{browser}</td>
      <td className="border border-gray-200">{os}</td>
      <td className="border border-gray-200">{device}</td>
    </tr>
  );
};

export default DashboardRow;
