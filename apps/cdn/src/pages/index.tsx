import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {
  const { data: session } = trpc.auth.getSession.useQuery();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-xl text-white">
          {
            session &&
            <span>
              Logged in to CDN as {session?.user?.id}
            </span>
          }
        </p>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => signOut() : () => signIn('github')}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Home;