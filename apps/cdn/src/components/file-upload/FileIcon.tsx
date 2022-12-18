import { EmptyPage, MediaImage } from "iconoir-react"

type FileIconProps = {
    type: string
}

export const FileIcon: React.FC<FileIconProps> = ({
    type
}) => {
    const iconMap: Record<string, JSX.Element> = {
        default: <EmptyPage />,
        png: <MediaImage />,
        jpg: <MediaImage />,
        jpeg: <MediaImage />,
    }

    return (
        <div className="flex items-center justify-center p-2 w-8 h-8 rounded-lg border border-gray-100 dark:border-whiteAlpha-50">
            {iconMap[type] ?? iconMap.default}
        </div>
    )
}