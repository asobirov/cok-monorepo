import IconButton from "@components/buttons/icon-button";
import clsx from "clsx";
import { Globe, Home, KanbanBoard, Calendar, Wallet, User, SeaAndSun } from "iconoir-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const pageGroups: {
    title: string;
    icon: React.ReactNode;
    href: string;
}[][] = [
        [{
            title: "Dashboard",
            icon: <Home />,
            href: "/",
        }], [{
            title: 'Portfolio',
            icon: <Globe />,
            href: '/portfolio',
        }, {
            title: 'Calendar',
            icon: <Calendar />,
            href: '/calendar',
        }, {
            title: 'Tasks',
            icon: <KanbanBoard />,
            href: '/tasks',
        }, {
            title: 'Finance',
            icon: <Wallet />,
            href: '/finance',
        }, {
            title: 'Mood Board',
            icon: <SeaAndSun />,
            href: '/mood-board',
        }]
    ];

const Sidebar: React.FC = () => {
    const { data: session } = useSession();
    return (
        <div className="sticky flex flex-col top-0 left-0 bottom-0 ml-2 h-screen ">
            <div className="flex flex-col h-full px-2 my-4 border rounded-[1.33rem] border-whiteAlpha-300 shadow-xl">
                <div className='flex flex-1 flex-col justify-between items-center'>
                    <PageButtons />
                    <div className="flex w-full py-3 px-1">
                        <div className="flex-1">
                            {session?.user?.image ? (
                                <div className="relative w-full pb-[100%]">
                                    < Image
                                        src={session.user.image}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
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
        </div>
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
                    {group.map((page, key) => (
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