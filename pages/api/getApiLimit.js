import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { MAX_FREE_COUNTS } from "@/constants";

//TODO userIdがnullの時などに正常にapiが終了するようにする
//TODO 計算ロジックは分割する
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return;
    }
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const userApiLimit = await prisma.userAPILimit.findUnique({
            where: {
                userId,
            },
        });

        if (!userApiLimit) {
            res.status(200).json({ count: 0 });
        } else {
            console.log(userApiLimit);
            console.log("dada", userApiLimit.count);
            console.log("dada");
            res.status(200).json({ count: userApiLimit.count });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
