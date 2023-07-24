import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
    const router = useRouter();

    const { status } = useSession(); //authenticated unauthenticated loading
    
    useEffect(() => {
        //未認証かつログイン画面ではない時にトップページにリダイレクトする
        if (status === "unauthenticated" && router.pathname != "/auth/signin"){
            router.push("/auth/signin");
        }
    }, [router, status]);
    
    if (status === "loading"){
        return <p>Loading...</p>;
    }
    if (status === "authenticated"){
        return children;
    } 
};

export default AuthGuard;
