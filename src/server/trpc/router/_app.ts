import { router } from "../trpc";
import { authRouter } from "./auth";
import { coverLettersRouter } from "./coverLetters";

export const appRouter = router({
  coverLetters: coverLettersRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
