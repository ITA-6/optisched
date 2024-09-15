import ClassroomRow from "./ClassroomRow";

const ClassroomTable = ({toggleDialog, classrooms, openUpdate}) => {
    return (
        <table className="w-full table-fixed bg-white text-center grid-in-table">
            <thead className="bg-green">
              <tr className="h-[30px]">
                <th scope="col">Building Name</th>
                <th scope="col">Room Number</th>
                <th scope="col">Floor Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="mb-10 h-full overflow-auto">
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