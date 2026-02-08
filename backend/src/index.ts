import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const typeDefs = `#graphql
  type Query {
    systemStatus: String
  }
`;

const resolvers = {
  Query: {
    systemStatus: () => 'EQ System: Online & Stable 🚀',
  },
};

interface MyContext {
  token?: String;
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`
  🚀 EQ Rebalancer Engine Ready
  --------------------------------------
  📡 Endpoint:  http://localhost:${PORT}/graphql
  ⭐️ Status:    WAITING FOR EVENTS
  --------------------------------------
  `);
}

startServer().catch((err) => {
  console.error("FATAL ERROR: Failed to start server", err);
  process.exit(1);
});