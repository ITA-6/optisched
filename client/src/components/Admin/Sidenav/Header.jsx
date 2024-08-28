import React from 'react';
import User from "../../../assets/user.png";

const Header = ({ pageName }) => {
    return (
        <div className="flex absolute w-screen items-center justify-between bg-green z-1">
            <h1 className="m-4 ml-[11.5em] text-2xl font-bold text-white">
                {pageName}
            </h1>
            <img src={User} className="m-4 h-8 w-8" alt="User" />
        </div>
    );
};

export default Header;