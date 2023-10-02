import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"



export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {

                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string,
                }
                const prisma = new PrismaClient()
                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                });

                if (!user) {
                    return null
                }

                const valid = await bcrypt.compare(password, user.password)

                if (user && valid) {
                    return { ...user, id: user.id.toString() };
                } else {
                    return null;
                }
            },
        }),
    ],
});






