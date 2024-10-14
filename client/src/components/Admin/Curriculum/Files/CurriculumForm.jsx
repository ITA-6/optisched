const CurriculumForm = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-3/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-center bg-green">
          <img src="" alt="" className="m-3 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold">
            "Create New Curriculum"
          </h2>
        </div>

        <form action="">
          <div className="flex flex-col">
            <label htmlFor="code">code</label>
            <input type="text" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input type="text" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lec">Lecture</label>
            <input type="number" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lab">Laboratory</label>
            <input type="number" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="total">Total</label>
            <input type="number" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pre">Prequisite</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurriculumForm;
