import React from 'react'

const GeneratedTable = ({filteredPrograms, viewProgram}) => {
  return (
    <table className="h-3/4 w-full table-auto bg-white text-center">
      <thead className="bg-green-500 text-white">
        <tr className="h-12">
          <th scope="col">Program</th>
        </tr>
      </thead>
      <tbody className="mb-10 h-full overflow-auto">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program, index) => (
            <tr key={index} className="h-20 cursor-pointer">
              <td onClick={() => viewProgram(program.id)}>
                {program.name}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="p-4 text-gray-500">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default GeneratedTable