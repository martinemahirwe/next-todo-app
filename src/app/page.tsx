"use client";
import { FC } from "react";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

const LoginPage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 p-4">
      <div className="bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Your To-Do List</h1>
        <p className="text-lg text-center mb-8 text-gray-700">Please login to create and manage your tasks</p>
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center w-1/2 bg-[#1DA1F2] text-white py-2 px-4 rounded shadow hover:bg-[#1A91DA] transition duration-300">
            <AiOutlineTwitter className="mr-2" />
            Login with X
          </button>
          <button className="flex items-center justify-center w-1/2 bg-yellow-100 border border-gray-300 text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-100 transition duration-300">
            <FaGoogle className="mr-2 text-[#37db5b]" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
