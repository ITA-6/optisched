import React from 'react'

const DashboardSearchField = () => {
  return (
    <div className="grid sm:grid-cols-[3fr_5fr_0fr] md:grid-cols-[4fr_1.5fr_1fr]  grid-cols-[5fr_0.5fr_1fr] items-center grid-areas-text-user grid-in-text">
        <p className="mt-5 text-xl grid-in-userText xm:text-xs sm:text-sm md:text-base lg:text-lg">User Login History</p>
        <div className="flex grid-in-search mt-5 xm:hidden sm:justify-end">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className=" w-2/3 rounded-md border pl-7 xm:p-1 xm:text-xs sm:p-1 sm:pl-4 sm:text-xs md:text-sm md:p-1 md:pl-7"
            />
        </div>
        <div className="ml-7 text-center grid-in-list mt-5 xm:hidden sm:hidden md:block">
            <select className="w-full rounded-md border border-gray-200">
                <option value="">List: All users</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    </div>
  )
}

export default DashboardSearchField