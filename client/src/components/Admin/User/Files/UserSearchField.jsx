import React from 'react'

const UserSearchField = ({setFiltered}) => {
  return (
    <div className="grid sm:grid-cols-[0fr_0fr_0.5fr] sm:justify-end sm:mr-8 md:grid-cols-[3fr_2fr_2fr]  h-full lg:grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList ">
        <input
            type="text"
            placeholder="search"
            className="sm:hidden md:inline rounded-md border pl-7 grid-in-search"
        />
        <div className="text-center grid-in-list xm:hidden sm:text-xs md:text-sm">
            <select 
              className="w-full border rounded-md border-gray-200 sm:p-1"
              onChange={(e) => setFiltered(e.target.value)}
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