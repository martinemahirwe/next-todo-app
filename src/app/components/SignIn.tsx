'use client';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface SignInProps {
  provider: string;
  buttonText: string;
  buttonClass: string;
  icon: ReactNode;
}

export function SignIn({
  provider,
  buttonText,
  buttonClass,
  icon,
}: SignInProps) {
  return (
    <Button onClick={() => signIn(provider)} className={buttonClass}>
      {icon}
      {buttonText}
    </Button>
  );
}
