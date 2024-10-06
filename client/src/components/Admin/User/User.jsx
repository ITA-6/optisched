import { useState } from "react";
import user from "../../../assets/user.png";
import add from "../../../assets/add.png";
import UserSearchField from "./Files/UserSearchField";
import UserTable from "./Files/UserTable";
import UserForm from "./Files/UserForm";

const User = () => {
  const data = [
    { id: 1, name: "John Doe", gender: "Male", email: "johndoe2922@gmail.com", phone: "21312323213", department: "CCS", role: "Dean", status: "Active" },
    { id: 2, name: "Jane Smith", gender: "Female", email: "janesmith1234@gmail.com", phone: "31231231231", department: "BSeD", role: "Professor", status: "Inactive" },
    { id: 3, name: "Michael Johnson", gender: "Male", email: "michaeljohnson5678@gmail.com", phone: "42342342342", department: "CoE", role: "Registrar", status: "Active" },
    { id: 4, name: "Emily Davis", gender: "Female", email: "emilydavis9012@gmail.com", phone: "53453453453", department: "BSBA", role: "Department Chair", status: "Inactive" },
    { id: 5, name: "Daniel Brown", gender: "Male", email: "danielbrown3456@gmail.com", phone: "64564564564", department: "CCS", role: "Dean", status: "Active" },
    ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [initialData, setInitialData] = useState(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[20rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_6fr_6fr] grid-areas-user-layout">
        <UserSearchField />
        <div className="mr-5 grid grid-areas-user-table-layout grid-in-userTable">
          <UserTable data={data} toggleModal={toggleModal} />
        </div>
        {/* add User Table */}
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-40 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && 
      <UserForm 
      toggleModal={toggleModal}
      />}
    </div>
  );
};

export default User;
