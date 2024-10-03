const SearchField = () => {
  return (
        <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList mr-5">
            <input
              type="text"
              placeholder="search"
              className="rounded-md border border-gray-200 pl-7 grid-in-search"
            />
            <div className="text-center grid-in-list">
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
export default SearchField