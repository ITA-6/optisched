const ClassroomRow = ({toggleDialog, classroom, openUpdate}) => {
    const hasData = classroom.building && classroom.number;  // 
    return(
        <>
            <tr key={classroom.id} className="h-16">
                <td className="border border-gray-100">{classroom.building}</td>
                <td className="border border-gray-100">{classroom.number}</td>
                <td className="border border-gray-100"> {classroom.floor}</td>
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
                             onClick={() =>toggleDialog(classroom.id)}
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
    )
}

export default ClassroomRow;