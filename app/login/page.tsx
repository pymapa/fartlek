import React from "react";
import LoginWithStrava from "./LoginWithStrava";

const Login = () => {
  return (
    <div className="flex w-screen h-screen flex-wrap md:flex-nowrap">
      <Sidebar />
      <LoginForm />
    </div>
  );
};

const LoginForm = () => {
  return (
    <div className="w-screen md:w-4/6">
      <div className="hero h-16 min-h-full md:min-h-screen">
        <div className="hero-content w-full text-center flex flex-col flex-">
          <h1
            className="text-3xl
            text-accent"
          >
            Sign in
          </h1>
          <LoginWithStrava />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-screen md:w-2/6 p-4 bg-gradient-to-br from-accent-content to-accent">
      <div className="hero h-10 min-h-full md:min-h-screen">
        <div className="hero-content text-center">
          <div className="max-wd-md">
            <h1 className="text-5xl text-base-100">Welcome to Fartlek!</h1>
            <p className="py-6 text-base-300">
              Do what you want with your activity data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
