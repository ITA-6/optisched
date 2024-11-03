import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHoverOn, setIsHoverOn] =useState(false)

  const hoverOff= () =>{
    setIsHoverOn(false)
  }

  const hoverOn = () => {
    setIsHoverOn(true);
  }
  useEffect(() => {
    // Check the initial width and set isSidebarOpen to false if below 600px
    if (window.innerWidth < 600) {
      setIsSidebarOpen(false);
    }
  }, []); // This runs only once when the component mounts

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isHoverOn, hoverOn, hoverOff }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
