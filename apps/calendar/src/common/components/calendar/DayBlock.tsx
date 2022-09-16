import clsx from 'clsx';
import { isFirstDayOfMonth, isSameDay, isSameMonth } from 'date-fns';

type DayBlockProps = {
    date: Date;
    today: Date;
    available?: boolean;
    eventsCount?: number | null;
    isSelected?: boolean;
    isInActiveMonth: boolean;
}

export const DayBlock: React.FC<DayBlockProps> = ({
    date,
    today,
    available = false,
    eventsCount,
    isSelected = false,
    isInActiveMonth,
}) => {
    return (
        <div className={clsx(`group flex flex-col justify-between items-end border-r border-b border-whiteAlpha-200 p-3`, {
            'md:bg-striped-disabled': !available,
        })}>
            <Day
                date={date}
                today={today}
                isSelected={isSelected}
                isInActiveMonth={isInActiveMonth}
            />

            {available && eventsCount && (
                <div className='text-xs'>
                    {eventsCount} events
                </div>
            )}
        </div>
    )
}

const Day: React.FC<{
    date: Date;
    today: Date;
    isSelected: boolean;
    isInActiveMonth: boolean;
}> = ({ date, today, isSelected, isInActiveMonth }) => {
    const dayNumber = date.getDate();
    const dayValue = dayNumber === 1 ? `${dayNumber} ${date.toLocaleString('default', { month: 'short' })}` : dayNumber;
    const isToday = isSameDay(date, today);

    const isFirstDay = isFirstDayOfMonth(date);

    return (
        <div className={clsx(`flex border-whiteAlpha-200  rounded-full`, {
            "text-whiteAlpha-500": !isInActiveMonth,
        })}>
            <span className={clsx(`relative flex items-center justify-center rounded-full select-none after:absolute after:h-8 after:w-8 after:rounded-full`, {
                "text-primary-dark after:bg-whiteAlpha-900 after:-z-[1]": isSelected,
                "after:border-2": isToday && !isSelected,
                "after:border-whiteAlpha-500": isToday && !isSelected && !isInActiveMonth,
                "after:border-whiteAlpha-900": isToday && !isSelected && isInActiveMonth,
                "mr-2": (isSelected || isToday) && !isFirstDay,
            })}>
                {dayNumber}
            </span>
            {isFirstDay && (
                <span className={clsx(`ml-1`, {
                    "ml-5": isSelected || isToday,
                })}>
                    {date.toLocaleString('default', { month: 'short' })}
                </span>
            )}
        </div>
    )
}