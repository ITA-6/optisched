const DashboardRow = ({ data }) => {
  const {
    name,
    action_display,
    time,
    ip_address,
    user_agent_readable,
    description,
  } = data;
  const { browser } = user_agent_readable;

  return (
    <tr className="">
      <th scope="row" className="border border-gray-200 xm:text-[0.7em]">
        {name}
      </th>
      <td className="border border-gray-200 xm:text-[0.7em]">
        {action_display}
      </td>
      <td className="border border-gray-200 xm:text-[0.7em]">{time}</td>
      <td className="border border-gray-200 xm:text-[0.7em]">{description}</td>
      <td className="border border-gray-200 xm:text-[0.7em]">{ip_address}</td>
      <td className="border border-gray-200 xm:text-[0.7em]">{browser}</td>
    </tr>
  );
};

export default DashboardRow;
