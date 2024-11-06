

const SearchField = ({getAllFloor, setFiltered}) => {
    return(
      <div className="grid sm:grid-cols-[0fr_0fr_0.5fr] sm:justify-end sm:mr-4 md:grid-cols-[3fr_2fr_2fr]  lg:grid-cols-[8fr_2fr_2fr] h-full items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList ">
        <input
          type="text"
          placeholder="search"
            className="sm:hidden md:inline rounded-md border pl-7 grid-in-search"
        />
        <div className="text-center grid-in-list">
          <select className="w-full rounded-md border"
            onChange={(e) => setFiltered(e.target.value)}
          >
            <option value="">List: All users</option>
            { getAllFloor.map(floor => (
              <option value={floor}>{floor}</option>
            ))}
          </select>
        </div>
      </div>
    )
}

export default SearchField;