import React from 'react'

const UserSearchField = () => {
  return (
    <div className="grid h-full items-center xm:grid-cols-[0fr_1fr_0fr] mb-10 sm:grid-cols-[0fr_1fr_1fr] mr-8 ml-4 md:grid-cols-[4fr_2fr_2fr] xl:grid-cols-[8fr_2fr_2fr] gap-5 grid-areas-user-filter grid-in-searchList">
        <input
            type="text"
            placeholder="search"
            className="rounded-md border  grid-in-search xm:pl-8 p-1 w-full sm:pl-7 xl:pl-7"
        />
        <div className="text-center grid-in-list xm:hidden">
            <select className="w-full border rounded-md border-gray-200">
            <option value="">List: All users</option>
            <option value="option3">VPAA</option>
            <option value="option1">Registrar</option>
            <option value="option2">Dean</option>
            <option value="option3">Department Chair</option>
            <option value="option3">Professor</option>
            </select>
        </div>
    </div>
  )
}

export default UserSearchField