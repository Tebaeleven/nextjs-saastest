import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { MAX_FREE_COUNTS } from "@/constants";
import {getApiLimitCount,incrementApiLimit} from "@/lib/api-limit"
//TODO userIdがnullの時などに正常にapiが終了するようにする
//TODO 計算ロジックは分割する
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    await incrementApiLimit(req, res)

    const count=await getApiLimitCount(req, res)
    return res.status(200).json({ count: count });
}
