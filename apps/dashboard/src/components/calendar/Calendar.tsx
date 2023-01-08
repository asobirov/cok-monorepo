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
        }),
    });

    if (days.length % 5 === 0) {
        days.push(...eachDayOfInterval({
            start: add(days[days.length - 1], {
                days: 1
            }),
            end: endOfWeek(add(days[days.length - 1], {
                days: 1
            }), {
                weekStartsOn: 1
            }),
        }));
    }


    // const days = eachDayOfInterval({
    //     start: startOfWeek(startOfActiveMonth, {
    //         weekStartsOn: 1,
    //     }),
    //     end: endOfWeek(endOfMonth(startOfActiveMonth), {
    //         weekStartsOn: 1
    //     })
    // });

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
        <div className="flex flex-col flex-1">
            <div className=" flex flex-row gap-5 justify-center items-center mb-3">
                <div
                    className="border border-whiteAlpha-300 hover:bg-whiteAlpha-100 rounded-full p-1.5 cursor-pointer transition-colors duration-100 ease-[ease]"
                    onClick={() => handlePrevMonth()}
                >
                    <NavArrowLeft />
                </div>
                <h1 className="text-2xl font-light">
                    {startOfActiveMonth.toLocaleDateString("default", { month: "long", year: "numeric" })}
                </h1>
                <div
                    className="border border-whiteAlpha-300 hover:bg-whiteAlpha-100 rounded-full p-1.5 cursor-pointer transition-colors duration-100 ease-[ease]"
                    onClick={() => handleNextMonth()}
                >
                    <NavArrowRight />
                </div>
            </div>
            <div className="grid grid-cols-7 border-b border-whiteAlpha-200 pb-3 pt-2 mb-3">
                {weekdays.map((day, index) => (
                    <div key={index} className="flex justify-start px-3 select-none">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-3 flex-1">
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
        </div >
    )
}

export default Calendar;