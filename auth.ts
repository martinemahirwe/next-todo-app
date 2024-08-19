import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from './src/db/drizzle';
import { getCurrentUser } from './src/actions/todoActions';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const userRole = await getCurrentUser(user.id as string);

        if (userRole && userRole.length > 0) {
          token.role = userRole[0].role;
        }

        token.id = user.id;
      }
      return token;
    },
  },
});
