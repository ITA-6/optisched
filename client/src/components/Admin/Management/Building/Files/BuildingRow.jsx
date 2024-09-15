

const BuildingRow = ({ building, openUpdate, toggleDialog }) => {

 
  return(
      <tr>
      <td>{building.name}</td>
      <td>{building.total_rooms}</td>
      <td>{building.available_rooms}</td>
      <td>
        <div className="flex items-center justify-center">
          <div className="ml-5 flex gap-2">
            <button
              className="h-7 w-20 bg-green text-white"
              onClick={() => openUpdate(building)}
            >
              Edit
            </button>
            <button
              onClick={() => toggleDialog(building.id)}
              className="h-7 w-20 bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
};

export default BuildingRow;
