import { InfiniteData } from "react-query"
import { RouterOutputs } from "@utils/trpc"
import { TaskCard } from "../task/task-card"

export const TasksGridView: React.FC<{
    data: InfiniteData<RouterOutputs["tasks"]["getTasks"]> | undefined
}> = ({ data }) => {
    if (!data) {
        return (
            <>
                Loading... / No data
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
                {data.pages.map((page) => (
                    page.tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            {...task}
                        />
                    ))
                ))}
            </div>
        </>
    )
}