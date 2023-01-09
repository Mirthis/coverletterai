import { editProfileSchema } from "~/hooks/forms/useEditProfileForm";
import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  update: protectedProcedure
    .input(editProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;
      const user = await ctx.prisma.user.update({
        where: { id },
        data: input,
      });
      return user;
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.prisma.user.delete({
      where: { id },
    });
    return user;
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }),
});
