const ProgramRow = ({DeleteProgram, program, openUpdate}) => {
  return (
    <tr>
    <td>{program.name}</td>
    <td>{program.department_name}</td>
    <td>
      <div className="flex items-center justify-center">
        <div className="ml-5 flex gap-2">
          <button
            className="h-7 w-20 bg-green text-white"
            onClick={() => openUpdate(program)}
          >
            Edit
          </button>
          <button
            className="h-7 w-20 bg-red-500 text-white"
            onClick={() => DeleteProgram(program.name)}
          >
            Delete
          </button>
        </div>
      </div>
    </td>
  </tr>
  )
}
export default ProgramRow