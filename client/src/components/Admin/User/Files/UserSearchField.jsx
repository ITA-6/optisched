import React from 'react'

const UserSearchField = ({setFiltered}) => {
  return (
    <div className="grid h-full items-center xm:mx-0 grid-cols-[0fr_1fr_0fr] mb-10 sm:grid-cols-[0fr_1fr_1fr] mr-8 ml-4 md:grid-cols-[4fr_2fr_2fr] mt-4  xl:grid-cols-[8fr_2fr_2fr] gap-5 grid-areas-user-filter grid-in-searchList">
        <input
            type="text"
            placeholder="search"
            className="rounded-md border  grid-in-search xm:pl-4 xm:w-2/3 xm:py-[0.2rem] xm:text-xs sm:text-sm sm:w-full sm:pl-7 sm:p-1 xl:pl-7"
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