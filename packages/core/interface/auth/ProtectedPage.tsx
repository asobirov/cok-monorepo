'use client';

import { useEffect } from "react";
import { trpc } from "../utils/trpc";

type ProtectedPageProps = {
    children: React.ReactNode;
    fallback?: React.ReactElement;
    onUnauthenticated?: () => void;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({
    children,
    fallback = null,
    onUnauthenticated,
}) => {

    const { data: session, status } = trpc.auth.getSession.useQuery(undefined, {
        onSuccess: () => {
            if (!session?.user) {
                console.log(session);
                onUnauthenticated && onUnauthenticated();
            }
        },
    });

    if (status === "success" && session?.user) {
        return (
            <>{children}</>
        )
    }

    return null;
};
