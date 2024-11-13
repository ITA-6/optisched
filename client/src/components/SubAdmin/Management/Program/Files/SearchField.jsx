const SearchField = ({allDepartments, handleInputChange, handleDepartmentChange}) => {
    return (
      <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList">
        <input
          type="text"
          placeholder="search"
          onChange={handleInputChange}
          className="rounded-md border pl-7 grid-in-search"
        />
        <div className="text-center grid-in-list">
          <select className="w-full rounded-md border"
            onChange={handleDepartmentChange}
          >
            <option value="">List: All Department</option>
            {allDepartments.map(department => (
              <option value={department} className="">{department}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  export default SearchField;
  