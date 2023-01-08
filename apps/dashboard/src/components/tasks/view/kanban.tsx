import { InfiniteData } from "react-query"
import { RouterOutputs } from "@utils/trpc"

export const TasksKanbanView: React.FC<{
    data: InfiniteData<RouterOutputs['tasks']['getTasks']> | undefined
}> = ({ data }) => {
    return (
        <>
            Kanban view
        </>
    )
}