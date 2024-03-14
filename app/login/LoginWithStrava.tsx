'use client';
import Image from "next/image";
import React from "react";
import stravaIcon from "@/public/icons/strava-icon.svg";
import { signIn } from "next-auth/react";

const callbackUrl = "/dashboard";

const LoginWithStrava = () => {
  return (
    <button
      className="btn mt-4"
      onClick={() => signIn("strava", { callbackUrl })}
    >
      Continue with Strava
      <Image src={stravaIcon} alt="Strava" width={25} />
    </button>
  );
};

export default LoginWithStrava;
