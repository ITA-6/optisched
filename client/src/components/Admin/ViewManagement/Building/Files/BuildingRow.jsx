

const BuildingRow = ({ building}) => {

 
  return(
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{building.name}</td>
        <td className="border-y-2 border-gray-200">{building.total_rooms}</td>
        <td className="border-y-2 border-gray-200">{building.available_rooms}</td>
    </tr>
  )
};

export default BuildingRow;
