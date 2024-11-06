

const SearchField = () => {
    return(
      <div className="grid sm:grid-cols-[0fr_0fr_0.5fr] sm:justify-end sm:mr-4 md:grid-cols-[3fr_2fr_2fr]  lg:grid-cols-[8fr_2fr_2fr] h-full items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList ">
          <input
            type="text"
            placeholder="search"
            className="sm:hidden md:inline rounded-md border pl-7 grid-in-search"
          />
          <div className="text-center grid-in-list">
            <select className="w-full rounded-md border">
              <option value="">List: All users</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
      </div>
    )
}

export default SearchField;