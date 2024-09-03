import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { departments } from '../data'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const Generated = () => {

  const { name } = useParams(); 
  const decodedName = decodeURIComponent(name); 
  const navigate = useNavigate();

  //find the department.name that matches the decodedName
  const departmentData = departments.find(item => item.name === decodedName); 

  if (!departmentData) {
    return <div>Data not found</div>;
  }

  const handleBackClick = () => {
    navigate('/admin/generate');
    };

  return (
        <div className="h-screen w-screen bg-white-grayish">
            <div className="ml-[18rem] mr-[2rem] pb-10 h-screen grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] grid-areas-generated-table-layout">
               <div className="grid-in-generatedText flex justify-start items-center gap-5">
                    <FontAwesomeIcon icon={faChevronLeft} size='2xl'className='cursor-pointer'  onClick={handleBackClick}/>
                    <h1 className='font-medium text-2xl'>Generated Schedule</h1>
               </div>
               <div className="grid-in-printBtn flex justify-end items-center pr-5">
                    <FontAwesomeIcon icon={faPrint} size='2xl' />
               </div>
               <div className="grid-in-table h-full bg-white px-5 pt-5 ">
                    <div className="grid grid-areas-generated-table grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-cols-[1fr-1fr]">
                        <h1 className='text-xl font-bold grid-in-profName'>Professor name : {departmentData.name}</h1>
                        <h1 className='text-xl font-bold grid-in-departmentName'>Department : {departmentData.department}</h1>
                        <h1 className='text-xl font-bold grid-in-appointmentStatus'>Appointment Status : {departmentData.appointment}</h1>

                        <div className="grid-in-table flex-1 w-full h-full">
                            <table className='w-full h-full'>
                                <thead className='bg-green' >
                                    <th>Course Code</th>
                                    <th>Course Description</th>
                                    <th>Lec Units</th>
                                    <th>Lab Units</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Units</th>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='grid-in-units flex justify-between items-center py-2'>
                            <h1 className='font-medium text-xl'>Total Units :</h1>
                            <button className="px-10 py-3 bg-green color-white rounded-lg"> Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generated;