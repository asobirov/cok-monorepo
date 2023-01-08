import { SubSidebarProvider, useSubSidebarContext } from '@context/sub-sidebar'
import { useState } from 'react'
import { TasksSidebar } from './tasks-sidebar'

export const SubSidebar: React.FC = () => {
    const { subSidebar, setSubSidebar } = useSubSidebarContext();
    if (!subSidebar) {
        return null;
    }

    return (
        <div className="flex w-64 border border-whiteAlpha-250 rounded-[1.33rem]">
            {subSidebar}
        </div>

    )
}