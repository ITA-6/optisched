import BuildingRow from "./BuildingRow";

const BuildingTable = ({ buildings, toggleDialog, openUpdate}) => {
  return (
    <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
      <thead className="bg-green text-white text-xs">
        <tr className="h-[30px]">
          <th scope="col">Building Name</th>
          <th scope="col">Total Rooms</th>
          <th scope="col">Available Rooms</th>
        </tr>
      </thead>
      <tbody>
        {buildings?.map((building) => (
          <BuildingRow 
            key={building.id}
            building={building}     
          />
        ))}
      </tbody>
    </table>
  );
};

export default BuildingTable;
