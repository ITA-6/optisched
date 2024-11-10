const ClassroomRow = ({ filteredClassrooms}) => {
  return (
    <>
      <tr key={filteredClassrooms} className="h-16">
        <td className="border-y-2 border-gray-200">
          {filteredClassrooms.building_name}
        </td>
        <td className="border-y-2 border-gray-200">{filteredClassrooms.number}</td>
        <td className="border-y-2 border-gray-200">{filteredClassrooms.floor}</td>
      </tr>
    </>
  );
};

export default ClassroomRow;
