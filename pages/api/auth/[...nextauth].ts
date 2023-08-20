import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismaDb from "@/lib/prismadb";

export default NextAuth({
  providers: [
    Credential({
      id: "credential",
      name: "Credential",
      credentials: {
        email: {
          label: "Email",
          value: "email",
        },
        password: {
          label: "Password",
          value: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password required");
        }
        const user = await prismaDb.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials?.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
