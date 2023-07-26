import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const incrementApiLimit = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return 0;
    }

    const userApiLimit = await prisma.userAPILimit.findUnique({
        where: { userId: userId },
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
};

export const getApiLimitCount = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return 0;
    }

    const userApiLimit = await prisma.userAPILimit.findUnique({
        where: {
            userId,
        },
    });

    if (!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
};
