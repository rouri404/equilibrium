import { useState, useEffect } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import WireframeCube from "./WireframeCube";
import { useLang } from "@/hooks/useLang";

const typingPhrases = {
  en: [
    "Real-time portfolio rebalancing",
    "Event-driven architecture",
    "0ms latency processing",
    "Automated drift detection",
    "Dynamic asset allocation",
  ],
  pt: [
    "Rebalanceamento em tempo real",
    "Arquitetura orientada a eventos",
    "Processamento com latência 0ms",
    "Detecção automática de drift",
    "Alocação dinâmica de ativos",
  ],
};

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { lang } = useLang();
  const phrases = typingPhrases[lang];
  const command = "git clone https://github.com/rouri404/equilibrium.git";

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 bg-background">
      <div className="absolute inset-0 z-0">
        <WireframeCube />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
          AUTOMATED_PORTFOLIO
          <br />
          _ENGINE
          <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-blink" />
        </h1>

        <div className="h-8 mb-4">
          <span className="text-primary text-lg md:text-xl font-mono">
            {displayText}
            <span className="animate-blink">|</span>
          </span>
        </div>

        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-2 leading-relaxed">
          {lang === "en" 
            ? "High-performance event processing engine for dynamic portfolio rebalancing."
            : "Motor de processamento de eventos de alta performance para rebalanceamento dinâmico de portfólios."}
        </p>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          {lang === "en"
            ? "Monitors market oscillations in real-time and automatically calculates drift from allocation targets."
            : "Monitora oscilações do mercado em tempo real e calcula automaticamente o drift em relação às metas de alocação."}
        </p>

        <div className="inline-flex items-center gap-3 bg-card border border-border rounded-lg px-5 py-3 group hover:border-primary/50 transition-colors">
          <span className="text-primary text-sm">$</span>
          <code className="text-foreground text-sm">{command}</code>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-primary transition-colors ml-2"
            aria-label="Copy command"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-8">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-[#030712] font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_hsl(174_83%_50%/0.4)]"
          >
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
