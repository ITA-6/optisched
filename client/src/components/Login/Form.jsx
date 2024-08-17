import pncHeader from "../../assets/pnc-header.png";
import optischedLogo from "../../assets/optisched-logo.png";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { useState } from "react";

const Form = () => {
  const [isHide, setIsHide] = useState(false);

  const showPassword = () => setIsHide(!isHide);

  return (
    <div className="w-[25em] bg-white">
      <div className="mt-28 flex justify-center">
        <img
          src={pncHeader}
          alt="PNC Header"
          className="h-[3.3125em] w-[18.625em]"
        />
      </div>
      <div className="mt-2 flex justify-center">
        <img
          src={optischedLogo}
          alt="Optisched Logo"
          className="h-[5.375em] w-[13.8125em]"
        />
      </div>
      <h3 className="mt-2 text-center font-noto text-sm font-normal leading-4 tracking-widest">
        Class Scheduling System
      </h3>

      <div className="mx-auto w-[15.625em]">
        <div className="mt-8 flex justify-center bg-light-green/35 py-1">
          <span className="font-inter tracking-widest">Login</span>
        </div>
        <p className="mt-1 font-inter text-xs text-red-500">
          This website you are trying to access is for authorized personnel
          only!
        </p>
      </div>

      <form action="" className="mx-auto mt-6 flex w-[15.625em] flex-col gap-4">
        <input
          type="text"
          placeholder="Username..."
          required
          className="h-[2.6875em] w-[15.0625em] rounded-lg border-2 border-solid border-black/70 px-2 py-4 font-inter"
        />
        <div className="relative">
          <input
            type={isHide ? "text" : "password"}
            placeholder="Password..."
            required
            className="h-[2.6875em] w-[15.0625em] rounded-lg border-2 border-solid border-black/70 px-2 py-4 pr-12 font-inter"
          />
          <img
            src={isHide ? show : hide}
            alt="Show Password"
            onClick={showPassword}
            className="absolute right-5 top-2 w-8 cursor-pointer"
          />
        </div>
        <button className="mx-auto w-[8.3125em] rounded-3xl bg-green py-2 font-inter uppercase tracking-widest text-white-grayish">
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
