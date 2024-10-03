const ClassroomRow = ({classroom}) => {
    return(
        <>
            <tr key={classroom.id} className="h-16">
                <td className="border-y-2 border-gray-200">{classroom.building}</td>
                <td className="border-y-2 border-gray-200">{classroom.number}</td>
                <td className="border-y-2 border-gray-200">{classroom.floor}</td>
            </tr>
        </>
    )
}

export default ClassroomRow;