import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const Profile = async () => {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div className="flex flex-col w-full items-center justify-center text-neutral-content">
      <div className="avatar mb-4">
        <div className="w-24 rounded-full shadow-lg shadow-slate-900">
          <Image priority width={125} height={125} src={user?.image || ""} alt="Avatar" />
        </div>
      </div>
      <p className="text-xl">{user?.name}</p>
    </div>
  );
};

export default Profile;
