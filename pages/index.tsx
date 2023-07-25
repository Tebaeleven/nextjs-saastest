import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({count}) {
    const { data, status } = useSession();

    const [apiResponse, setApiResponse] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await axios.get("/api/text");
                const response = await axios.post("/api/getApiLimit");
                console.log(response,"dalkjjsdalkljkasdf")
                setApiResponse(response.data.count);
            } catch (error) {
                console.error("Error fetching API:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <main>
            <h1 className="text-5xl">トップページ</h1>
            <p>だだ{count}</p>
            <p>API Response: {apiResponse}</p>

            {data?.user?.name ? (
                data?.user?.name
            ) : (
                <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-3">
                    <Link href="/auth/signin">ログイン</Link>
                </button>
            )}

            {status === "authenticated" && (
                <button
                    className="text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-3"
                    onClick={() => signOut()}
                >
                    ログアウト
                </button>
            )}

            <Link
                href="/secret"
                className="font-medium text-blue-600 dark:text-blue-500 underline"
            >
                Secret Page
            </Link>
        </main>
    );
}
import prisma from "@/lib/prisma";

Home.requireAuth = false;