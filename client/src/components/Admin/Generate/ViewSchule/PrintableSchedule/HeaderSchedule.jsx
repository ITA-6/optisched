import React from 'react'
import pncHeader from "../../../../../assets/pnc-header.png"
const HeaderSchedule = () => {
    const pncHeaderBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // the full Base64 string
  return (
    <>
        <div className="flex flex-col items-center">
                <p className="text-sm">Republic of the Philippines</p>
                <img src={pncHeaderBase64} alt="PNC Header" style={{width:'23rem'}} />
                <p className="font-bold text-sm">Academic Affairs Division</p>
                <p className="font-bold text-sm" >Office of the University Registrar</p>
                <p className="text-xs">Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025</p>
        </div>

        <div className="flex flex-col justify-center items-center mt-5 mb-[22px]">
                <p className="text-base font-bold">SCHEDULE FORM</p>
                <p className="text-sm">First Semester, Academic Year 2024-2025</p>
        </div>
    </>
  )
}

export default HeaderSchedule