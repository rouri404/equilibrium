CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE assets (
    ticker VARCHAR(20) PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    last_price DECIMAL(20, 8),
    last_updated TIMESTAMP WITH TIME ZONE
);

CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id),
    asset_ticker VARCHAR(20) REFERENCES assets(ticker),
    quantity DECIMAL(20, 8) NOT NULL,
    
    UNIQUE(portfolio_id, asset_ticker)
);

CREATE TABLE allocation_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id),
    asset_ticker VARCHAR(20) REFERENCES assets(ticker),
    target_percentage DECIMAL(5, 2) NOT NULL,

    CONSTRAINT valid_percentage CHECK (target_percentage > 0 AND target_percentage <= 100)
);