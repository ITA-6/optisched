import react from "react";

const PasswordChange = () => {
  return (
    <div className="min-h-screen w-screen font-noto flex justify-center">
      <div className="w-[20em] flex  flex-col mt-24">
          <p className="text-xl font-bold mb-10 text-center">Change Password</p>
          <div className="flex flex-col">
            <div className="flex flex-col  gap-y-3 mb-2">
              <label htmlFor="current_password">
                <span className="text-red-500">
                    *
                </span>
                  Current Password
              </label>
              <input type="text" className="border rounded-md bg-gray-100" />
            </div>
            <div className="flex flex-col  gap-y-3 mb-3">
              <label htmlFor="current_password">
                <span className="text-red-500 ">
                    *
                </span>
                  Password
              </label>
              <input type="text" className="border rounded-md bg-gray-100" />
            </div>
            <div className="flex flex-col gap-y-3">
              <label htmlFor="current_password">
                <span className="text-red-500">
                    *
                </span>
                  Confirm Password
              </label>
              <input type="text" className="border rounded-md bg-gray-100" />
            </div>
            <div className="flex justify-end mt-10">
              <button className="bg-green text-white px-5 py-1 rounded-md">Confirm</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PasswordChange;
