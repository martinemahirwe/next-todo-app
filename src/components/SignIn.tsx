
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

interface SignInProps {
  provider: string;
  buttonText: string;
  buttonClass: string;
  icon: ReactNode;
}

export function SignIn({ provider, buttonText, buttonClass, icon }: SignInProps) {
  return (
    <button
      onClick={() => signIn(provider)}
      className={buttonClass}
    >
      {icon}
      {buttonText}
    </button>
  );
}
