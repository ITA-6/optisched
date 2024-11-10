

const BuildingRow = ({ filteredBuildings}) => {

 
  return(
      <tr className="h-16">
        <td className="border-y-2 border-gray-200">{filteredBuildings.name}</td>
        <td className="border-y-2 border-gray-200">{filteredBuildings.total_rooms}</td>
        <td className="border-y-2 border-gray-200">{filteredBuildings.available_rooms}</td>
    </tr>
  )
};

export default BuildingRow;
