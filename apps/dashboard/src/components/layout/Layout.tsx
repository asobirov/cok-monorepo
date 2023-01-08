import { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import Sidebar from "../sidebars/Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";

type LayoutProps = {
    children?: ReactNode,
    title?: string | React.ReactNode,
    is100vh?: boolean,
    showSidebar?: boolean,
    [rest: string]: any;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    showSidebar = true,
    is100vh,
    title
}) => {
    const router = useRouter();

    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="flex flex-1 flex-row">
                {showSidebar && <Sidebar />}
                <main className={clsx("flex flex-col flex-1 px-5 mt-6 md:mt-5 overflow-hidden", is100vh && 'max-h-screen')}>
                    <motion.div
                        key={router.route}
                        initial="hidden"
                        animate="enter"
                        variants={variants}
                        transition={{ type: 'ease-in' }}
                        className="flex flex-col flex-1"
                    >
                        {title && (
                            <div className="mb-4 text-2xl font-semibold">
                                {typeof title !== 'string' ? title : (
                                    <h1>
                                        {title}
                                    </h1>
                                )}
                            </div>
                        )}
                        <div className="flex flex-row flex-1 mb-4">
                            {children}
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    )
}

export default Layout;