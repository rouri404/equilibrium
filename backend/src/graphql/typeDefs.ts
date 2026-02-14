export const typeDefs = `#graphql
  type Portfolio {
    id: ID!
    name: String!
    clientId: String!
    threshold: Float!
    createdAt: String!
    updatedAt: String!
    positions: [Position!]!
    strategies: [Strategy!]!
  }

  type Position {
    id: ID!
    asset: String!
    quantity: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Strategy {
    id: ID!
    asset: String!
    targetWeight: Float!
    createdAt: String!
    updatedAt: String!
  }

  type PriceEvent {
    id: ID!
    asset: String!
    price: Float!
    timestamp: String!
  }

  type Query {
    portfolios: [Portfolio!]!
    portfolio(id: ID!): Portfolio
    priceHistory(asset: String!, limit: Int): [PriceEvent!]!
    latestPrice(asset: String!): PriceEvent
  }

  input CreatePortfolioInput {
    name: String!
    clientId: String!
    threshold: Float
  }

  input AddPositionInput {
    portfolioId: ID!
    asset: String!
    quantity: Float!
  }

  input SetStrategyInput {
    portfolioId: ID!
    asset: String!
    targetWeight: Float!
  }

  type Mutation {
    createPortfolio(input: CreatePortfolioInput!): Portfolio!
    addPosition(input: AddPositionInput!): Position!
    setStrategy(input: SetStrategyInput!): Strategy!
  }
`;
