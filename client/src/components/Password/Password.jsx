import react from "react";

const PasswordChange = () => {
  return (
    <div className="h-screen w-screen justify-center bg-gray-100">
      <div className="h-full w-full bg-gray-100">
        <div className="ml-32 mt-20 flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input type="text" className="rounded-md border border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
