import React from 'react'

const DashboardSearchField = () => {
  return (
    <div className="grid grid-cols-[5fr_0.5fr_1fr] items-center grid-areas-text-user grid-in-text">
        <p className="mt-5 text-xl grid-in-userText">User Login History</p>
        <div className="grid-in-search mt-5">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="rounded-md border pl-7"
            />
        </div>
        <div className="ml-7 text-center grid-in-list mt-5">
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