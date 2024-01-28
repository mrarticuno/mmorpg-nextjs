import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  getChars: protectedProcedure.query(async ({ ctx }) => {
    const chars = await ctx.db.character.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return chars.sort((a, b) => a.level - b.level);
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(20), classId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userChars = await ctx.db.character.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (userChars.length >= 4) {
        throw new Error("User has reached the maximum number of characters.");
      }

      return ctx.db.character.create({
        data: {
          name: input.name,
          classId: input.classId,
          userId: ctx.session.user.id,
          charStats: {
            create: {},
          },
          inventory: {
            create: {},
          },
        },
      });
    }),
  levelUp: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const char = await ctx.db.character.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!char) {
        throw new Error("Character not found.");
      }

      return ctx.db.character.update({
        where: {
          id: input.id,
        },
        data: {
          level: char.level + 1,
          experience: 0,
          points: (char.points || 0) + 5,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const char = await ctx.db.character.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!char) {
        throw new Error("Character not found.");
      }

      return ctx.db.character.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
