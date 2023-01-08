import { RouterOutputs, trpc } from "@utils/trpc"

import { Checkbox } from "@components/Checkbox";
import { useState } from "react";
import { TaskStatus } from "@cok/db";
import { useDebounce } from "@hooks/use-debounce";
import { useEffect } from "react";

type QueryOutput = RouterOutputs['tasks']['getTasks'];

type TaskHorizontalProps = QueryOutput["tasks"][number];

export const TaskHorizontal: React.FC<TaskHorizontalProps> = ({
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
            if (debouncedTaskStatus === taskStatus) {
                return;
            }

            markTaskMutation.mutate({
                taskId: id,
                status: debouncedTaskStatus
            });
        } catch (error) {
            alert("Failed to update task status")
        }
    }, [debouncedTaskStatus])

    return (
        <div className="flex flex-row flex-1 justify-between px-4 py-4 border border-whiteAlpha-200 rounded-[1.25rem]">
            <div className="inline-flex flex-1 items-start flex-row gap-3 ">
                <Checkbox
                    checked={taskStatus === "DONE"}
                    onChange={(c) => handleCheckboxChange(c)}
                />
                <div className="flex flex-col flex-1">
                    <div className="inline-flex flex-row justify-between items-center w-full mb-2">
                        <h3 className="text-md font-medium leading-none">
                            {title}
                        </h3>
                        <span className="text-sm leading-none">
                            {due && new Date(due).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </span>
                    </div>
                    <p className="text-whiteAlpha-700 text-base line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}