import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), //prismアダプターの使用
    providers: [ //認証providerを追加
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID|| "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET|| "",
        }),
    ],

    secret: process.env.SECRET, //秘密鍵

    session: {
        strategy: "database",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24, // 24 hours
    },

    useSecureCookies: process.env.NODE_ENV === "production",

    pages: { //ログイン画面の場所
        signIn: "auth/signin",
    },

    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },
        async session({ session, user }) {
            if (session?.user) session.user.id = user.id;
            return session;
        },
    },
};

export default NextAuth(authOptions);
