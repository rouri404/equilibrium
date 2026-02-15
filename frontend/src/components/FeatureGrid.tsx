import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, Container, Radio } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const features = {
  en: [
    {
      icon: Activity,
      title: "BullMQ Queue",
      desc: "Ingest millions of price events per second with fault-tolerant stream processing.",
    },
    {
      icon: BarChart3,
      title: "Drift Calculation",
      desc: "Precision rebalancing logic with configurable drift thresholds and constraints.",
    },
    {
      icon: Container,
      title: "Infrastructure as Code",
      desc: "Deploy the entire stack with Terraform and Docker. One command.",
    },
    {
      icon: Radio,
      title: "WebSocket API",
      desc: "Real-time broadcast of portfolio state to all connected clients.",
    },
  ],
  pt: [
    {
      icon: Activity,
      title: "Fila BullMQ",
      desc: "Ingestão de milhões de eventos de preço por segundo com processamento de stream tolerante a falhas.",
    },
    {
      icon: BarChart3,
      title: "Cálculo de Drift",
      desc: "Lógica de rebalanceamento de precisão com thresholds e restrições de drift configuráveis.",
    },
    {
      icon: Container,
      title: "Infraestrutura como Código",
      desc: "Implante toda a stack com Terraform e Docker. Um comando.",
    },
    {
      icon: Radio,
      title: "API WebSocket",
      desc: "Transmissão em tempo real do estado do portfólio para todos os clientes conectados.",
    },
  ],
};

const SpotlightCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl border border-border bg-card p-8 overflow-hidden group"
    >
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, hsl(174 83% 50% / 0.12), transparent 70%)`,
          }}
        />
      )}
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-xl"
          style={{
            mask: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 70%)`,
            WebkitMask: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, black 0%, transparent 70%)`,
            border: "1px solid hsl(174 83% 50% / 0.6)",
          }}
        />
      )}
      <div className="relative z-10">
        <Icon className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-foreground font-bold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

const FeatureGrid = () => {
  const { lang } = useLang();
  const currentFeatures = features[lang];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-foreground text-center mb-16"
      >
        {"// CORE_MODULES"}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentFeatures.map((f) => (
          <SpotlightCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
