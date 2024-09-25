import React from 'react'

const Constraint = () => {
  return (
    <div className="h-screen w-screen bg-white-grayish flex  font-bold">
        <div className="grid w-full ml-[17rem] mt-[5rem]">
            <div className="flex-1">
                <label 
                htmlFor="time"
                className=''
                >
                    Choose time : 
                </label>
                <select 
                    name="time" 
                    id="time"
                    className="w-[90%] ml-5 "
                    >
                    <option value="7am-9pm">7:00 - 9 : 00</option>
                    <option value="7am-9pm">7:00 - 9 : 00</option>
                    <option value="7am-9pm">7:00 - 9 : 00</option>
                </select>
            </div>
            <div className="flex-1 ">
                <label 
                htmlFor="day"
                className='w-[20%]'
                >
                    Pairing Day : 
                </label>
                <select 
                    name="day" 
                    id="day"
                    className=" w-[90%] ml-5"
                    >
                    <option value="mon-wed">Monday - Wed</option>
                    <option value="tues-thurs">Tuesday - Thursday</option>
                    <option value="mon-wed">Monday - Wed</option>
                </select>
            </div>  
            <div className="flex-1">
                <label 
                htmlFor="vacant"
                className='w-[20%]'
                >
                    Max Hours vacant : 
                </label>
                <select 
                    name="vacant" 
                    id="vacant"
                    className="w-[87%] ml-5"
                    >
                    <option value="1hours">1hours</option>
                    <option value="2hours">2hours</option>
                    <option value="3hours">3hours</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default Constraint