import React from 'react'

const UserSearchField = ({handleInputChange, handleStatusChange}) => {
  return (
    <div className="grid xm:grid-cols-[1fr_1fr_2fr]  xm:justify-end sm:grid-cols-[1fr_1fr_1fr] sm:justify-end sm:mr-8 md:grid-cols-[3fr_2fr_2fr]  h-full lg:grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList ">
        <input
            type="text"
            placeholder="search"
            onChange={handleInputChange}
            className="grid-in-search xm:hidden sm:hidden md:flex sm:text-xs md:text-sm border border-gray-300 p-1 pl-6 rounded-md"
        />
        <div className="xm:block sm:block rounded-md border grid-in-list xm:mr-4">
            <select 
              className="w-full border rounded-md border-gray-200 sm:p-1"
              onChange={handleStatusChange}
            >
            <option value="">List: All users</option>
            <option value="VPAA">VPAA</option>
            <option value="R">Registrar</option>
            <option value="D">Dean</option>
            <option value="DC">Department Chair</option>
            <option value="P">Professor</option>
            </select>
        </div>
    </div>
  )
}

export default UserSearchField