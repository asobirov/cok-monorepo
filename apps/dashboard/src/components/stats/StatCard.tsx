import clsx from 'clsx';
import { StatsReport } from 'iconoir-react'
import Link, { LinkProps } from 'next/link';
import { forwardRef, ForwardRefRenderFunction } from 'react';

type StatCard = {
    href?: LinkProps['href'],
} & Omit<StatCardBaseProps, "isLink">;

const StatCard: React.FC<StatCard> = ({
    href,
    ...props
}) => {
    if (href) {
        return (
            <Link
                href={href}
                className='cursor-pointer'
            >
                <StatCardBase {...props} />
            </Link>
        )
    }

    return (
        <StatCardBase {...props} />
    )
}

type StatCardBaseProps = {
    title: string,
    value: string,
    icon?: React.ReactElement,
    className?: string,
}

const StatCardCore: ForwardRefRenderFunction<HTMLDivElement, StatCardBaseProps> = ({
    title,
    value,
    icon = <StatsReport />,
    className
}, ref) => {
    return (
        <div
            className={clsx(
                "flex flex-row flex-1 items-center justify-start gap-4 py-3 px-5 bg-whiteAlpha-50 hover:bg-whiteAlpha-100 rounded-2xl shadow-sm transition-colors duration-150 ease-[ease]",
                className
            )}
            title={title}
        >
            <div>
                {icon}
            </div>
            <div className='flex flex-col items-start'>
                <span className='flex flex-row items-center gap-3'>
                    <span className='font-semibold text-lg text-white whitespace-nowrap'>
                        {value}
                    </span>
                </span>
                <span className='text-xs font-medium capitalize line-clamp-1 text-whiteAlpha-600'>
                    {title ?? "--"}
                </span>
            </div>
        </div>
    )
}

const StatCardBase = forwardRef(StatCardCore);

export default StatCard