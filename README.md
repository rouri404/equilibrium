# 📊 Equilibrium — Rebalanceamento de Carteira em Tempo Real

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

**Equilibrium** é um motor de processamento de eventos de alta performance focado na gestão e rebalanceamento dinâmico de carteiras de ativos. O sistema monitora oscilações do mercado em tempo real e calcula automaticamente o desvio *(drift)* em relação às metas de alocação de cada investidor, sugerindo ou executando ajustes para manter a estratégia do portfólio intacta. Construído com uma arquitetura de microsserviços orientada a eventos, o projeto demonstra como lidar com fluxos massivos de dados financeiros garantindo consistência, baixa latência e escalabilidade na nuvem.

No mercado financeiro, a volatilidade dos ativos faz com que uma carteira perca sua diversificação planejada em questão de minutos. O rebalanceamento manual é lento e sujeito a erros. O **Equilibrium** automatiza esse processo através de um pipeline de dados reativo que identifica desvios e reage instantaneamente a cada mudança de preço.

## Arquitetura: Event Sourcing + CQRS

O sistema é projetado em torno dos padrões **Event Sourcing** e **CQRS**. A camada de ingestão utiliza um produtor Node.js que transmite dados de mercado em tempo real para tópicos Kafka, capturando cada mudança de preço como um evento imutável. Workers consumidores processam o drift da carteira, e quando o desvio excede o limiar definido, um evento `RebalanceTriggered` é emitido, acionando a cadeia de rebalanceamento. A interface é servida por Apollo Server (GraphQL) com WebSockets, permitindo atualizações em tempo real ao cliente no momento exato em que um drift é detectado, sem necessidade de polling.

## A Lógica de Drift

O motor calcula o peso real $W$ de um ativo $i$ em relação ao valor total da carteira $V_{total}$ para identificar o ajuste necessário:

$$W_{\text{real}} = \frac{\text{Quantidade}_i \times \text{Preço}_i}{\sum_{j=1}^{n} (\text{Quantidade}_j \times \text{Preço}_j)}$$

Se $|W_{\text{alvo}} - W_{\text{real}}| > \delta$, onde $\delta$ é o limiar definido pelo usuário, uma recomendação de rebalanceamento é gerada automaticamente.
