import { NextPageWithLayout } from "../types";

import Link from 'next/link';

const NotFoundPage: NextPageWithLayout = () => {

    return (
        <div className="flex flex-col flex-1 items-center mt-20">
            <span className="text-4xl font-bold mb-4">
                ¯\_(ツ)_/¯
            </span>
            <span className="text-2xl font-medium mb-8">
                Page not found
            </span>
            <Link
                href="/"
                className="border border-whiteAlpha-500 py-2 px-5 rounded-2xl"
            >
                Go Home
            </Link>
        </div>
    )
}

NotFoundPage.auth = false;

export default NotFoundPage
