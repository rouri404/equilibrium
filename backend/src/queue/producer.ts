import { Queue, QueueOptions } from 'bullmq';

export const PRICE_QUEUE_NAME = 'price-events';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

const queueOptions: QueueOptions = {
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 500,
  },
};

export const priceQueue = new Queue(PRICE_QUEUE_NAME, queueOptions);

export interface PriceEventJob {
  asset: string;
  price: number;
  timestamp: number;
}

export async function addPriceEvent(data: PriceEventJob) {
  await priceQueue.add('price-update', data);
}
