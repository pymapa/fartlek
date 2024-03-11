import React from "react";
import Profile from "../dashboard/Profile";
import Logout from "../dashboard/Logout";
import NavLinks from "../dashboard/NavLinks";

const Sidebar = () => {
  return (
    <div
      className="
      hidden
      md:flex
      justify-center 
      items-center 
      flex-row 
      flex-wrap 
      invisible 
      md:visible 
      w-1/4 
      bg-gradient-to-br 
      from-accent-content 
      to-accent"
    >
      <Profile />
      <NavLinks />
      <Logout />
    </div>
  );
};

export default Sidebar;
