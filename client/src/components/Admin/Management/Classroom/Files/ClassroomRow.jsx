const ClassroomRow = ({DeleteClassroom, classroom, openUpdate}) => {
    return(
        <>
            <tr key={classroom.id} className="h-[30px]">
                <td>{classroom.building}</td>
                <td>{classroom.number}</td>
                <td>{classroom.floor}</td>
                <td>
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
                        onClick={() =>DeleteClassroom(classroom.id)}
                    >
                        {" "}
                        Delete
                    </button>
                    </div>
                </div>
                </td>
            </tr>
        </>
    )
}

export default ClassroomRow;