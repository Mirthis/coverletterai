import { router } from "../trpc";
import { authRouter } from "./auth";
import { coverLettersRouter } from "./coverLetters";
import { usersRouter } from "./users";

export const appRouter = router({
  coverLetters: coverLettersRouter,
  auth: authRouter,
  user: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
