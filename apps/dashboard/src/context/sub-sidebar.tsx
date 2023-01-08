import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { TasksViewMode } from '../types/enums/tasks/view-mode';

export const SubSidebarContext = createContext<{
    subSidebar: React.ReactNode;
    setSubSidebar: Dispatch<SetStateAction<React.ReactNode>>;
}>({
    subSidebar: null,
    setSubSidebar: () => {
        throw new Error('You forgot to wrap your component in <SubSidebarContext.Provider />');
    }
});

export const SubSidebarProvider = SubSidebarContext.Provider;

export const useSubSidebarContext = () => {
    return useContext(SubSidebarContext);
}