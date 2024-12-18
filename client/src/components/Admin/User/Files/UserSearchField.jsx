import React from 'react'

const UserSearchField = () => {
  return (
    <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList">
        <input
            type="text"
            placeholder="search"
            className="rounded-md border pl-7 grid-in-search"
        />
        <div className="text-center grid-in-list">
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