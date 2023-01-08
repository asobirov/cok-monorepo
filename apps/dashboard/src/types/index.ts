import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Session } from "next-auth";

export type NextPageWithLayout = NextPage & {
    layout?: ((page: ReactElement) => ReactNode) | null | false;
    title?: LayoutTitle,
    auth?: boolean,
};

export type LayoutTitle = {
    hideOnDesktop?: boolean;
    hideOnMobile?: boolean;
    text: string;
}

export type AppPropsWithLayout = AppProps<{
    session: Session | null
}> & {
    Component: NextPageWithLayout;
}