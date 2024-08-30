

const Generate = () =>{
    return(
       <div className="h-screen bg-white-grayish">
            <div className="h-full ml-[18rem] mr-[2rem]">
                <div className="grid">
                    <div className="flex mt-20 gap-x-1 font-bold text-md ">
                        <button className="bg-grayish flex-1  h-10  rounded-t-lg w-20">CCS</button>
                        <button className="bg-grayish flex-1 h-10  rounded-t-lg w-20">COE</button>
                        <button className="bg-grayish flex-1 h-10  rounded-t-lg w-20">CBAA</button>
                        <button className="bg-grayish flex-1 h-10  rounded-t-lg w-20">COED</button>
                        <button className="bg-grayish flex-1 h-10  rounded-t-lg w-20">CHAS</button>
                        <button className="bg-grayish flex-1 h-10  rounded-t-lg w-20">CAS</button>
                    </div>
                </div>
                <table class="w-full h-3/4 table-auto bg-white text-center grid-in-table">
                    <thead className="bg-green">
                    <tr class="h-[30px]">
                        <th scope="col">Professor Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Appoitment Status</th>
                    </tr>
                    </thead>
                    <tbody className="mb-10 h-full overflow-auto">
                        <tr class="h-[30px]">
                            <th scope="row">John Doe</th>
                            <td>CCS</td>
                            <td>Pending</td>
                        </tr>
                        <tr class="h-[30px]">
                            <th scope="row">Jane Smith</th>
                            <td>COE</td>
                            <td>Approved</td>
                        </tr>
                        <tr class="h-[30px]">
                            <th scope="row">Alice Johnson</th>
                            <td>CBAA</td>
                            <td>Denied</td>
                        </tr>
                        <tr class="h-[30px]">
                            <th scope="row">Bob Brown</th>
                            <td>COED</td>
                            <td>Pending</td>
                        </tr>
                        <tr class="h-[30px]">
                            <th scope="row">Charlie Davis</th>
                            <td>CHAS</td>
                            <td>Approved</td>
                        </tr>
                        <tr class="h-[30px]">
                            <th scope="row">Emily Wilson</th>
                            <td>CAS</td>
                            <td>Denied</td>
                        </tr>
                    </tbody>
                </table>
                <div className="grid justify-end items-center">
                    <p> PS : this button is just here to show the generated schedule table</p>
                    <div className="flex justify-end mr-5">
                        <button className="w-20 h-10 bg-green">Generate</button>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Generate;