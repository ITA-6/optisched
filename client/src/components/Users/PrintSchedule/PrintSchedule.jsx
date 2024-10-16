import React from 'react';
import pncHeader from "../../../assets/pncHeader.png";

const PrintSchedule = () => {
  return (
    <div id="contentToPrint" className='flex  flex-col justify-center'>
      <div className="flex flex-col items-center mt-5">
        <p className='text-sm'>Republic of the Philippines</p>
        <img src={pncHeader} alt="PNC Header" className='w-[28rem]'/>
        <p className='font-bold text-base'>Academic Affairs Dvision</p>
        <p className='font-bold text-base' >Office of the University Registrar</p>
        <p className='text-xs'>Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025</p>
      </div>
      
      <div class="flex flex-col justify-center items-center mt-5">
          <p class="text-lg font-bold">SCHEDULE FORM</p>
          <p class="text-sm">First Semester, Academic Year 2024-2025</p>
      </div>
    </div>
  );
};

export default PrintSchedule;
