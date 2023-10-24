import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../db";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {

      if (account) {
        token.provider = account.provider;

      }
      if (profile) {
        token.firstName = profile.given_name;
        token.lastName = profile.family_name;
      }
      return token;
    },
    async session(session) {

      if (session) {
        const sessionUser = session.session.user;
        sessionUser.firstName = session.token.firstName;
        sessionUser.lastName = session.token.lastName;
        sessionUser.provider = session.token.provider;

        const signUser = await prisma.user.findFirst({
          where: {
            AND: [{ email: sessionUser.email }, { provider: sessionUser.provider }],
          },
        });

        let userName
        if (!signUser) {
          if (sessionUser.firstName || sessionUser.lastName) {
            userName = `${sessionUser.firstName} ${sessionUser.lastName.charAt(0)}`;
          } else { userName = "Anonyme"; }

          try {
            const newUser = await prisma.user.create({
              data: {
                email: sessionUser.email,
                provider: sessionUser.provider,
                firstName: sessionUser.firstName,
                lastName: sessionUser.lastName,
                userName: userName,
              }
            });
            sessionUser.userName = userName;
            sessionUser.id = newUser.id;
          } catch (error) {
            throw error;
          }
        } else {
          sessionUser.userName = signUser.userName;
          sessionUser.id = signUser.id;
        }
      }
      return session;
    },
  }
},
);
