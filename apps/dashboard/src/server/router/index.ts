// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { dashboardRouter } from "./dashboard";
import { tasksRouter } from "./tasks";
import { moodReportRouter } from "./mood-report";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("dashboard.", dashboardRouter)
  .merge("tasks.", tasksRouter)
  .merge("moodReport.", moodReportRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
