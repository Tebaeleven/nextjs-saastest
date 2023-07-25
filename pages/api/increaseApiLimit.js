import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const userId = session.user.id;
    if (!session) {
        return;
    }

    const userApiLimit = await prisma.userAPILimit.findUnique({
        where: {
            userId: userId,
        },
    });
    if (userApiLimit) {
        await prisma.userAPILimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prisma.userAPILimit.create({
            data: { userId: userId, count: 1 },
        });
    }
}
