import { createContext, Dispatch, SetStateAction } from 'react';
import { TasksViewMode } from '../types/enums/tasks/view-mode';

export const TasksViewModeContext = createContext<{
    viewMode: TasksViewMode;
    setViewMode: Dispatch<SetStateAction<TasksViewMode>>;
}>({
    viewMode: TasksViewMode.Kanban,
    setViewMode: () => { 
        throw new Error('You forgot to wrap your component in <TasksViewModeContext.Provider />');
    },
});