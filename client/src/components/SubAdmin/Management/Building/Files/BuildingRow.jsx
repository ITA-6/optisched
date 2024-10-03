

const BuildingRow = ({ building, openUpdate, toggleDialog }) => {
  console.log(building)
  const hasData = building.name && building.available_rooms
 
  return(
      <tr className="h-16">
        <td className="border border-gray-100">{building.name}</td>
        <td className="border border-gray-100">{building.total_rooms}</td>
        <td className="border border-gray-100">{building.available_rooms}</td>
        <td className="border border-gray-100">
         {hasData && (
          <div className="flex items-center justify-center">
            <div className="ml-5 flex gap-2">
              <button
                className="-h5 w-16 bg-green text-white"
                onClick={() => openUpdate(building)}
              >
                Edit
              </button>
              <button
                onClick={() => toggleDialog(building.id)}
                className="-h5 w-16 bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
         )}
        </td>
    </tr>
  )
};

export default BuildingRow;
