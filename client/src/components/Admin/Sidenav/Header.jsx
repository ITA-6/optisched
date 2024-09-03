import React, { useState } from 'react';
import User from "../../../assets/user.png";

const Header = ({ pageName }) => {
    const [isUserOpen, setUserOpen] = useState(false)
    const toggleUser = () => setUserOpen(!isUserOpen);
    return (
        <div className="flex  top-0 absolute w-screen items-center justify-between bg-green sm: xl:  z-1">
            <h1 className="xm:hidden sm:hidden lg:inline m-4 ml-[11.5em] xl: text-2xl font-bold text-white">
                {pageName}
            </h1>
            <button className='md:inline lg:hidden xl:hidden'>Menu bar</button>
            
            <div className='relative'>
                <button onClick={toggleUser}>
                    <img src={User} className="md:inline m-4 h-8 w-8" alt="User" />
                </button>
                <ul className={`${isUserOpen ? "absolute right-8 top-20 w-52" : "hidden"} grid justify-center items-center bg-white rounded-md `}>
                    <li><a href="">My Profile</a></li>
                    <li><a href="">Change Password</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;