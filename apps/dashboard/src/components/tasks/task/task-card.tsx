import { RouterOutputs, trpc } from "@utils/trpc"

import { Checkbox } from "@components/Checkbox";
import { useState } from "react";
import { TaskStatus } from "@cok/db";
import { useDebounce } from "@hooks/use-debounce";
import { useEffect } from "react";

type QueryOutput = RouterOutputs['tasks']['getTasks'];

type TaskCardProps = QueryOutput["tasks"][number];

export const TaskCard: React.FC<TaskCardProps> = ({
    id,
    title,
    description
}) => {
    return (
        <div className="border border-whiteAlpha-200 rounded-[1.25rem] p-4">
            <div className="flex flex-col space-y-4">
                <h3 className="text-md font-medium leading-none line-clamp-2">
                    {title}
                </h3>
                <p className="text-xs">
                    {description}
                </p>
            </div>
        </div>
    )
}