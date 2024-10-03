import { useState } from "react";
import user from "../../../assets/user.png";
import add from "../../../assets/add.png";
import UserSearchField from "./Files/UserSearchField";
import UserTable from "./Files/UserTable";
import UserForm from "./Files/UserForm";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[20rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_6fr_6fr] grid-areas-user-layout">
        <UserSearchField />
        <div className="mr-5 grid grid-areas-user-table-layout grid-in-userTable">
         
          <UserTable /> 
        </div>
        {/* add User Table */}
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-40 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white"
            onClick={openModal}
          >
            <img src={add} alt="" className="h-[20px] w-[20px]" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <UserForm closeModal={closeModal} />}
    </div>
  );
};

export default User;
