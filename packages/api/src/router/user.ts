import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({ where: { id: ctx.user.id } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          id: input.id,
          name: input.email.split("@")[0],
        },
      });
    }),
});
