import { inferQueryOutput } from "@utils/trpc"
import clsx from "clsx"
import { Flash, Leaf } from "iconoir-react"

type MoodCardProps = inferQueryOutput<"moodReport.getReports">['reports'][number]

export const MoodCard: React.FC<MoodCardProps> = ({
    comment,
    energyRating,
    id,
    moodRating,
    reportedAt,
    updatedAt,
}) => {
    return (
        <div className={clsx(
            "flex flex-col px-4 py-4 border border-whiteAlpha-200 rounded-3xl shadow-sm md:shadow-lg",
            // Add shadow depending on mood-energy ratio rating
            moodRating >= 0 && "border-opacity-20",
            moodRating < 4 && "border-red-500",
            moodRating >= 4 && moodRating <= 6 && "border-yellow-500",
            moodRating > 6 && "border-green-500",
        )}>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 justify-between">
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex flex-row">
                        {Array.from({ length: energyRating }).map((_, key) => (
                            <div
                                className="text-amber-500"
                                key={key}
                            >
                                <Flash fill="currentColor" />
                            </div>
                        ))}
                        {Array.from({ length: 10 - energyRating }).map((_, key) => (
                            <div
                                className="text-amber-500"
                                key={key}
                            >
                                <Flash />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row">
                        {Array.from({ length: moodRating }).map((_, key) => (
                            <div
                                className="text-lime-400"
                                key={key}
                            >
                                <Leaf fill="currentColor" />
                            </div>
                        ))}
                        {Array.from({ length: 10 - moodRating }).map((_, key) => (
                            <div
                                className="text-lime-400"
                                key={key}
                            >
                                <Leaf />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-sm">
                    {reportedAt.toLocaleDateString(undefined, {
                        minute: '2-digit',
                        hour: '2-digit',
                        day: '2-digit',
                        hour12: false,
                        month: 'short',
                        year: 'numeric',
                    })}
                </div>
            </div>
            <div className="mt-2 text-sm">
                {comment}
            </div>
        </div >
    )
}