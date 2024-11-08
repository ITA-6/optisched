const SectionRow = ({ filteredSections  }) => {
  return (
    <tr key={filteredSections.id} className="h-16">
      <td className="border-y-2 border-gray-200">{filteredSections.label}</td>
      <td className="border-y-2 border-gray-200">{filteredSections.year_level}</td>
      <td className="border-y-2 border-gray-200">{filteredSections.department_name}</td>
      <td className="border-y-2 border-gray-200">{filteredSections.program_name}</td>
    </tr>
  );
};
export default SectionRow;
