const SectionRow = ({ section }) => {
  return (
    <tr key={section.id} className="h-16">
      <td className="border-y-2 border-gray-200">{section.label}</td>
      <td className="border-y-2 border-gray-200">{section.year_level}</td>
      <td className="border-y-2 border-gray-200">{section.department_name}</td>
      <td className="border-y-2 border-gray-200">{section.program_name}</td>
      <td className="border-y-2 border-gray-200">{section.adviser_name}</td>
    </tr>
  );
};
export default SectionRow;
