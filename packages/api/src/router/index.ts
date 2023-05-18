import { router } from "../trpc";
import { authRouter } from "./auth";
import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = router({
  post: postRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
