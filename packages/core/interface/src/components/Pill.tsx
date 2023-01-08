type PillProps = {
    children: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({
    children
}) => {
    return (
        <div className="flex items-center justify-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
            {children}
        </div>
    )
}