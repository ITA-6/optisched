

const BuildingRow = ({ building}) => {

 
  return(
      <tr>
      <td>{building.name}</td>
      <td>{building.total_rooms}</td>
      <td>{building.available_rooms}</td>
    </tr>
  )
};

export default BuildingRow;
