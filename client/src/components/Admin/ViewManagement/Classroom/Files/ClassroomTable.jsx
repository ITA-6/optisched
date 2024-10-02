import ClassroomRow from "./ClassroomRow";

const ClassroomTable = ({classrooms}) => {
    return (
        <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
            <thead className="bg-green text-white text-xs">
              <tr className="h-[30px]">
                <th scope="col">Building Name</th>
                <th scope="col">Room Number</th>
                <th scope="col">Floor Number</th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
              {classrooms?.map((classroom) => (
                <ClassroomRow 
                    key ={classroom.id}
                    classroom = {classroom}
                />
              ))}
            </tbody>
        </table>
    )
}

export default ClassroomTable;