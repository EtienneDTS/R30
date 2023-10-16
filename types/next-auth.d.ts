import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        session: {
            user: {
                id: number,
                userName: string,
                provider: string,
                email: string,
                image: string,
                lastName: string,
                firstName: string,
                name: string,

            }
        }
    }
}