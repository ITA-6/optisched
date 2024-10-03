import ClassroomRow from "./ClassroomRow";

const ClassroomTable = ({toggleDialog, classrooms, openUpdate, totalRows}) => {
  console.log(classrooms)
    const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
      return classrooms[index] || { building:  '', number: '', floor : '' };
    });
    return (
      <table className="w-full h-[100%] table-fixed bg-white text-center">
        <thead className="bg-green text-white text-xs border-separate border border-white sticky -top-0.5">
          <tr className="h-[30px]">
            <th scope="col" className="border border-white">Building Name</th>
            <th scope="col" className="border border-white">Room Number</th>
            <th scope="col" className="border border-white">Floor Number</th>
            <th scope="col" className="border border-white"></th>
          </tr>
        </thead>
        <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
          {rowsToDisplay?.map((classroom, index) => (
            <ClassroomRow 
                key ={index}
                toggleDialog = {toggleDialog}
                classroom = {classroom}
                openUpdate = {openUpdate}
            />
          ))}
        </tbody>
      </table>
    )
}

export default ClassroomTable;