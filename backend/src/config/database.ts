import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('🗄️  PostgreSQL connected'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
