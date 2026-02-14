import { prisma } from '../config/database';

export const resolvers = {
  Query: {
    portfolios: async () => {
      return prisma.portfolio.findMany({
        include: { positions: true, strategies: true },
      });
    },

    portfolio: async (_: unknown, { id }: { id: string }) => {
      return prisma.portfolio.findUnique({
        where: { id },
        include: { positions: true, strategies: true },
      });
    },

    priceHistory: async (
      _: unknown,
      { asset, limit = 10 }: { asset: string; limit?: number }
    ) => {
      return prisma.priceEvent.findMany({
        where: { asset },
        orderBy: { timestamp: 'desc' },
        take: limit,
      });
    },

    latestPrice: async (_: unknown, { asset }: { asset: string }) => {
      return prisma.priceEvent.findFirst({
        where: { asset },
        orderBy: { timestamp: 'desc' },
      });
    },
  },

  Mutation: {
    createPortfolio: async (
      _: unknown,
      { input }: { input: { name: string; clientId: string; threshold?: number } }
    ) => {
      return prisma.portfolio.create({
        data: {
          name: input.name,
          clientId: input.clientId,
          threshold: input.threshold ?? 0.05,
        },
        include: { positions: true, strategies: true },
      });
    },

    addPosition: async (
      _: unknown,
      { input }: { input: { portfolioId: string; asset: string; quantity: number } }
    ) => {
      return prisma.position.create({
        data: {
          portfolioId: input.portfolioId,
          asset: input.asset,
          quantity: input.quantity,
        },
      });
    },

    setStrategy: async (
      _: unknown,
      { input }: { input: { portfolioId: string; asset: string; targetWeight: number } }
    ) => {
      const existing = await prisma.strategy.findFirst({
        where: {
          portfolioId: input.portfolioId,
          asset: input.asset,
        },
      });

      if (existing) {
        return prisma.strategy.update({
          where: { id: existing.id },
          data: { targetWeight: input.targetWeight },
        });
      }

      return prisma.strategy.create({
        data: {
          portfolioId: input.portfolioId,
          asset: input.asset,
          targetWeight: input.targetWeight,
        },
      });
    },
  },

  Portfolio: {
    positions: async (parent: { id: string }) => {
      return prisma.position.findMany({
        where: { portfolioId: parent.id },
      });
    },
    strategies: async (parent: { id: string }) => {
      return prisma.strategy.findMany({
        where: { portfolioId: parent.id },
      });
    },
  },
};
