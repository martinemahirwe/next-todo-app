import { auth, signIn, signOut } from '../../../auth';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface SignInProps {
  provider: string;
  buttonText: string;
  buttonClass?: string;
  icon?: ReactNode;
}

export async function SignIn({
  provider,
  buttonText,
  buttonClass,
  icon,
}: SignInProps) {
  const session = await auth();

  return (
    <form
      action={async () => {
        'use server';
        if (session) {
          await signOut({ redirectTo: '/' });
        } else {
          await signIn(provider, { redirectTo: '/todos' });
        }
      }}
    >
      <Button type="submit" className={buttonClass}>
        {buttonText}
        {icon}
      </Button>
    </form>
  );
}
