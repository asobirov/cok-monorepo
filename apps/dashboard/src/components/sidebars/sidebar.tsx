import IconButton from "@components/buttons/icon-button";
import { SubSidebarProvider } from "@context/sub-sidebar";
import { trpc } from "@utils/trpc";
import { Globe, Home, KanbanBoard, Calendar, Wallet, User } from "iconoir-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubSidebar } from './sub-sidebar'
import { TasksSidebar } from "./tasks-sidebar";

const pageGroups: {
    title: string;
    icon: React.ReactNode;
    href: string;
    sidebar?: React.ReactNode;
    hidden?: boolean;
}[][] = [
        [{
            title: "Dashboard",
            icon: <Home />,
            href: "/",
        }], [{
            title: 'Portfolio',
            icon: <Globe />,
            href: '/portfolio',
            hidden: true,
        }, {
            title: 'Calendar',
            icon: <Calendar />,
            href: '/calendar',
        }, {
            title: 'Tasks',
            icon: <KanbanBoard />,
            href: '/tasks',
            sidebar: <TasksSidebar />,
        }, {
            title: 'Finance',
            icon: <Wallet />,
            href: '/finance',
            hidden: true,
        }]
    ];

const MainSidebar: React.FC = () => {
    const { data: session } = trpc.auth.getSession.useQuery();

    return (
        <div className="flex flex-col h-full px-2 border rounded-[1.33rem] border-whiteAlpha-300 shadow-xl">
            <div className='flex flex-1 flex-col justify-between items-center'>
                <PageButtons />
                <div className="flex w-full py-3 px-1">
                    <div className="flex-1">
                        {session?.user?.image ? (
                            <div className="relative w-full pb-[100%]">
                                <Image
                                    alt="User Image"
                                    src={session.user.image}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full aspect-square text-whiteAlpha-800 border border-whiteAlpha-800 rounded-full">
                                <User />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const findPageSidebarByPath = (path: string) => {
    return pageGroups.flat().find((page) => page.href === path)?.sidebar ?? null;
}

const Sidebar: React.FC = () => {
    const router = useRouter();
    console.log(router)
    const [subSidebar, setSubSidebar] = useState<React.ReactNode>(findPageSidebarByPath(router.asPath));

    useEffect(() => {
        setSubSidebar(findPageSidebarByPath(router.asPath));
    }, [router.asPath])

    return (
        <SubSidebarProvider value={{
            subSidebar,
            setSubSidebar,
        }}>
            <div className="sticky flex flex-col top-0 left-0 bottom-0 ml-2 h-screen ">
                <div className="flex flex-row h-full my-4 space-x-2">
                    <MainSidebar />
                    <SubSidebar />
                </div>
            </div>
        </SubSidebarProvider>
    )
}

const PageButtons: React.FC = () => {
    const router = useRouter();
    return (
        <div>
            {pageGroups.map((group, key) => (
                <div
                    key={key}
                    className={"flex flex-col gap-1 py-2 border-b border-whiteAlpha-200 last:border-none"}
                >
                    {group.map((page, key) => !page.hidden && (
                        <IconButton
                            key={key}
                            href={page.href}
                            isActive={router.asPath === page.href}
                            variant="ghost"
                            title={page.title}
                            aria-label={page.title}
                            icon={page.icon}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}



export default Sidebar