import add from "../../../../assets/add.png";
import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import SectionTable from "./Files/SectionTable";
import SectionForm from "./Files/SectionForm"

import api from "../../../../api";

const Section = () => {

    const [sections, setSections] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("sections/");
      setSections(response.data);
     
    };
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitClassroom = async (section) => {
    try {
      await api.post("sections/", section);
      const response = await api("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateSections= async (section) => {
    try {
      await api.put(`sections/${section.id}`, section);
      const response = await api("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const openUpdate = (initialData) => {
    setInitialData(initialData);
    openModal();
  }

  const DeleteClassroom = async (id) => {
    try {
      await api.delete(`sections/${id}`);
      const response = await api("sections/");
      setSections(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen w-screen bg-white-grayish">
        <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_7fr_4fr] grid-areas-user-layout">
          <div className="mr-5 grid grid-rows-[1fr_8fr] grid-areas-user-table-layout grid-in-userTable">
            <SearchField />
            <SectionTable
                DeleteClassroom ={DeleteClassroom}
                sections={sections}
                openUpdate={openUpdate}
            />
          </div>
            <div className="mt-5 flex items-start justify-end grid-in-button">
              <button
                onClick={openModal}
                className="mr-5 flex h-20 w-52 items-center justify-center space-x-2 rounded-3xl border-2 border-black bg-light-green text-black"
              >
                <img src={add} alt="" className="h-[30px] w-[30px]" />
                <span>Add New Section</span>
              </button>
          </div>
        </div>
        {isModalOpen && (
          <SectionForm 
            closeModal={closeModal}
            handler={initialData ? UpdateSections : submitClassroom}
            initialData={initialData}
          />
        )}
        
      </div>
  )
}
export default Section