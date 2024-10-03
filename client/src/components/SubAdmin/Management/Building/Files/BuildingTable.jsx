import BuildingRow from "./BuildingRow";

const BuildingTable = ({ buildings, toggleDialog, openUpdate, totalRows}) => {
  console.log(buildings)
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return buildings[index] || { name: '', total_rooms: '', available_rooms: '' };
  });

  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky -top-0.5">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Building Name</th>
          <th scope="col" className="border border-white">Total Rooms</th>
          <th scope="col" className="border border-white">Available Rooms</th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
        {rowsToDisplay?.map((building, index) => (
          <BuildingRow 
            key={index}
            building={building}
           toggleDialog={toggleDialog}
            openUpdate={openUpdate}          
          />
        ))}
      </tbody>
    </table>
  );
};

export default BuildingTable;
