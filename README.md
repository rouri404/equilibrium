# Equilibrium Rebalancer

<p align="center">
  <a>
    <img src="./assets/equilibrium_logo.png" alt="Equilibrium" width="500px"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/rouri404/equilibrium/stargazers">
    <img src="https://img.shields.io/github/stars/rouri404/equilibrium?color=60B4FF&logo=github&style=flat" alt="GitHub Stars">
  </a>
  <a href="https://github.com/rouri404/equilibrium/forks">
    <img src="https://img.shields.io/github/forks/rouri404/equilibrium?color=60B4FF&logo=github&style=flat" alt="GitHub Forks">
  </a>
</p>

---

## Sobre

Equilibrium é um motor de processamento de eventos de alta performance focado na gestão e rebalanceamento dinâmico de carteiras de ativos. O sistema monitora oscilações do mercado em tempo real e calcula automaticamente o desvio (drift) em relação às metas de alocação de cada investidor, sugerindo ou executando ajustes para manter a estratégia do portfólio intacta.

Diferente de sistemas tradicionais que rodam rotinas noturnas (batch jobs) para verificar carteiras de investimento, o Equilibrium opera em tempo real. Ele ingere um fluxo contínuo de dados de mercado (cotações de ativos) e, milissegundo a milissegundo, recalcula a exposição de risco de cada cliente. Se a carteira desviar (drift) da estratégia definida, o sistema dispara instantaneamente um evento de rebalanceamento.

## Stack

- **Runtime**: Node.js 24 LTS
- **API**: GraphQL (Apollo Server)
- **Message Queue**: Redis + BullMQ
- **Database**: PostgreSQL + Prisma
- **Container**: Docker + Docker Compose

## Arquitetura

O sistema utiliza uma arquitetura orientada a eventos:

1. **Ingestão**: Eventos de preço são enviados para uma fila BullMQ
2. **Processamento**: Workers consomem os eventos e calculam o drift de cada portfólio
3. **API**: GraphQL expõe queries e mutations para gestão de portfólios, posições e estratégias
4. **Persistência**: PostgreSQL armazena portfólios, posições, estratégias e histórico de preços

### Lógica de Drift

O motor calcula o peso real de um ativo em relação ao valor total da carteira:

$$W_{\text{real}} = \frac{\text{Quantidade}_i \times \text{Preço}_i}{\sum_{j=1}^{n} (\text{Quantidade}_j \times \text{Preço}_j)}$$

Se $|W_{\text{alvo}} - W_{\text{real}}| > \delta$, onde $\delta$ é o limiar definido pelo usuário, uma recomendação de rebalanceamento é gerada automaticamente.

## Funcionalidades

- **Gestão de Portfólio**: Criação e administração de portfólios de investimento
- **Definição de Estratégia**: Configuração de alocação alvo por ativo (ex: 30% AAPL, 20% GOOGL)
- **Monitoramento de Preços em Tempo Real**: Ingestão de preços via fila BullMQ
- **Detecção de Drift**: Cálculo automático de desvio entre alocação real e alvo
- **Histórico de Preços**: Armazenamento e consulta de preços históricos

## Quick Start

### Pré-requisitos

- Node.js 24 LTS
- Docker e Docker Compose
- Yarn

### Executando com Docker

```bash
# Subir serviços (PostgreSQL + Redis)
docker-compose up -d

# Instalar dependências
cd backend
yarn install

# Gerar cliente Prisma e criar tabelas
yarn prisma generate
yarn prisma db push

# Iniciar servidor de desenvolvimento
yarn dev
```

A API estará disponível em `http://localhost:4000/graphql`

### Variáveis de Ambiente

Crie um arquivo `.env` em `backend/.env`:

```
PORT=4000
REDIS_HOST=localhost
REDIS_PORT=6379
DATABASE_URL="postgresql://admin:password@localhost:5432/equilibrium_db?schema=public"
```

## GraphQL API

<details>
<summary>Clique para expandir</summary>

### Queries

```graphql
# Listar todos os portfólios
query {
  portfolios {
    id
    name
    clientId
    threshold
    positions {
      asset
      quantity
    }
    strategies {
      asset
      targetWeight
    }
  }
}

# Buscar portfólio por ID
query {
  portfolio(id: "uuid-aqui") {
    id
    name
    threshold
  }
}

# Histórico de preços de um ativo
query {
  priceHistory(asset: "AAPL", limit: 10) {
    price
    timestamp
  }
}

# Último preço de um ativo
query {
  latestPrice(asset: "AAPL") {
    price
    timestamp
  }
}
```

### Mutations

```graphql
# Criar portfólio
mutation {
  createPortfolio(input: {
    name: "Meu Portfólio"
    clientId: "client-001"
    threshold: 0.05
  }) {
    id
    name
    threshold
  }
}

# Adicionar posição
mutation {
  addPosition(input: {
    portfolioId: "uuid-aqui"
    asset: "AAPL"
    quantity: 100
  }) {
    id
    asset
    quantity
  }
}

# Definir estratégia (alocação alvo)
mutation {
  setStrategy(input: {
    portfolioId: "uuid-aqui"
    asset: "AAPL"
    targetWeight: 0.3
  }) {
    id
    asset
    targetWeight
  }
}
```

### Enviando Eventos de Preço

```javascript
const { addPriceEvent } = require('./dist/queue/producer');

await addPriceEvent({
  asset: 'AAPL',
  price: 180.50,
  timestamp: Date.now()
});
```

</details>

## Funcionalidades Futuras

- Interface Web em React para visualização de portfólios e monitoramentos de drifts
- CLI para interação programática
- Módulo de execução de ordens (integração com brokers)
- Módulo de backtesting
