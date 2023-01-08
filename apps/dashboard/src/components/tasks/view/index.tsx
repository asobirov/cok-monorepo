import { TasksViewModeContext } from "@context/tasks-view-mode";
import { useContext } from "react";
import { trpc } from "@utils/trpc";

import { TasksViewMode } from "../../../types/enums";

import { TasksKanbanView } from "./kanban";
import { TasksListView } from "./list";
import { TasksGridView } from "./grid";

export const TasksView: React.FC = () => {
    const { viewMode } = useContext(TasksViewModeContext);

    const { data } = trpc.tasks.getTasks.useInfiniteQuery({
        limit: 10,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    const viewModeMap = {
        [TasksViewMode.Kanban]: <TasksKanbanView data={data} />,
        [TasksViewMode.List]: <TasksListView data={data} />,
        [TasksViewMode.Grid]: <TasksGridView data={data} />,
    } as const

    return viewModeMap[viewMode] || null;
}