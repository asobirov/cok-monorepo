import clsx from "clsx";
import { KanbanBoard, List, Plus, Table2Columns, ViewGrid } from "iconoir-react";
import { useContext } from "react";
import { TasksViewModeContext } from "@context/tasks-view-mode";
import { TasksViewMode } from "../../../types/enums";

export const SelectViewMode: React.FC = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full gap-2 pb-4 mb-4 h-min border-b border-whiteAlpha-100 text-whiteAlpha-600">
            <div>
                <ViewModeBtn value={TasksViewMode.Kanban}>
                    <KanbanBoard />
                </ViewModeBtn>
                <ViewModeBtn value={TasksViewMode.Grid}
                >
                    <ViewGrid />
                </ViewModeBtn>
                <ViewModeBtn value={TasksViewMode.List}
                >
                    <List />
                </ViewModeBtn>
            </div>
            <div>
                <button
                    className="flex flex-row gap-2 p-2 border border-whiteAlpha-200 rounded-2xl"
                    onClick={() => alert("Open new task modal")}
                >
                    <Plus />
                </button>
            </div>
        </div >
    )
}

const ViewModeBtn: React.FC<{
    children: React.ReactNode,
    value: TasksViewMode,
}> = ({ children, value }) => {
    const { viewMode, setViewMode } = useContext(TasksViewModeContext);
    return (
        <button
            title={value[0].toUpperCase() + value.slice(1).toLowerCase() + " view"}
            className={
                clsx(
                    "inline-flex items-center gap-2 px-2 py-2 text-xs font-normal capitalize hover:text-whiteAlpha-900 rounded-xl select-none transition-colors duration-100 ease-[ease]",
                    value === viewMode && "bg-white/5 !text-white"
                )}
            onClick={() => setViewMode(value)}
        >
            {children}
        </button >
    )
}