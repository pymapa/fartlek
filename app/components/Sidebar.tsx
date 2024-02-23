import React from "react";
import Profile from "./Profile";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="flex justify-center items-center flex-row flex-wrap invisible md:visible w-1/4 bg-gradient-to-br from-accent-content to-accent">
      <Profile />
      <Logout />
    </div>
  );
};

export default Sidebar;
