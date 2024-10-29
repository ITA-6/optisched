import React from 'react'

const PrintModal = ({togglePrintModal}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col w-1/4  bg-white shadow-lg">
            <div className=" text-center m-5">
                <p>Are you sure you want to print this schedule?</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-10 mb-5">
                <button 
                    className="bg-green py-1 px-10 rounded-md text-white font-bold text-base"
                >
                    Print
                </button>
                <button 
                    className="bg-red-500 text-white font-bold text-base py-1 px-7"
                    onClick={togglePrintModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default PrintModal