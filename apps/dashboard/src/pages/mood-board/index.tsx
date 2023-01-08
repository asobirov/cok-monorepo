import { useCallback } from "react";
import { Plus } from "iconoir-react";
import { NextPageWithLayout } from "../../types";
import { trpc } from "@utils/trpc";

import { MoodBoardGrid } from "@components/mood-board/mood-board-grid";

const MoodBoardPage: NextPageWithLayout = () => {
    const tRPCUtil = trpc.useContext();
    const createReportMutation = trpc.useMutation(['moodReport.createReport'], {
        onSuccess: () => {
            tRPCUtil.invalidateQueries('moodReport.getReports');
        }
    })

    const handleCreateReport = useCallback(async () => {
        createReportMutation.mutate({
            energyRating: 2,
            moodRating: 1,
            comment: 'Bing chilling',
        })
    }, [createReportMutation]);

    return (
        <>
            <div className="flex-1">
                <div className="flex flex-row justify-between items-center w-full mb-4">
                    <h1>Mood Board</h1>
                    <button
                        className="flex flex-row gap-2 p-2 border border-whiteAlpha-200 rounded-2xl"
                        onClick={() => handleCreateReport()}
                    >
                        <Plus />
                    </button>
                </div>
                <div className="flex-1">
                    <MoodBoardList />
                </div>
            </div>
        </>
    )
}

const MoodBoardList: React.FC = () => {
    const {
        data,
        hasNextPage,
        fetchNextPage
    } = trpc.useInfiniteQuery(
        ['moodReport.getReports', { limit: 20 }],
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            suspense: true,
            refetchOnWindowFocus: false,
        }
    )

    return (
        <MoodBoardGrid
            data={data}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
        />
    )
}



export default MoodBoardPage