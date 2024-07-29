// utils/signInUtils.ts
'use server';
import { signIn } from '../../auth';


export async function handleSignIn(provider: string): Promise<void> {
  await signIn(provider);
}
