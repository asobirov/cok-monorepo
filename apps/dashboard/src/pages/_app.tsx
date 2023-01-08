// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";

import { ProtectedPage } from "@cok/interface";
import Layout from "@components/layout/Layout";
import { AppPropsWithLayout } from "../types";

import { trpc } from "@utils/trpc";

import "@cok/tailwind-config/globals.css";
import { useRouter } from "next/router";

const Protect: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const router = useRouter();
    return (
      <ProtectedPage onUnauthenticated={() => {
        router.push("/auth/signin");
      }}>
        {children}
      </ProtectedPage>
    )
  }

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const auth = (page: React.ReactNode) => Component.auth === false ? page : (
    <Protect>
      {page}
    </Protect>
  );

  const layout = Component.layout || (
    (page: React.ReactNode) => (
      <Layout
        showSidebar={!(Component.layout === false || Component.layout === null)}
        title={Component.title?.text}
      >
        {page}
      </Layout>
    )
  );


  return (
    <SessionProvider session={session}>
      {auth(layout(<Component {...pageProps} />))}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp)