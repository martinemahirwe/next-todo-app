"use client";
import { FC } from "react";
import { FaTwitter, FaGoogle } from "react-icons/fa";

const LoginPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 p-4">
      <div className="bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Your To-Do List</h1>
        <p className="text-lg text-center mb-8 text-gray-700">Please login to create and manage your tasks</p>
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            <FaTwitter className="mr-2" />
            Login with Twitter
          </button>
          <button className="flex items-center justify-center w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-300">
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
