const SearchField = ({handleInputChange, handleStatusChange}) => {
    return (
          <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList mr-5">
              <input
                type="text"
                placeholder="search"
                onChange={handleInputChange}
                className="rounded-md border pl-7 grid-in-search"
              />
              <div className="text-center grid-in-list">
                <select 
                  className="w-full rounded-md border"
                  onChange={handleStatusChange}
                >
                  <option value="">List: All users</option>
                  <option value="CASUAL">Casual</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="PERMANENT">Permanent</option>
                </select>
              </div>
          </div>
    )
  }
  export default SearchField