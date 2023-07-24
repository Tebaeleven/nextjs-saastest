import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";

const SignIn = ({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {providers &&
                Object.values(providers).map((provider) => {
                    if (provider.name === "GitHub") {
                        return (
                            <div key={provider.id}>
                                <button onClick={() => signIn(provider.id)}>
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        );
                    } else if(provider.name === "Google") {
                        return (
                            <div key={provider.id}>
                                <button onClick={() => signIn(provider.id)}>
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

export const getServerSideProps = async () => {
    // 複数の認証を取得
    const providers = await getProviders();
    return {
        props: { providers },
    };
};
