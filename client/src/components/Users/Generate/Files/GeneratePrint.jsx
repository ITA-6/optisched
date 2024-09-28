import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import { useNavigate} from "react-router-dom"

const GeneratePrint = () => {

  const navigate = useNavigate()

  const printPage = () => {
    navigate("/print")
  }
  return (
   <div className="grid grid-in-interaction grid-areas-generateInteraction mx-5">
      <div className="flex items-center justify-start gap-5 grid-in-generatedText">
          <h1 className="text-2xl font-medium">Generated Schedule</h1>
      </div>
      <div className="flex items-center justify-end pr-5 grid-in-printBtn">
          <FontAwesomeIcon 
          icon={faPrint}
          size="2xl" 
          onClick={() => printPage()}
          />
      </div>
   </div>
  )
}

export default GeneratePrint