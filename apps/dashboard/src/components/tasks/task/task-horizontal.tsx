import { RouterOutputs, trpc } from "@utils/trpc"
import { getRelativeTime } from "@utils/get-relative-time";

import { Checkbox } from "@cok/interface/components/checkbox";
import { useState } from "react";
import { TaskStatus } from "@cok/db";
import { useDebounce } from "@hooks/use-debounce";
import { useEffect } from "react";

type QueryOutput = RouterOutputs['tasks']['getTasks'];

type TaskProps = QueryOutput["tasks"][number];

export const TaskHorizontal: React.FC<TaskProps> = ({
    id,
    title,
    description,
    due,
    status
}) => {
    const [taskStatus, setTaskStatus] = useState<TaskStatus>(status);

    const debouncedTaskStatus = useDebounce(taskStatus, 500);
    const trpcUtils = trpc.useContext();
    const markTaskMutation = trpc.tasks.markTask.useMutation({
        onSuccess: (input) => {
            trpcUtils.tasks.getTasks.invalidate();
        }
    });
    const handleCheckboxChange = async (checked: boolean) => {

        setTaskStatus(checked ? "DONE" : "TODO");

    }

    useEffect(() => {
        try {
            markTaskMutation.mutate({
                taskId: id,
                status: debouncedTaskStatus
            });
        } catch (error) {
            alert("Failed to update task status")
        }
    }, [debouncedTaskStatus])

    return (
        <div className="flex flex-row flex-1 justify-between px-6 py-5 border border-whiteAlpha-200 rounded-3xl">
            <div className="inline-flex flex-1 items-start flex-row gap-3 ">
                <Checkbox
                    checked={taskStatus === "DONE"}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 p-2 text-indigo-600 border-gray-300 bg-none rounded focus:ring-indigo-50"
                />
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