import { router } from "../trpc";

import { authRouter } from "./auth";
import { dashboardRouter } from "./dashboard";
import { filesRouter } from "./files";
import { tasksRouter } from "./tasks";

export const appRouter = router({
  auth: authRouter,
  files: filesRouter,
  tasks: tasksRouter,
  dashboard: dashboardRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
