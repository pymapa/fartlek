"use client"
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <div className="flex min-w-full justify-center">
      <button
        className="btn btn-wide btn-neutral-content"
        onClick={async () => {
          await signOut({ callbackUrl: "/login" });
        }}
      >Sign out</button>
    </div>
  );
};

export default Logout;
