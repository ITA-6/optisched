const SearchField = ({setFiltered, getAllCourseType}) => {
  return (
    <div className="grid h-full grid-cols-[8fr_2fr_2fr] items-center justify-center gap-5 grid-areas-user-filter grid-in-searchList">
      <input
        type="text"
        placeholder="search"
        className="rounded-md border pl-7 grid-in-search"
      />
      <div className="text-center grid-in-list">
        <select 
          className="w-full rounded-md border text-sm"
          onChange={(e) => setFiltered(e.target.value)}
        >
          <option value="">List: Course</option>
          {getAllCourseType.map(type => (
            <option value={type}>{type}</option>
           
          ))}
        </select>
      </div>
    </div>
  );
};
export default SearchField;
