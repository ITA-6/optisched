import BuildingRow from "./BuildingRow";

const BuildingTable = ({ buildings, DeleteBuilding, openUpdate}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
      <thead className="bg-green">
        <tr className="h-[30px]">
          <th scope="col">Building Name</th>
          <th scope="col">Total Rooms</th>
          <th scope="col">Available Rooms</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {buildings?.map((building) => (
          <BuildingRow 
            key={building.id}
            building={building}
            DeleteBuilding={DeleteBuilding}
            openUpdate={openUpdate}          
          />
        ))}
      </tbody>
    </table>
  );
};

export default BuildingTable;
