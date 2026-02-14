import { Worker, Job } from 'bullmq';
import { prisma } from '../config/database';
import { PriceEventJob } from './producer';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

export const worker = new Worker<PriceEventJob>(
  'price-events',
  async (job: Job<PriceEventJob>) => {
    const { asset, price, timestamp } = job.data;

    await prisma.priceEvent.create({
      data: {
        asset,
        price,
        timestamp: new Date(timestamp),
      },
    });

    const portfolios = await prisma.portfolio.findMany({
      include: {
        positions: true,
        strategies: {
          where: { asset },
        },
      },
    });

    for (const portfolio of portfolios) {
      const strategy = portfolio.strategies[0];
      if (!strategy) continue;

      const totalValue = await calculatePortfolioValue(portfolio.id);
      const position = portfolio.positions.find((p) => p.asset === asset);
      const currentWeight = position
        ? (position.quantity * price) / totalValue
        : 0;

      const drift = Math.abs(strategy.targetWeight - currentWeight);

      if (drift > portfolio.threshold) {
        console.log(
          `⚠️  Drift detected on portfolio ${portfolio.id}: ${(drift * 100).toFixed(2)}% (threshold: ${(portfolio.threshold * 100).toFixed(2)}%)`
        );
      }
    }
  },
  {
    connection,
    concurrency: 10,
  }
);

async function calculatePortfolioValue(portfolioId: string): Promise<number> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: portfolioId },
    include: {
      positions: true,
    },
  });

  if (!portfolio) return 0;

  let total = 0;
  for (const position of portfolio.positions) {
    const latestPrice = await prisma.priceEvent.findFirst({
      where: { asset: position.asset },
      orderBy: { timestamp: 'desc' },
    });
    if (latestPrice) {
      total += position.quantity * latestPrice.price;
    }
  }
  return total;
}

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
