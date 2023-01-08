import { getServerSession } from "@cok/auth-core";
import { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../types";

const AuthSigninPage: NextPageWithLayout = () => {
    const { query: { error } } = useRouter();


    return (
        <div className="flex flex-col flex-1 items-center mt-20">
            <h1 className="text-4xl font-bold mb-2">
                Signin
            </h1>
            {error && (
                <span>
                    Error: {error}
                </span>
            )}
            <div className="mt-8">
                <button
                    className="border border-whiteAlpha-500 py-2 px-5 rounded-2xl"
                    onClick={() => signIn('github')}
                >
                    Sign In with GitHub
                </button>
                {/* <button className="border border-whiteAlpha-500 py-2 px-5 rounded-2xl">
                    Sign out
                </button> */}
            </div>
        </div>
    );
}

AuthSigninPage.auth = false;
AuthSigninPage.layout = false;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx)
    const { query: { callback } } = ctx
    if (session) {
        return {
            redirect: {
                destination: callback ?? '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default AuthSigninPage