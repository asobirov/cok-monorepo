import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from "../trpc";

import { getClosestEventByUrl } from '@cok/ical-utils';

export const dashboardRouter = router({
    getHomePageData: protectedProcedure()
        .query(async ({
            ctx: { prisma },
        }) => {
            // NOTE: Not sure if calendar should be requested on every route request
            const calendar = await prisma.calendar.findFirst({
                where: {
                    name: 'Brunel Timetable',
                }
            })

            const { closestEvent, events } = await getClosestEventByUrl(calendar?.url);

            const nextLecOrLab = closestEvent ? {
                name: closestEvent.description.moduleName,
                date: closestEvent.start,
            } : null;

            return {
                uni: {
                    nextLecOrLab: nextLecOrLab,
                    calendarId: calendar?.id,
                    upcomingEvents: events,
                },
                portfolio: {
                    views: "-",
                },
                tasks: {
                    activeCount: "420",
                    completedThisWeekCount: "69",
                },
            };
        }),
    addCalendarSource: protectedProcedure()
        .input(z.object({
            name: z.string(),
            url: z.string().url(),
        }))
        .mutation(async ({
            ctx: { prisma },
            input: {
                name,
                url
            }
        }) => {
            const createCal = await prisma.calendar.create({
                data: {
                    name,
                    url
                }
            })

            return {
                calendar: createCal
            }
        }),
    deleteCalendarSource: protectedProcedure()
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({
            ctx: { prisma },
            input: { id }
        }) => {
            const deleteCal = await prisma.calendar.delete({
                where: { id }
            })

            return {
                calendar: deleteCal
            }
        })
})