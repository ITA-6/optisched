import ClassroomRow from "./ClassroomRow";

const ClassroomTable = ({classrooms, totalRows}) => {

  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return classrooms[index] || { number: '', floor: '', building: '' };
  });

  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
        <tr className="h-[30px]">
          <th scope="col">Building Name</th>
          <th scope="col">Room Number</th>
          <th scope="col">Floor Number</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {rowsToDisplay?.map((classroom, index) => (
          <ClassroomRow 
              key ={index}
              classroom = {classroom}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ClassroomTable;