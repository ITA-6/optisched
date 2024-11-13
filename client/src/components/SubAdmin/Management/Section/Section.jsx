import add from "../../../../assets/add.png";
import { useEffect, useState } from "react";
import SearchField from "./Files/SearchField";
import SectionTable from "./Files/SectionTable";
import SectionForm from "./Files/SectionForm";
import { useSidebar } from "../../../Users/Sidenav/SidenavContext/SidenavContext";
import api from "../../../../api";

const Section = () => {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { isSidebarOpen } = useSidebar();

  const [selectedSection, setSelectedSection] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(''); // New state for the select option
  const [searchItem, setSearchItem] = useState('');
  const [filteredSections, setFilteredSections] = useState(sections);


  const getAllSection = [
    ...new Set(sections.map((section) => section.label)),
  ];
  
  
  useEffect(() => {
      setFilteredSections(sections);
  }, [sections]);

  const handleInputChange = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setSearchItem(searchTerm);
      filterSections(searchTerm, selectedStatus);
  };

  const handleStatusChange = (e) => {
      const status = e.target.value;
      setSelectedStatus(status);
      filterSections(searchItem, status);
  };

  const filterSections = (searchTerm, status) => {
      const filteredItems = sections.filter((section) => {
          // Check if the section's label matches the selected status, if any
          const matchesStatus = status ? section.label === status : true;
          
          // Check if any of the specific fields match the search term
          const matchesSearchTerm = 
              (section.label && section.label.toLowerCase().startsWith(searchTerm)) ||
              (section.year_level && section.year_level.toString().startsWith(searchTerm)) ||
              (section.department_name && section.department_name.toLowerCase().startsWith(searchTerm)) ||
              (section.program_name && section.program_name.toLowerCase().startsWith(searchTerm));

          // Return true if both conditions match
          return matchesStatus && matchesSearchTerm;
      });

      setFilteredSections(filteredItems);
  };

  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedSection(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("sections/");
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setInitialData(null);
      setErrors({});
      setErrorMessage("");
    }
  };

  const submitSection = async (section) => {
    try {
      await api.post("sections/", section);
      const response = await api.get("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Log the error response to see the specific validation issues
        console.error("Validation error:", error.response.data);
        setErrorMessage(error.response.data);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const updateSection = async (section) => {
    try {
      await api.put(`sections/${section.id}/`, section);
      const response = await api.get("sections/");
      setSections(response.data);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        setErrors(errorData);

        if (errorData.label) {
          setErrorMessage(`Label error: ${errorData.label.join(", ")}`);
        } else if (errorData.year_level) {
          setErrorMessage(
            `Year Level error: ${errorData.year_level.join(", ")}`,
          );
        } else {
          setErrorMessage("Invalid input. Please check your data.");
        }
      } else {
        setErrorMessage("An error occurred while updating the section.");
      }

      // Clear the error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const deleteSection = async (id) => {
    try {
      await api.delete(`sections/${id}`);
      const response = await api.get("sections/");
      setSections(response.data);
    } catch (error) {
      console.error("Error deleting section:", error);
    }

    toggleDialog();
  };

  return (
    <div className="h-screen w-screen bg-white">
      <div
        className={`mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[0.5fr_0.5fr_5fr_1fr] grid-areas-user-layout ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-32"} duration-200 ease-linear`}
      >
        <SearchField getAllSection={getAllSection}  handleInputChange={handleInputChange} handleStatusChange={handleStatusChange} />
        <div
          className={`mr-5 h-full grid-in-userTable sm:ml-10 sm:mr-3 lg:ml-0 ${sections.length > 10 ? "overflow-y-scroll" : "overflow-hidden"} relative`}
        >
          <SectionTable
            toggleDialog={toggleDialog}
            filteredSections={filteredSections}
            openUpdate={openUpdate}
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
          handler={initialData ? updateSection : submitSection}
          initialData={initialData}
          errors={errors}
          errorMessage={errorMessage}
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
                onClick={() => deleteSection(selectedSection)}
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
