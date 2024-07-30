import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/db/drizzle';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
  adapter: DrizzleAdapter(db),
});
