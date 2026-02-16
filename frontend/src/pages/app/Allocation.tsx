import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw, AlertCircle, CheckCircle, XCircle, ChevronRight, Settings } from "lucide-react";

interface AssetAllocation {
  symbol: string;
  name: string;
  target: number;
  current: number;
  color: string;
}

const initialAllocations: AssetAllocation[] = [
  { symbol: "BTC", name: "Bitcoin", target: 35, current: 35, color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", target: 25, current: 27, color: "#627eea" },
  { symbol: "SOL", name: "Solana", target: 15, current: 14, color: "#9945ff" },
  { symbol: "NVDA", name: "NVIDIA", target: 15, current: 14, color: "#76b900" },
  { symbol: "CASH", name: "Cash", target: 10, current: 10, color: "#14b8a6" },
];

const AllocationSlider = ({ asset, onChange, delay }: {
  asset: AssetAllocation;
  onChange: (symbol: string, value: number) => void;
  delay: number;
}) => {
  const diff = asset.target - asset.current;
  const needsRebalance = Math.abs(diff) > 2;
  const isOver = asset.target > asset.current;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative rounded-xl border border-border bg-card p-5 overflow-hidden group"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at 50% 0%, ${asset.color}15, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${asset.color}20` }}
            >
              <span className="text-sm font-bold" style={{ color: asset.color }}>
                {asset.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{asset.symbol}</div>
              <div className="text-xs text-muted-foreground">{asset.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{asset.target}%</div>
            <div className="text-xs text-muted-foreground">Current: {asset.current}%</div>
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={asset.target}
            onChange={(e) => onChange(asset.symbol, parseInt(e.target.value))}
            className="w-full h-2 bg-muted/30 rounded-full appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, ${asset.color} ${asset.target}%, hsl(215 20% 65% / 0.3) ${asset.target}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {needsRebalance && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium">
                Rebalance required: {diff > 0 ? "+" : ""}{diff.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-amber-400/70">
              {isOver ? "BUY" : "SELL"}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AllocationEditor = ({ allocations, onApply }: {
  allocations: AssetAllocation[];
  onApply: (allocations: AssetAllocation[]) => void;
}) => {
  const [jsonValue, setJsonValue] = useState(
    JSON.stringify(
      allocations.map((a) => ({ symbol: a.symbol, target: a.target })),
      null,
      2
    )
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        setError(null);
      } else {
        setError("Expected array");
      }
    } catch {
      setError("Invalid JSON");
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      const newAllocations = allocations.map((a) => {
        const update = parsed.find((p: { symbol: string }) => p.symbol === a.symbol);
        return update ? { ...a, target: update.target } : a;
      });
      onApply(newAllocations);
    } catch {
      // Invalid JSON
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative rounded-xl border border-border bg-card overflow-hidden group h-full"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.05), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">JSON Configuration</h3>
            <p className="text-sm text-muted-foreground">Edit allocation as JSON</p>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="relative flex-1">
          <textarea
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-80 p-4 bg-transparent text-sm font-mono text-foreground resize-none focus:outline-none"
            spellCheck={false}
          />
          {error && (
            <div className="absolute bottom-4 left-4 right-4 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 flex items-center gap-2">
              <XCircle className="w-3 h-3" />
              {error}
            </div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={handleApply}
            disabled={!!error}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-[#030712] text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Apply Configuration
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AllocationChart = ({ allocations }: { allocations: AssetAllocation[] }) => {
  const total = allocations.reduce((sum, a) => sum + a.target, 0);
  let currentAngle = 0;
  
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
          background: "radial-gradient(300px circle at 50% 30%, hsl(174 83% 50% / 0.08), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Allocation Preview</h3>
        <div className="flex items-center gap-8">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {allocations.map((asset, i) => {
                const startAngle = currentAngle;
                const angle = (asset.target / 100) * 360;
                currentAngle += angle;
                
                const startX = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                const startY = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                const endX = 50 + 40 * Math.cos((Math.PI * (startAngle + angle)) / 180);
                const endY = 50 + 40 * Math.sin((Math.PI * (startAngle + angle)) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                return (
                  <path
                    key={asset.symbol}
                    d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                    fill={asset.color}
                    opacity="0.8"
                    className="hover:opacity-100 transition-opacity cursor-pointer"
                  />
                );
              })}
              <circle cx="50" cy="50" r="25" fill="#0d2828" />
            </svg>
          </div>
          <div className="flex-1 space-y-3">
            {allocations.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: asset.color }}
                  />
                  <span className="text-sm text-foreground">{asset.symbol}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{asset.target}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Allocation() {
  const [allocations, setAllocations] = useState<AssetAllocation[]>(initialAllocations);

  const handleSliderChange = (symbol: string, value: number) => {
    setAllocations((prev) =>
      prev.map((a) => (a.symbol === symbol ? { ...a, target: value } : a))
    );
  };

  const handleApplyAllocations = (newAllocations: AssetAllocation[]) => {
    setAllocations(newAllocations);
  };

  const totalTarget = allocations.reduce((sum, a) => sum + a.target, 0);
  const totalDiff = totalTarget - 100;
  const isValid = totalTarget === 100;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Allocation</h1>
          <p className="text-sm text-muted-foreground">Configure your target portfolio allocation</p>
        </div>
        <div className="flex items-center gap-4">
          {!isValid && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">
                Total: {totalTarget}% ({totalDiff > 0 ? "+" : ""}{totalDiff}%)
              </span>
            </div>
          )}
          {isValid && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Valid allocation</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-[#030712] text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Rebalance
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Target Allocation
          </h2>
          {allocations.map((asset, i) => (
            <AllocationSlider
              key={asset.symbol}
              asset={asset}
              onChange={handleSliderChange}
              delay={i * 0.1}
            />
          ))}
        </div>

        <div className="space-y-4">
          <AllocationChart allocations={allocations} />
          <AllocationEditor
            allocations={allocations}
            onApply={handleApplyAllocations}
          />
        </div>
      </div>
    </div>
  );
}
