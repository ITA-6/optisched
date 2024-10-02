import ClassroomRow from "./ClassroomRow";

const ClassroomTable = ({toggleDialog, classrooms, openUpdate}) => {
    return (
        <table className="w-full table-fixed bg-white text-center grid-in-table">
            <thead className="bg-green text-xs text-white border-separate border border-white">
              <tr className="h-[30px]">
                <th scope="col" className="border border-white">Building Name</th>
                <th scope="col" className="border border-white">Room Number</th>
                <th scope="col" className="border border-white">Floor Number</th>
                <th scope="col" className="border border-white"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto text-sm border-collapse border border-gray-100">
              {classrooms?.map((classroom) => (
                <ClassroomRow 
                    key ={classroom.id}
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