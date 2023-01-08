import { SelectViewMode } from "@components/tasks/view-mode/select-view-mode";
import { useCallback, useState } from "react";
import { trpc } from '@utils/trpc';
import { TasksViewModeContext } from "../../context/tasks-view-mode";

import { TasksViewMode } from "../../types/enums";
import { NextPageWithLayout, } from "../../types";
import { TasksView } from "@components/tasks/view";

const TasksPage: NextPageWithLayout = () => {
    const [viewMode, setViewMode] = useState(TasksViewMode.List);

    const createTaskMutation = trpc.tasks.createTask.useMutation();

    const handleCreateTask = useCallback(async () => {
        createTaskMutation.mutate({
            title: `Task ${Math.random()}`,
            description: 'Lorem ipsum',
            due: new Date('2022-11-11')
        })
    }, [])
    return (
        <TasksViewModeContext.Provider value={{
            viewMode,
            setViewMode
        }}>
            <div className="flex flex-col flex-1">
                <SelectViewMode />
                <button onClick={() => handleCreateTask()}>
                    Create new task
                </button>
                <TasksView />
            </div>
        </TasksViewModeContext.Provider>
    )
}

export default TasksPage;