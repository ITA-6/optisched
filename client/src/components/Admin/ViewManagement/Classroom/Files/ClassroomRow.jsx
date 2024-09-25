const ClassroomRow = ({classroom}) => {
    return(
        <>
            <tr key={classroom.id} className="h-[30px]">
                <td>{classroom.building}</td>
                <td>{classroom.number}</td>
                <td>{classroom.floor}</td>
            </tr>
        </>
    )
}

export default ClassroomRow;