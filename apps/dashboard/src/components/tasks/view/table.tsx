import { InfiniteData } from "react-query"
import { inferQueryOutput } from "@utils/trpc"

export const TasksTableView: React.FC<{
    data: InfiniteData<inferQueryOutput<"tasks.getTasks">> | undefined
}> = ({ data }) => {
    return (
        <>
            Table view
        </>
    )
}