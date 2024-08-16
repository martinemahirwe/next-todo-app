import NextAuth from 'next-auth';
import { eq } from 'drizzle-orm';
import authConfig from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import db from '@/db/drizzle';
import { users } from '@/db/schema';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          // Fetch the user's role from the database
          const userRecord = await db
            .select({
              role: users.role,
            })
            .from(users)
            .where(eq(users.email, user.email))
            .get();

          token.role = userRecord?.role ?? 'user';
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
        } catch (error) {
          console.error('Error fetching user role:', error);
          token.role = 'user';
        }
      }
      console.log('JWT Callback - Token:', token);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      console.log('Session Callback - Token:', token);
      console.log('Session Callback - Session:', session);
      return session;
    },
  },
});
