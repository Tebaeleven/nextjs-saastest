import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";

export type CustomAppProps = AppProps<{ session: Session }> & {
    Component: NextComponentType & { requireAuth?: boolean };
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: CustomAppProps) {
    return (
        <SessionProvider session={session}>
            {(() => {
                console.log(Component.requireAuth)
                if (
                    typeof Component.requireAuth === "undefined" ||
                    Component.requireAuth
                ) { //requireAuthが未設定 or Trueの場合は認証
                    return (
                        <AuthGuard>
                            <Component {...pageProps} />
                        </AuthGuard>
                    );
                } else { //falseにしている場合は認証しない
                    return <Component {...pageProps} />;
                }
            })()}
        </SessionProvider>
    );
}
