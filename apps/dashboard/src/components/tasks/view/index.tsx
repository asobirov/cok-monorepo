import { TasksViewModeContext } from "@context/tasks-view-mode";
import { useContext } from "react";
import { trpc } from "@utils/trpc";

import { TasksViewMode } from "../../../types/enums";

import { TasksKanbanView } from "./kanban";
import { TasksListView } from "./list";
import { TasksTableView } from "./table";

export const TasksView: React.FC = () => {
    const { viewMode } = useContext(TasksViewModeContext);

    const { data } = trpc.tasks.getTasks.useInfiniteQuery({
        limit: 10,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    if (viewMode === TasksViewMode.Kanban) {
        return (
            <TasksKanbanView data={data} />
        )
    }

    if (viewMode === TasksViewMode.Table) {
        return (
            <TasksTableView data={data} />
        )
    }

    if (viewMode === TasksViewMode.List) {
        return (
            <TasksListView data={data} />
        )
    }

    return null;
}