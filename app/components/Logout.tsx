"use client"
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <div>
      <button
        className="btn mt-4"
        onClick={async () => {
          await signOut({ callbackUrl: "/login" });
        }}
      >Sign out</button>
    </div>
  );
};

export default Logout;
