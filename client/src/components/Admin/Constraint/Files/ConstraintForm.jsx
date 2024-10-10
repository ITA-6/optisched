import React from 'react'

const ConstraintForm = ({toggleModal}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
            <div className="flex h-1/5 items-center justify-center bg-green">
                <img src="" alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
                <h2 className="ml-2 text-3xl font-extrabold">
                    Update Constraint
                </h2>
            </div>
            <div className="">
                <form 
                action=""
                className='flex flex-col gap-2 p-5'
                >   
                     <div className="">
                        <div className="flex gap-5">
                            <div className="flex-1 flex flex-col">
                                <label 
                                htmlFor="casual"
                                className='mr-3'
                                >
                                    Casual</label>
                                <input 
                                type="number"
                                name="casual" 
                                id="casual" 
                                className='border border-gray-300 rounded-md p-1'
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label 
                                htmlFor="casual"
                                className='mr-3'
                                >
                                    Part-time</label>
                                <input 
                                type="number" 
                                name="partTime" 
                                id="partTime" 
                                className='border border-gray-300 rounded-md p-1'
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label
                                htmlFor="casual"
                                className='mr-3'
                                >
                                    Full-time</label>
                                <input 
                                type="number" 
                                name="fullTime" 
                                id="fullTime" 
                                className='border border-gray-300 rounded-md p-1'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between gap-10">
                       <div className="flex-1 flex flex-col">
                        <label 
                        htmlFor="time"
                        className='mr-2'
                        > Start Time</label>
                        <input 
                        type="time" 
                        name="timeStart" 
                        id="timeStart"
                        className='border border-gray-300 rounded-md p-1'
                          />
                       </div>
                       <div className="flex-1 flex flex-col">
                        <label 
                        htmlFor="time"
                        className='mr-2'
                        > End Time 
                        </label>
                        <input 
                        type="time" 
                        name="timeEnd"
                        id="timeEnd"
                        className='border border-gray-300 rounded-md p-1'
                         />
                       </div>
                    </div>
                    <div className="flex flex-col">
                        <label 
                        htmlFor="vacantHours"
                        className='mr-5'
                        >
                            Vacant</label>
                        <input 
                        type="number"
                        name="vacant"
                        id="vacantHours"
                        className='p-1 border border-gray-300 rounded-md'
                        />
                    </div>
                   
                    <div className="flex flex-col">
                        <label htmlFor="pairing_day">Pairing Day</label>
                        <input 
                        type="text" 
                        name="pairing_day" 
                        id="pairing_day"
                        className='border border-gray-300 p-1 rounded-md'
                         />
                    </div>
                    <div className="ml-10 mt-5 flex items-start justify-end grid-in-button">
                        <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-2xl border-2 border-black bg-green">
                            <span>Confirm</span>
                        </button>
                    </div>
                </form>
            </div>
            <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={toggleModal}
                >
                    &times;
            </button>
        </div>
    </div>

  )
}

export default ConstraintForm