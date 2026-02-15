import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

const lines = {
  en: [
    { prefix: "[EQ-CORE]", text: " Initializing event stream...", delay: 0 },
    { prefix: "[EQ-CORE]", text: " Connected to BullMQ (Redis)", delay: 1500 },
    { prefix: "[EQ-CORE]", text: " BullMQ workers: 5 active", delay: 2500 },
    { prefix: "[EQ-API] ", text: " GraphQL server ready", delay: 3500 },
    { prefix: "[EQ-API] ", text: " WebSocket subscriptions enabled", delay: 4500 },
    { prefix: "[EQ-FE]  ", text: " Frontend UI loaded", delay: 5500 },
    { prefix: "[EQ-CORE]", text: " DRIFT_DETECTED...", delay: 6500, highlight: true },
    { prefix: "[EQ-CORE]", text: " Portfolio drift: 4.2% (threshold: 3%)", delay: 7500 },
    { prefix: "[EQ-CORE]", text: " Rebalance: SELL 0.4 BTC @ $67,432", delay: 8500 },
    { prefix: "[EQ-CORE]", text: " Rebalance: BUY 12.5 ETH @ $3,891", delay: 9500 },
    { prefix: "[EQ-API] ", text: " Broadcasting state update...", delay: 10500 },
    { prefix: "[EQ-API] ", text: " 47 clients notified ✓", delay: 11500 },
  ],
  pt: [
    { prefix: "[EQ-CORE]", text: " Inicializando stream de eventos...", delay: 0 },
    { prefix: "[EQ-CORE]", text: " Conectado ao BullMQ (Redis)", delay: 1500 },
    { prefix: "[EQ-CORE]", text: " Workers BullMQ: 5 ativos", delay: 2500 },
    { prefix: "[EQ-API] ", text: " Servidor GraphQL pronto", delay: 3500 },
    { prefix: "[EQ-API] ", text: " Subscrições WebSocket habilitadas", delay: 4500 },
    { prefix: "[EQ-FE]  ", text: " UI do Frontend carregada", delay: 5500 },
    { prefix: "[EQ-CORE]", text: " DRIFT_DETECTADO...", delay: 6500, highlight: true },
    { prefix: "[EQ-CORE]", text: " Drift do portfólio: 4.2% (limite: 3%)", delay: 7500 },
    { prefix: "[EQ-CORE]", text: " Rebalance: VENDER 0.4 BTC @ $67,432", delay: 8500 },
    { prefix: "[EQ-CORE]", text: " Rebalance: COMPRAR 12.5 ETH @ $3,891", delay: 9500 },
    { prefix: "[EQ-API] ", text: " Transmitindo atualização de estado...", delay: 10500 },
    { prefix: "[EQ-API] ", text: " 47 clientes notificados ✓", delay: 11500 },
  ],
};

const TerminalSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const { lang } = useLang();
  const currentLines = lines[lang];

  useEffect(() => {
    setVisibleLines(0);
    const timers = currentLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const resetTimer = setTimeout(() => {
      setVisibleLines(0);
      const restart = setTimeout(() => {
        currentLines.forEach((line, i) => {
          setTimeout(() => setVisibleLines(i + 1), line.delay);
        });
      }, 500);
      return () => clearTimeout(restart);
    }, 15000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, [lang]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-[hsl(0_70%_55%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45_80%_55%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(140_60%_45%)]" />
          <span className="text-xs text-muted-foreground ml-2">eq-core — terminal</span>
        </div>

        {/* Terminal body */}
        <div className="p-6 min-h-[320px] font-mono text-sm space-y-1">
          {currentLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex">
              <span className="text-primary">{line.prefix}</span>
              <span className={line.highlight ? "text-primary neon-text font-bold" : "text-muted-foreground"}>{line.text}</span>
            </div>
          ))}
          {visibleLines < currentLines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink" />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default TerminalSection;
