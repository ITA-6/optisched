import { useState, useEffect } from "react";
import user from "../../../assets/user.png";
import add from "../../../assets/add.png";
import UserSearchField from "./Files/UserSearchField";
import UserTable from "./Files/UserTable";
import UserForm from "./Files/UserForm";

import api from "../../../api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("account/users/");
      const department = await api.get("departments/");
      setUsers(response.data);
      setDepartments(department.data);
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setInitialData(null);
  };

  const openUpdate = (initialData) => {
    setInitialData(initialData);
    toggleModal();
  };

  const updateUser = async (user) => {
    try {
      await api.put(`account/users/${user.prof_id}/`, user);
      const response = await api("account/users/");
      setProfessor(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitUser = async (user) => {
    try {
      await api.post("account/users/", user);
      const response = await api("account/users/");
      setUsers(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-white">
      <div className="ml-[20rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_6fr_6fr] grid-areas-user-layout">
        <UserSearchField />
        <div className="mr-5 grid grid-areas-user-table-layout grid-in-userTable">
          <UserTable
            users={users}
            openUpdate={openUpdate}
            toggleModal={toggleModal}
          />
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
      {isModalOpen && (
        <UserForm
          users={users}
          departments={departments}
          toggleModal={toggleModal}
          handler={initialData ? updateUser : submitUser}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default User;
