import React from 'react'

const GeneratedTableRow = ({program, index, viewProgram}) => {
  return (
    <>
        <tr key={index} className="h-20 cursor-pointer">
            <td onClick={() => viewProgram(program.id)}>
            {program.name}
            </td>
        </tr>
    </>
  )
}

export default GeneratedTableRow