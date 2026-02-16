import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, PieChart, Terminal, Settings, User, Bell, Search, HelpCircle, TrendingUp, Wallet, Activity } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/app", labelEn: "Overview", labelPt: "Visão Geral" },
  { icon: PieChart, label: "Allocation", path: "/app/allocation", labelEn: "Allocation", labelPt: "Alocação" },
  { icon: Terminal, label: "Live Events", path: "/app/events", labelEn: "Live Events", labelPt: "Eventos ao Vivo" },
  { icon: Settings, label: "Settings", path: "/app/settings", labelEn: "Settings", labelPt: "Configurações" },
];

const AppSidebar = () => {
  const location = useLocation();
  const { lang } = useLang();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a1f1f] border-r border-border flex flex-col z-50">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/equilibrium_mini_logo.png" 
            alt="Equilibrium" 
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <span className="text-foreground font-bold text-lg">Equilibrium</span>
            <span className="text-[10px] text-muted-foreground block">Portfolio Engine</span>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-2 px-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Menu</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{lang === "en" ? item.labelEn : item.labelPt}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0d2828] border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">Demo User</div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const AppTopBar = () => {
  const [ticker, setTicker] = useState("");
  const { lang } = useLang();
  const prices = [
    { symbol: "BTC", price: "98,420", change: "+2.1%" },
    { symbol: "ETH", price: "2,800", change: "-1.2%" },
    { symbol: "SOL", price: "185", change: "+5.4%" },
    { symbol: "AAPL", price: "178", change: "+0.8%" },
    { symbol: "NVDA", price: "875", change: "+3.2%" },
    { symbol: "GOOGL", price: "142", change: "+1.1%" },
    { symbol: "AMZN", price: "178", change: "-0.5%" },
    { symbol: "MSFT", price: "378", change: "+1.8%" },
  ];

  useEffect(() => {
    const tickerStr = prices
      .map((p) => `${p.symbol}: $${p.price} (${p.change})`)
      .join("  |  ");
    setTicker(tickerStr + "  |  " + tickerStr);
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#0a1f1f]/80 backdrop-blur-sm border-b border-border z-40 flex items-center px-6 gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={lang === "en" ? "Search assets, transactions..." : "Pesquisar ativos, transações..."}
          className="w-full pl-10 pr-4 py-2 bg-[#0d2828] border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="overflow-hidden flex-1 rounded-lg">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs text-muted-foreground font-mono">
            {ticker}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export { AppSidebar, AppTopBar };
