import SectionRow from "./SectionRow"

const SectionTable = ({toggleDialog, sections, openUpdate}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
        <thead className="bg-green text-white text-xs">
            <tr className="h-[30px]">
            <th scope="col" className="border border-white">Label</th>
            <th scope="col" className="border border-white">Year Level</th>
            <th scope="col" className="border border-white">Adviser</th>
            <th scope="col" className="border border-white"></th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto border-collapse border border-gray-100">
           {sections?.map(section =>(
                <SectionRow
                    key={section.id}
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