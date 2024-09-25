const SectionRow = ({section}) => {
  return (
    <tr key={section.id} className="h-[30px]">
        <td>{section.label}</td>
        <td>{section.year_level}</td>
        <td>{section.adviser}</td>
    </tr>
  )
}
export default SectionRow