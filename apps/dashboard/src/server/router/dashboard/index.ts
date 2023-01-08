import axios from 'axios';
import { z } from 'zod';
import { protectedRouter } from "../context";

import { getClosestEventByUrl, parseICalFromUrl } from '@utils/ical';

export const dashboardRouter = protectedRouter()
    .query("getHomePageData", {
        async resolve({ ctx: { prisma } }) {
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
        },
    })
    .mutation("addCalendarSource", {
        input: z
            .object({
                name: z.string(),
                url: z.string().url(),
            }),
        async resolve({
            ctx: { prisma },
            input: {
                name,
                url
            }
        }) {
            const createCal = await prisma.calendar.create({
                data: {
                    name,
                    url
                }
            })

            return {
                calendar: createCal
            }
        }
    })
    .mutation("deleteCalendarSource", {
        input: z
            .object({
                id: z.string()
            }),
        async resolve({
            ctx: { prisma },
            input: { id }
        }) {
            const deleteCal = await prisma.calendar.delete({
                where: {
                    id
                }
            })

            return {
                calendar: deleteCal
            }
        }
    })
