const tickers = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "AAPL", name: "Apple", color: "#A2AAAD" },
  { symbol: "TSLA", name: "Tesla", color: "#CC0000" },
  { symbol: "NVDA", name: "NVIDIA", color: "#76B900" },
  { symbol: "SOL", name: "Solana", color: "#9945FF" },
  { symbol: "AVAX", name: "Avalanche", color: "#E84142" },
  { symbol: "LINK", name: "Chainlink", color: "#2A5ADA" },
  { symbol: "DOGE", name: "Dogecoin", color: "#C2A633" },
  { symbol: "XRP", name: "Ripple", color: "#00AAE4" },
];

const TickerItem = ({ symbol, name, color }: { symbol: string; name: string; color: string }) => (
  <div
    className="group flex items-center gap-3 px-8 opacity-30 hover:opacity-100 transition-all duration-300 cursor-default select-none"
    style={{ "--ticker-color": color } as React.CSSProperties}
  >
    <span
      className="text-lg font-bold text-muted-foreground group-hover:neon-text transition-all duration-300"
      style={{ color: undefined }}
    >
      <span className="group-hover:hidden">{symbol}</span>
      <span className="hidden group-hover:inline" style={{ color, textShadow: `0 0 15px ${color}80` }}>
        {symbol}
      </span>
    </span>
    <span className="text-xs text-muted-foreground/50">{name}</span>
  </div>
);

const AssetTicker = () => {
  const doubled = [...tickers, ...tickers];

  return (
    <div className="w-full border-y border-border/50 py-5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((t, i) => (
          <TickerItem key={`${t.symbol}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
};

export default AssetTicker;
