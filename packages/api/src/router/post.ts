//grab the images for the corresponding user
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { slugify } from "../utils";

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(64),
        content: z.string().min(3),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //create post and link it to the user
      let slug = slugify(input.title);

      const exists = await ctx.prisma.post.findUnique({
        where: {
          slug,
        },
      });

      if (exists) {
        slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
      }

      return ctx.prisma.post.create({
        data: {
          ...input,
          slug,
          authorId: ctx.user.id,
        },
      });
    }),
  bySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().min(3).max(64),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
});
