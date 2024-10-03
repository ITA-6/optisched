import add from "../../../../assets/add.png";
import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import SectionTable from "./Files/SectionTable";
import SectionForm from "./Files/SectionForm";

import api from "../../../../api";

const Section = () => {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const totalRows = (sections.length < 10) ? 10 : sections.length;

  const [SelectedSection, setSelectedSection] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedSection(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("sections/");
      setSections(response.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const submitSection = async (section) => {
    try {
      await api.post("sections/", section);
      const response = await api("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateSections = async (section) => {
    try {
      await api.put(`sections/${section.id}/`, section);
      const response = await api("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const DeleteSection = async (id) => {
    try {
      await api.delete(`sections/${id}`);
      const response = await api("sections/");
      setSections(response.data);
    } catch (error) {
      console.error(error);
    }

    toggleDialog();
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout">
        <SearchField />
        <div className={`mr-5 h-full grid-in-userTable ${(sections.length > 10) ? "overflow-y-scroll" : "overflow-hidden"} relative`}>
          <SectionTable
            toggleDialog={toggleDialog}
            sections={sections}
            openUpdate={openUpdate}
            totalRows={totalRows}
          />
        </div>
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            onClick={toggleModal}
            className="mr-5 flex h-14 w-52 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
            <span>Add New Section</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <SectionForm
          toggleModal={toggleModal}
          handler={initialData ? UpdateSections : submitSection}
          initialData={initialData}
        />
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[10rem] w-[20rem] flex-col items-center justify-center rounded-md bg-white">
            <div className="flex w-full justify-end">
              <button
                className="mr-5 rounded-xl bg-red-500 px-2 pb-0.5 text-center text-white"
                onClick={() => toggleDialog()}
              >
                x
              </button>
            </div>
            <div className="text-md mb-3 flex h-1/3 items-center px-10 text-center font-medium">
              <h1>Are you sure? you want to delete this item?</h1>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-green px-10 py-2 text-center text-white"
                onClick={() => DeleteSection(SelectedSection)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 px-10 py-2 text-white"
                onClick={() => toggleDialog()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Section;
