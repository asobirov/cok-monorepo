import { InfiniteData } from "react-query"
import { RouterOutputs } from "@utils/trpc"

import { TaskHorizontal } from "@components/tasks/task/task-horizontal";

type QueryOutput = RouterOutputs['tasks']['getTasks'];

export const TasksListView: React.FC<{
    data: InfiniteData<QueryOutput> | undefined
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
            <div className="flex flex-col gap-2">
                {data.pages.map((page) => (
                    page.tasks.map((task) => (
                        <TaskHorizontal
                            key={task.id}
                            {...task}
                        />
                    ))
                ))}
            </div>
        </>
    )
}

