import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Trash2, Download, Search, Filter, X, Zap } from "lucide-react";

interface LogEvent {
  id: string;
  timestamp: Date;
  level: "info" | "warn" | "error" | "success";
  source: string;
  message: string;
}

const mockEvents: LogEvent[] = [
  { id: "1", timestamp: new Date(), level: "info", source: "BullMQ", message: "Job queue initialized successfully" },
  { id: "2", timestamp: new Date(), level: "success", source: "Redis", message: "Connection established to cluster" },
  { id: "3", timestamp: new Date(), level: "info", source: "Portfolio", message: "Loading target allocation: BTC 35%, ETH 25%, SOL 15%, NVDA 15%, CASH 10%" },
  { id: "4", timestamp: new Date(), level: "info", source: "Rebalancer", message: "Calculating drift from target allocation" },
  { id: "5", timestamp: new Date(), level: "warn", source: "Portfolio", message: "ETH drift detected: current 27% vs target 25% (+2%)" },
  { id: "6", timestamp: new Date(), level: "info", source: "BullMQ", message: "Processing rebalance job #rebal-2024-001" },
  { id: "7", timestamp: new Date(), level: "success", source: "Broker", message: "SELL order placed: ETH 0.5 @ $2,820" },
  { id: "8", timestamp: new Date(), level: "success", source: "Broker", message: "BUY order placed: NVDA 2 @ $875" },
  { id: "9", timestamp: new Date(), level: "info", source: "Portfolio", message: "Portfolio rebalanced successfully" },
  { id: "10", timestamp: new Date(), level: "success", source: "Metrics", message: "Total return: +22.5% | Daily PnL: +$1,250" },
];

const levelColors = {
  info: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  warn: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  error: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  success: { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
};

const TerminalLine = ({ event, isNew }: { event: LogEvent; isNew: boolean }) => (
  <motion.div
    initial={isNew ? { opacity: 0, x: -20 } : false}
    animate={{ opacity: 1, x: 0 }}
    className={`flex items-start gap-3 px-3 py-1.5 hover:bg-white/5 ${levelColors[event.level].bg}`}
  >
    <span className="text-xs text-muted-foreground font-mono shrink-0 w-20">
      {event.timestamp.toLocaleTimeString("en-US", { hour12: false })}
    </span>
    <span className={`text-xs font-mono uppercase w-12 shrink-0 ${levelColors[event.level].text}`}>
      {event.level}
    </span>
    <span className="text-xs text-primary font-mono w-24 shrink-0 truncate">
      {event.source}:
    </span>
    <span className="text-xs text-foreground font-mono">
      {event.message}
    </span>
  </motion.div>
);

export default function LiveEvents() {
  const [events, setEvents] = useState<LogEvent[]>(mockEvents);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filter, setFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [newEventIds, setNewEventIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const sources = ["BullMQ", "Redis", "Portfolio", "Rebalancer", "Broker", "Metrics"];
      const messages = [
        "Processing job queue batch",
        "Checking market prices",
        "Updating portfolio metrics",
        "Syncing with exchange",
        "Calculating position sizes",
        "Validating orders",
        "Fetching latest prices from API",
        "Calculating portfolio drift",
        "Checking rebalance thresholds",
        "Updating position records",
      ];
      
      const newEvent: LogEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: Math.random() > 0.7 
          ? (Math.random() > 0.5 ? "warn" : "success") 
          : (Math.random() > 0.8 ? "error" : "info"),
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
      };

      setNewEventIds((prev) => new Set(prev).add(newEvent.id));
      setEvents((prev) => [...prev.slice(-100), newEvent]);
      
      setTimeout(() => {
        setNewEventIds((prev) => {
          const next = new Set(prev);
          next.delete(newEvent.id);
          return next;
        });
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [events]);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.message.toLowerCase().includes(filter.toLowerCase()) ||
      e.source.toLowerCase().includes(filter.toLowerCase());
    const matchesLevel = !levelFilter || e.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleClear = () => setEvents([]);
  const handleDownload = () => {
    const content = filteredEvents
      .map((e) => `[${e.timestamp.toISOString()}] [${e.level.toUpperCase()}] ${e.source}: ${e.message}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "equilibrium-events.log";
    a.click();
    URL.revokeObjectURL(url);
  };

  const eventCounts = {
    info: events.filter((e) => e.level === "info").length,
    warn: events.filter((e) => e.level === "warn").length,
    error: events.filter((e) => e.level === "error").length,
    success: events.filter((e) => e.level === "success").length,
  };

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-48px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Events</h1>
          <p className="text-sm text-muted-foreground">Real-time system event stream</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1 py-1 bg-[#0d2828] rounded-lg border border-border">
            {(["info", "warn", "error", "success"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(levelFilter === level ? null : level)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 ${
                  levelFilter === level
                    ? `${levelColors[level].bg} ${levelColors[level].text}`
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${levelColors[level].text.replace("text-", "bg-")}`} />
                {level.toUpperCase()}
                <span className="opacity-60">({eventCounts[level]})</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0d2828] border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
            isPlaying
              ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
              : "bg-green-500/10 border-green-500/30 text-green-400"
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm font-medium">{isPlaying ? "Pause" : "Resume"}</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0d2828] border border-border rounded-lg text-sm text-foreground hover:bg-white/5 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0d2828] border border-border rounded-lg text-sm text-foreground hover:bg-white/5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 bg-[#030b10] rounded-xl border border-border overflow-hidden flex flex-col"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#0d2828]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">equilibrium-events</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className={`w-3 h-3 ${isPlaying ? "text-green-400" : "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground">
                {isPlaying ? "Streaming" : "Paused"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {filteredEvents.length} events
            </div>
          </div>
        </div>
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto font-mono"
        >
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <TerminalLine 
                key={event.id} 
                event={event} 
                isNew={newEventIds.has(event.id)} 
              />
            ))}
          </AnimatePresence>
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Filter className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">No events to display</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
