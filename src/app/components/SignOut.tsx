import { auth, signIn, signOut } from '../../../auth';
import { Button } from './ui/button';

export async function SignOut() {
  const session = await auth();
  return (
    <form
      action={async () => {
        'use server';
        if (session) {
          await signOut({ redirectTo: '/' });
        } else {
          await signIn('google', { redirectTo: '/todos' });
        }
      }}
    >
      <Button className="px-4 py-2 font-semibold text-white bg-red-400 rounded shadow hover:bg-red-600 transition duration-300">
        Logout
      </Button>
    </form>
  );
}
