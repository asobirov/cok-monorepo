import { InfiniteData } from "react-query"
import { inferQueryOutput } from "@utils/trpc"

export const TasksKanbanView: React.FC<{
    data: InfiniteData<inferQueryOutput<"tasks.getTasks">> | undefined
}> = ({ data }) => {
    return (
        <>
            Kanban view
        </>
    )
}