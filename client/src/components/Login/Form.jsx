import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { login } from "../../api";
import pncHeader from "../../assets/pnc-header.png";
import optischedLogo from "../../assets/optisched-logo.png";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";

const navigateUserUrl = (token) => {
  const { user_type } = jwtDecode(token);

  switch (user_type) {
    case "R":
      return "admin/dashboard";
    case "DC":
    case "D":
      return "sub-admin";
    case "P":
      return "user";
    default:
      return "unauthorized";
  }
};

const Form = () => {
  const [isHide, setIsHide] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate(navigateUserUrl(token));
    }
  }, [navigate]);

  const showPassword = () => setIsHide(!isHide);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login.post("account/login/", {
        username,
        password,
      });

      // Store the tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setSuccess(response.data.success);
      setError("");
      navigate(navigateUserUrl(response.data.access));
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
      setSuccess("");
    }
  };

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
        <p className="mt-1 font-inter text-xs text-red-500" hidden>
          This website you are trying to access is for authorized personnel
          only!
        </p>
        {error && (
          <p className="mt-1 font-inter text-md text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 mt-1 font-inter text-xs text-center">{success}</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-[15.625em] flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-[2.6875em] w-[15.0625em] rounded-lg border-2 border-solid border-black/70 px-2 py-4 font-inter"
        />
        <div className="relative">
          <input
            type={isHide ? "text" : "password"}
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button
          type="submit"
          className="mx-auto w-[8.3125em] rounded-3xl bg-green py-2 font-inter uppercase tracking-widest text-white-grayish"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
