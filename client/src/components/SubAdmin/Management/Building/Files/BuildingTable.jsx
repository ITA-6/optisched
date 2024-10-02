import BuildingRow from "./BuildingRow";

const BuildingTable = ({ buildings, toggleDialog, openUpdate}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green text-white text-xs border-separate border border-white">
        <tr className="h-[30px]">
          <th scope="col" className="border border-white">Building Name</th>
          <th scope="col" className="border border-white">Total Rooms</th>
          <th scope="col" className="border border-white">Available Rooms</th>
          <th scope="col" className="border border-white"></th>
        </tr>
      </thead>
      <tbody className="text-sm border-collapse border border-gray-100">
        {buildings?.map((building) => (
          <BuildingRow 
            key={building.id}
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
