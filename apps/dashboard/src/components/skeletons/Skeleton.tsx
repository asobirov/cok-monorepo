import clsx from "clsx"
import { HTMLProps } from "react"

const Skeleton: React.FC<HTMLProps<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    return (
        <div
            className={clsx("animate-pulse bg-whiteAlpha-200 rounded-2xl", className)}
        />
    )
}

export default Skeleton