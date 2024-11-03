import { useState, useEffect } from "react";
import user from "../../../assets/user.png";
import add from "../../../assets/add.png";
import UserSearchField from "./Files/UserSearchField";
import UserTable from "./Files/UserTable";
import UserForm from "./Files/UserForm";
import loadingVideo from "../../../assets/loadingVideo.mp4";
import { useSidebar } from "../../Users/Sidenav/SidenavContext/SidenavContext";
import api from "../../../api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [selectedUser, setSelectedUser] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {isSidebarOpen} = useSidebar();
  const toggleDialog = (id) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedUser(id);
  };

  const DeleteUser= async (id) => {
    try {
      await api.delete(`account/users/${id}`);
      const response = await api.get("account/users/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleDialog(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("account/users/");
        const department = await api.get("departments/");
        setUsers(response.data);
        setDepartments(department.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Add a delay of 3 seconds after data is fetched before hiding loading screen
        setTimeout(() => setLoading(false), 3000);
      }
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
      await api.put(`account/users/${user.professor_id}/`, user);
      const response = await api("account/users/");
      setUsers(response.data);
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

  if (loading) {
    // Render the loading video while data is being fetched and during the delay
    return (
      <div className="flex h-screen items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="h-[50vh] sm:w-[80vw]"
        >
          <source src={loadingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
 
  return (
    <div className="h-screen m-w-screen bg-white">
      <div className={`w-full grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_9fr_3fr] grid-areas-user-layout`}>
        <UserSearchField />
        <div className={`grid grid-areas-user-table-layout grid-in-userTable overflow-y-auto xm:mx-4 sm:mx-8 xl:mr-5  ${isSidebarOpen ? "lg:ml-[18rem]" : "lg:ml-24"} ease-out duration-300`}>
          <UserTable
            users={users}
            openUpdate={openUpdate}
            toggleModal={toggleModal}
            DeleteUser={DeleteUser}
          />
        </div>
       
        <div className="mt-5 flex items-start justify-end grid-in-button">
          <button
            className="mr-5 flex h-14 w-40 items-center justify-center space-x-2 rounded-3xl bg-light-green text-white sm:w-36 "
            onClick={toggleModal}
          >
            <img src={add} alt="" className="h-[1.2rem] w-[1.2rem] sm:h-[1rem]" />
            <span className="sm:text-sm">Add New User</span>
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
                onClick={() => DeleteUser(selectedUser)}
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

export default User;
