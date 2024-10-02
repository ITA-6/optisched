import SectionRow from "./SectionRow"

const SectionTable = ({sections}) => {

   // Define the number of columns you want to display
   const totalColumns = Math.max(sections.length, 10); // Ensures at least 10 columns

   // Create rows with the data or empty cells if necessary
   const rows = [];
   for (let i = 0; i < Math.ceil(sections.length / totalColumns); i++) {
     rows.push(sections.slice(i * totalColumns, i * totalColumns + totalColumns));
   }

  return (
    <table className="w-full table-fixed bg-gray-200 text-center grid-in-table">
        <thead className="bg-green text-white text-xs">
            <tr className="h-[30px]">
            <th scope="col">Label</th>
            <th scope="col">Year Level</th>
            <th scope="col">Adviser</th>
            </tr>
        </thead>
        <tbody className="mb-10 h-full overflow-auto">
           {sections?.map(section =>(
                <SectionRow
                    key={section.id}
                    section={section}
                />
           ))}
        </tbody>
    </table>
  )
}
export default SectionTable