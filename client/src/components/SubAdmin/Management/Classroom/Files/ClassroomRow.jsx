const ClassroomRow = ({ toggleDialog, filteredClassrooms, openUpdate }) => {
  const hasData = filteredClassrooms.building && filteredClassrooms.number; //
  return (
    <>
      <tr key={filteredClassrooms.id} className="h-16">
        <td className="border border-gray-100">{filteredClassrooms.building_name}</td>
        <td className="border border-gray-100">TBA</td>
        <td className="border border-gray-100">TBA</td>
        <td className="border border-gray-100">{filteredClassrooms.number}</td>
        <td className="border border-gray-100"> {filteredClassrooms.floor}</td>
        <td className="border border-gray-100">
          {hasData && (
            <div className="flex items-center justify-center">
              <div className="ml-5 flex gap-2">
                <button
                  className="-h5 w-16 bg-green text-white"
                  onClick={() => openUpdate(classroom)}
                >
                  {" "}
                  Edit
                </button>
                <button
                  className="-h5 w-16 bg-red-500 text-white"
                  onClick={() => toggleDialog(classroom.id)}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ClassroomRow;
