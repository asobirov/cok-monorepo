import { useInView } from 'react-intersection-observer';
import type { inferQueryOutput } from "@utils/trpc";
import { MoodCard } from "./mood-card";
import { Fragment, useEffect } from 'react';
import { InfiniteData } from 'react-query';

type MoodBoardGridProps = {
    data: InfiniteData<inferQueryOutput<"moodReport.getReports">> | undefined;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
}

export const MoodBoardGrid: React.FC<MoodBoardGridProps> = ({
    data,
    hasNextPage,
    fetchNextPage,
}) => {
    const { ref, inView } = useInView({
        rootMargin: '300px',
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    if (!data) {
        return null;
    }

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {data.pages.map((page, key) => (
                <Fragment key={page.nextCursor || key}>
                    {page.reports.map((report, key) => (
                        <MoodCard
                            key={report.id || key}
                            {...report}
                        />
                    ))}
                </Fragment>
            ))}
            {hasNextPage && <div ref={ref} className="w-full h-10" />}
        </div>
    )
}
