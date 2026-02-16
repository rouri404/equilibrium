import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { Activity, TrendingUp, Zap, Shield } from "lucide-react";

const AboutSection = () => {
  const { lang } = useLang();

  const content = {
    en: {
      title: "ABOUT",
      subtitle: "Real-Time Portfolio Rebalancing Engine",
      description: [
        "Equilibrium is a high-performance event processing engine focused on dynamic portfolio rebalancing. The system monitors real-time market oscillations and automatically calculates drift from each investor's allocation targets.",
        "Different from traditional systems that run nightly batch jobs, Equilibrium operates in real-time. It ingests a continuous stream of market data and, millisecond by millisecond, recalculates each client's risk exposure.",
      ],
      features: [
        {
          icon: Zap,
          title: "0ms Latency",
          desc: "Process millions of events per second with sub-millisecond response time",
        },
        {
          icon: TrendingUp,
          title: "Automatic Rebalancing",
          desc: "Automatically detects drift and triggers rebalancing when threshold is exceeded",
        },
        {
          icon: Shield,
          title: "Precise Control",
          desc: "Configurable thresholds and constraints for each portfolio strategy",
        },
        {
          icon: Activity,
          title: "Real-Time Monitoring",
          desc: "Live price ingestion and portfolio state broadcast via WebSocket",
        },
      ],
    },
    pt: {
      title: "SOBRE",
      subtitle: "Motor de Rebalanceamento de Portfólio em Tempo Real",
      description: [
        "Equilibrium é um motor de processamento de eventos de alta performance focado no rebalanceamento dinâmico de portfólios. O sistema monitora oscilações do mercado em tempo real e calcula automaticamente o drift das metas de alocação de cada investidor.",
        "Diferente de sistemas tradicionais que rodam rotinas noturnas, Equilibrium opera em tempo real. Ele ingere um fluxo contínuo de dados de mercado e, milissegundo a milissegundo, recalcula a exposição a risco de cada cliente.",
      ],
      features: [
        {
          icon: Zap,
          title: "Latência 0ms",
          desc: "Processe milhões de eventos por segundo com tempo de resposta sub-milisegundos",
        },
        {
          icon: TrendingUp,
          title: "Rebalanceamento Automático",
          desc: "Detecta drift automaticamente e aciona rebalanceamento quando o limite é excedido",
        },
        {
          icon: Shield,
          title: "Controle Preciso",
          desc: "Thresholds e restrições configuráveis para cada estratégia de portfólio",
        },
        {
          icon: Activity,
          title: "Monitoramento em Tempo Real",
          desc: "Ingestão de preços ao vivo e transmissão de estado do portfólio via WebSocket",
        },
      ],
    },
  };

  const c = content[lang];

  return (
    <section className="border-t border-border/50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {"// " + c.title}
          </h2>
          <p className="text-primary text-lg mb-8">{c.subtitle}</p>
          <div className="max-w-3xl mx-auto space-y-4">
            {c.description.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all group"
            >
              <f.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
