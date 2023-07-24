import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data, status } = useSession();

    return (
        <main>
            <h1 className="text-5xl">トップページ</h1>

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

Home.requireAuth = false;