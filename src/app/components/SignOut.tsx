'use client';
import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  return (
    <Button
      className="px-4 py-2 font-semibold text-white bg-red-400 rounded shadow hover:bg-red-600 transition duration-300"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
};

export default SignOut;
