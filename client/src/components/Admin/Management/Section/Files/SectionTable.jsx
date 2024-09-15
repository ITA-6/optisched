import SectionRow from "./SectionRow"

const SectionTable = ({toggleDialog, sections, openUpdate}) => {
  return (
    <table className="w-full table-fixed bg-white text-center grid-in-table">
        <thead className="bg-green">
            <tr className="h-[30px]">
            <th scope="col">Label</th>
            <th scope="col">Year Level</th>
            <th scope="col">Adviser</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto">
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