import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Zap, RefreshCw, MoreHorizontal, ArrowUpRight, ArrowDownRight, Wallet, Clock, Target, BarChart3, Layers, FileText, CreditCard } from "lucide-react";

const mockEquityData = [
  { day: 1, value: 10000 },
  { day: 2, value: 10200 },
  { day: 3, value: 10150 },
  { day: 4, value: 10400 },
  { day: 5, value: 10650 },
  { day: 6, value: 10550 },
  { day: 7, value: 10800 },
  { day: 8, value: 11000 },
  { day: 9, value: 11200 },
  { day: 10, value: 11500 },
  { day: 11, value: 11350 },
  { day: 12, value: 11600 },
  { day: 13, value: 11800 },
  { day: 14, value: 12000 },
  { day: 15, value: 12250 },
];

const mockAssets = [
  { symbol: "BTC", name: "Bitcoin", allocation: 35, value: 42875, pnl: 1250, change: 3.2, avgPrice: 92000 },
  { symbol: "ETH", name: "Ethereum", allocation: 25, value: 30625, pnl: -420, change: -1.4, avgPrice: 2850 },
  { symbol: "SOL", name: "Solana", allocation: 15, value: 18375, pnl: 890, change: 5.1, avgPrice: 175 },
  { symbol: "NVDA", name: "NVIDIA", allocation: 15, value: 18375, pnl: 560, change: 2.8, avgPrice: 850 },
  { symbol: "CASH", name: "Cash", allocation: 10, value: 12250, pnl: 0, change: 0, avgPrice: 1 },
];

const mockTransactions = [
  { id: 1, type: "BUY", asset: "NVDA", amount: 2, price: 875, total: 1750, time: "2 min ago", status: "completed" },
  { id: 2, type: "SELL", asset: "ETH", amount: 0.5, price: 2820, total: 1410, time: "5 min ago", status: "completed" },
  { id: 3, type: "BUY", asset: "SOL", amount: 10, price: 185, total: 1850, time: "12 min ago", status: "completed" },
  { id: 4, type: "SELL", asset: "BTC", amount: 0.1, price: 98420, total: 9842, time: "1 hour ago", status: "completed" },
  { id: 5, type: "BUY", asset: "AAPL", amount: 5, price: 178, total: 890, time: "2 hours ago", status: "pending" },
];

const mockPendingOrders = [
  { id: 1, type: "BUY", asset: "ETH", amount: 1.2, price: 2750, total: 3300, status: "pending" },
  { id: 2, type: "SELL", asset: "SOL", amount: 5, price: 188, total: 940, status: "pending" },
];

const mockPerformance = [
  { label: "1D", value: "+0.95%", active: false },
  { label: "1W", value: "+3.2%", active: false },
  { label: "1M", value: "+8.7%", active: false },
  { label: "3M", value: "+15.4%", active: true },
  { label: "1Y", value: "+22.5%", active: false },
  { label: "ALL", value: "+22.5%", active: false },
];

const StatCard = ({ title, value, change, icon: Icon, positive, delay, subtitle }: {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  positive?: boolean;
  delay: number;
  subtitle?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative rounded-xl border border-border bg-card p-5 overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(300px circle at 50% 0%, hsl(174 83% 50% / 0.12), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{title}</span>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      {change && (
        <div className={`flex items-center gap-1.5 text-sm ${positive ? "text-green-400" : "text-red-400"}`}>
          {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="font-medium">{change}</span>
        </div>
      )}
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </div>
  </motion.div>
);

const EquityCurve = () => {
  const maxValue = Math.max(...mockEquityData.map((d) => d.value));
  const minValue = Math.min(...mockEquityData.map((d) => d.value));
  const range = maxValue - minValue;

  const points = mockEquityData
    .map((d, i) => {
      const x = (i / (mockEquityData.length - 1)) * 100;
      const y = 100 - ((d.value - minValue) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl border border-border bg-card p-6 overflow-hidden group"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at 50% 30%, hsl(174 83% 50% / 0.08), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Equity Curve</h3>
            <p className="text-sm text-muted-foreground">Portfolio value over time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-muted/30 rounded-lg p-1">
              {mockPerformance.map((p) => (
                <button
                  key={p.label}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    p.active
                      ? "bg-primary text-[#030712]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="equityGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#14b8a2" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="hsl(215 20% 65% / 0.1)"
                strokeWidth="0.2"
              />
            ))}
            <polygon
              points={`0,100 ${points} 100`}
              fill="url(#equityGradient2)"
            />
            <polyline
              points={points}
              fill="none"
              stroke="#14b8a6"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-sm font-medium text-green-400">+22.5%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DriftGauge = () => {
  const drift = 2.3;
  const maxDrift = 10;
  const isHealthy = Math.abs(drift) <= 5;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative rounded-xl border border-border bg-card p-6 overflow-hidden group"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.08), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Portfolio Drift</h3>
            <p className="text-sm text-muted-foreground">Target deviation</p>
          </div>
          <div className={`p-2 rounded-lg ${isHealthy ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <Activity className={`w-4 h-4 ${isHealthy ? "text-green-400" : "text-red-400"}`} />
          </div>
        </div>
        <div className="relative h-36 flex items-center justify-center">
          <svg className="w-full h-full absolute" viewBox="0 0 100 60">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="hsl(215 20% 65% / 0.15)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke={isHealthy ? "#14b8a6" : "#ef4444"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${((drift + maxDrift) / (maxDrift * 2)) * 126} 126`}
            />
          </svg>
          <div className="text-center -mt-2">
            <div className="text-4xl font-bold text-foreground">{drift}%</div>
            <div className="text-sm text-muted-foreground">deviation</div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>-10%</span>
          <span>0%</span>
          <span>+10%</span>
        </div>
      </div>
    </motion.div>
  );
};

const AllocationBreakdown = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.35 }}
    className="relative rounded-xl border border-border bg-card p-6 overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.08), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <h3 className="text-lg font-semibold text-foreground mb-4">Allocation Breakdown</h3>
      <div className="space-y-3">
        {mockAssets.map((asset) => (
          <div key={asset.symbol} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{asset.symbol}</span>
                <span className="text-sm text-muted-foreground">{asset.allocation}%</span>
              </div>
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${asset.allocation}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const AssetsTable = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="relative rounded-xl border border-border bg-card overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(400px circle at 50% 30%, hsl(174 83% 50% / 0.05), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Holdings</h3>
          <p className="text-sm text-muted-foreground">Current asset allocation</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {mockAssets.map((asset, index) => (
          <motion.div
            key={asset.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{asset.symbol}</div>
                <div className="text-xs text-muted-foreground">{asset.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">${asset.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{asset.allocation}%</div>
              </div>
              <div className="w-32">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Target</span>
                  <span className="text-foreground">{asset.allocation}%</span>
                </div>
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${asset.allocation}%` }}
                  />
                </div>
              </div>
              <div className="text-right w-20">
                <div className={`text-sm font-medium ${asset.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {asset.pnl >= 0 ? "+" : ""}${asset.pnl}
                </div>
                <div className={`text-xs ${asset.change >= 0 ? "text-green-400/70" : "text-red-400/70"}`}>
                  {asset.change >= 0 ? "+" : ""}{asset.change}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const RecentTransactions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="relative rounded-xl border border-border bg-card overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.05), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Trades</h3>
          <p className="text-sm text-muted-foreground">Latest executed orders</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {mockTransactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${tx.type === "BUY" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                {tx.type === "BUY" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {tx.type} {tx.asset}
                </div>
                <div className="text-xs text-muted-foreground">{tx.amount} @ ${tx.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">${tx.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{tx.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const PendingOrders = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.55 }}
    className="relative rounded-xl border border-border bg-card overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.05), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Pending Orders</h3>
          <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">2</span>
        </div>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="divide-y divide-border/50">
        {mockPendingOrders.map((order, index) => (
          <div
            key={order.id}
            className="flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${order.type === "BUY" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                {order.type === "BUY" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {order.type} {order.asset}
                </div>
                <div className="text-xs text-muted-foreground">{order.amount} @ ${order.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded">
              Pending
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Portfolio overview and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Rebalancing Active</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Value"
          value="$132,500"
          change="+$2,280 (+1.75%)"
          icon={DollarSign}
          positive
          delay={0}
          subtitle="≈ 3.2 BTC"
        />
        <StatCard
          title="Today's PnL"
          value="+$1,250"
          change="+0.95%"
          icon={TrendingUp}
          positive
          delay={0.05}
          subtitle="Best: SOL +5.1%"
        />
        <StatCard
          title="Target Drift"
          value="2.3%"
          change="-1.2% (healthy)"
          icon={Target}
          positive
          delay={0.1}
          subtitle="Threshold: 5%"
        />
        <StatCard
          title="Total Return"
          value="+22.5%"
          change="+$24,500"
          icon={BarChart3}
          positive
          delay={0.15}
          subtitle="Since inception"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <EquityCurve />
        </div>
        <div className="space-y-4">
          <DriftGauge />
          <AllocationBreakdown />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AssetsTable />
        <div className="space-y-4">
          <RecentTransactions />
          <PendingOrders />
        </div>
      </div>
    </div>
  );
}
