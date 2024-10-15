import parameters from "../../../../assets/parameters.png"

const CurriculumForm = ({toggleCurriculumForm}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/4 rounded-lg bg-white shadow-lg">
        <div className="flex h-1/5 items-center justify-start bg-green">
          <img src={parameters}  alt="" className="m-3 mt-4 mr-4 h-[30px] w-[30px]" />
          <h2 className="ml-2 text-3xl font-extrabold text-white">
            Create New Curriculum
          </h2>
        </div>

        <form action="" className="flex flex-col gap-6 my-10 text-base mx-10">
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="College">College</label>
            <input 
              type="text"
              className="border border-gray-300 p-1 rounded-md"
             />
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="Acronym">Acronym</label>
            <input type="text" className="border border-gray-300 p-1 rounded-md" />
          </div>
          <div className="flex justify-end">
              <button type="submit" className="bg-green text-white text-base px-5 py-2 rounded-md"> Confirm </button>
          </div>
        </form>
        <button
            className="absolute right-4 top-4 rounded-full bg-red-500 px-2 pb-1 text-white"
            onClick={toggleCurriculumForm}
          >
            &times;
          </button>
      </div>
    </div>
  );
};

export default CurriculumForm;
