import { router } from "../trpc";

import { authRouter } from "./auth";
import { filesRouter } from "./files";

export const appRouter = router({
  auth: authRouter,
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
