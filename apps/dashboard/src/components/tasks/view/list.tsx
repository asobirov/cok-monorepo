import { InfiniteData } from "react-query"
import { inferQueryOutput } from "@utils/trpc"
import { getRelativeTime } from "@utils/get-relative-time";

type QueryOutput = inferQueryOutput<"tasks.getTasks">;

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
                        <Task
                            key={task.id}
                            {...task}
                        />
                    ))
                ))}
            </div>
        </>
    )
}

type TaskProps = QueryOutput["tasks"][number];

const Task: React.FC<TaskProps> = ({
    title,
    description,
    due,
    status
}) => {
    return (
        <div className="flex flex-row flex-1 justify-between px-6 py-5 border border-whiteAlpha-200 rounded-3xl">
            <div className="inline-flex flex-1 items-start flex-row gap-3 ">
                <input type={'checkbox'} />
                <div className="flex flex-col flex-1">
                    <div className="inline-flex flex-row justify-between items-center w-full mb-2">
                        <h3 className="text-lg font-medium leading-none">
                            {title}
                        </h3>
                        <span className="leading-none">
                            Due by {due && getRelativeTime(new Date(), due)}
                        </span>
                    </div>
                    <p className="text-whiteAlpha-700 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}