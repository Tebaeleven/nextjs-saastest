import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { CustomNextPage } from "@/types/custom-next-page";

const SignIn = ({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {providers &&
                Object.values(providers).map((provider) => {
                    if (provider.name === "GitHub") {
                        return (
                            <div key={provider.id} className="m-5">
                                <button onClick={() => signIn(provider.id)} className="text-white bg-gray-600 hover:bg-gray-700 rounded-lg text-sm px-5 py-3">
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        );
                    } else if(provider.name === "Google") {
                        return (
                            <div key={provider.id} className="m-5">
                                <button onClick={() => signIn(provider.id)} className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-3">
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        );
                    }
                })}
        </>
    );
};

export default SignIn;
SignIn.requireAuth=false
export const getServerSideProps = async () => {
    // 複数の認証を取得
    const providers = await getProviders();
    return {
        props: { providers },
    };
};
