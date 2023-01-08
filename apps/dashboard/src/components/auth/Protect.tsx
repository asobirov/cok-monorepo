import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Protect: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const hasUser = !!session?.user;

    useEffect(() => {
        if (status === 'loading') return
        if (!hasUser) router.push('/auth/signin');
    }, [hasUser, status, router])

    if (hasUser) {
        return (
            <>{children}</>
        )
    }

    return null;
}

export default Protect