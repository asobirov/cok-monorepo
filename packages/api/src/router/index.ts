import { router } from "../trpc";

import { authRouter } from "./auth";
import { filesRouter } from "./files";
import { tasksRouter } from "./tasks";

export const appRouter = router({
  auth: authRouter,
  files: filesRouter,
  tasks: tasksRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
