import SectionRow from "./SectionRow"

const SectionTable = ({toggleDialog, sections, openUpdate, totalRows}) => {
  const rowsToDisplay = Array.from({ length: totalRows }, (_, index) => {
    return sections[index] || { label: '', year_level: '' };
  });
  return (
    <table className="w-full h-[100%] table-fixed bg-white text-center">
      <thead className="bg-green text-white text-xs border-separate border border-white sticky top-0">
          <tr className="h-[30px]">
            <th scope="col" className="border border-white">Label</th>
            <th scope="col" className="border border-white">Year Level</th>
            <th scope="col" className="border border-white">Adviser</th>
            <th scope="col" className="border border-white"></th>
          </tr>
        </thead>
        <tbody className="mb-10 text-sm border-collapse border-y-2 border-gray-200">
          {rowsToDisplay.map((section, index) =>(
                <SectionRow
                    key={index}
                    toggleDialog={toggleDialog}
                    section={section}
                    openUpdate={openUpdate}
                />
           ))}
        </tbody>
    </table>
  )
}
export default SectionTable