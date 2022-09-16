import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parse, startOfToday, startOfWeek } from "date-fns";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { useState } from "react";
import { DayBlock } from "./DayBlock";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: React.FC = () => {
    const today = startOfToday();

    const [selectedDate, setSelectedDate] = useState<Date | null>(today);

    const [activeMonth, setActiveMonth] = useState<string>(format(today, 'MMM-yyyy'));

    const startOfActiveMonth = parse(activeMonth, 'MMM-yyyy', new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(startOfActiveMonth, {
            weekStartsOn: 1,
        }),
        end: endOfWeek(endOfMonth(startOfActiveMonth), {
            weekStartsOn: 1
        })
    });

    const handlePrevMonth = () => {
        const prevMonthStart = add(startOfActiveMonth, { months: -1 });
        setActiveMonth(format(prevMonthStart, 'MMM-yyyy'));
    }

    const handleThisMonth = () => {
        setActiveMonth(format(today, 'MMM-yyyy'));
    }

    const handleNextMonth = () => {
        const nextMonthStart = add(startOfActiveMonth, { months: 1 });
        setActiveMonth(format(nextMonthStart, 'MMM-yyyy'));
    }

    return (
        <>
            <div className=" flex flex-row justify-between items-center mb-3">
                <h1 className="text-2xl font-medium">
                    {startOfActiveMonth.toLocaleDateString("default", { month: "long", year: "numeric" })}
                </h1>
                <div className="flex flex-row items-center ml-4 gap-1 text-sm">
                    <NavArrowLeft onClick={() => handlePrevMonth()} />
                    <div className="group relative flex items-center justify-center w-[1.5rem] h-[1.5rem]" onClick={() => handleThisMonth()}>
                        <div className={"rounded-full bg-current w-1 h-1 transition-all ease-out group-hover:w-2 group-hover:h-2"} />
                    </div>
                    <NavArrowRight onClick={() => handleNextMonth()} />
                </div>
            </div>
            <div className="grid grid-cols-7">
                {weekdays.map((day, index) => (
                    <div key={index} className="flex justify-end py-1 px-3 select-none">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 flex-1 border-l border-t border-whiteAlpha-200">
                {days.map((date, i) => (
                    <DayBlock
                        key={i}
                        today={today}
                        date={date}
                        isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
                        eventsCount={3}
                        isInActiveMonth={isSameMonth(date, startOfActiveMonth)}
                        available
                    />
                ))}
            </div>
        </>
    )
}

export default Calendar;