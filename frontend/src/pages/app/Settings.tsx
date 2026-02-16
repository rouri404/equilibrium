import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Key, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const translations = {
  en: {
    settings: "Settings",
    description: "Configure your application preferences",
    general: "General",
    notifications: "Notifications",
    security: "Security",
    api: "API Configuration",
    appearance: "Appearance",
    language: "Language",
    languageDesc: "Select your preferred language",
    email: "Email Notifications",
    emailDesc: "Receive email alerts for rebalancing events",
    push: "Push Notifications",
    pushDesc: "Enable browser push notifications",
    drift: "Drift Threshold",
    driftDesc: "Alert when portfolio drift exceeds this percentage",
    autoRebalance: "Auto Rebalance",
    autoRebalanceDesc: "Automatically rebalance when threshold is exceeded",
    twoFactor: "Two-Factor Authentication",
    twoFactorDesc: "Add an extra layer of security to your account",
    apiKey: "API Key",
    apiKeyDesc: "Your API key for external integrations",
    webhook: "Webhook URL",
    webhookDesc: "URL to receive event notifications",
    theme: "Theme",
    themeDesc: "Choose your preferred color scheme",
    saved: "Settings saved successfully",
  },
  pt: {
    settings: "Configurações",
    description: "Configure suas preferências do aplicativo",
    general: "Geral",
    notifications: "Notificações",
    security: "Segurança",
    api: "Configuração de API",
    appearance: "Aparência",
    language: "Idioma",
    languageDesc: "Selecione seu idioma preferido",
    email: "Notificações por Email",
    emailDesc: "Receba alertas por email para eventos de rebalanceamento",
    push: "Notificações Push",
    pushDesc: "Ativar notificações push no navegador",
    drift: "Limite de Drift",
    driftDesc: "Alertar quando o drift do portfólio exceder esta percentagem",
    autoRebalance: "Rebalanceamento Automático",
    autoRebalanceDesc: "Rebalancear automaticamente quando o limite for excedido",
    twoFactor: "Autenticação de Dois Fatores",
    twoFactorDesc: "Adicione uma camada extra de segurança à sua conta",
    apiKey: "Chave de API",
    apiKeyDesc: "Sua chave de API para integrações externas",
    webhook: "URL do Webhook",
    webhookDesc: "URL para receber notificações de eventos",
    theme: "Tema",
    themeDesc: "Escolha seu esquema de cores preferido",
    saved: "Configurações salvas com sucesso",
  },
};

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-6 rounded-full transition-colors ${
      enabled ? "bg-primary" : "bg-muted/50"
    }`}
  >
    <motion.div
      animate={{ x: enabled ? 26 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
    />
  </button>
);

interface SettingSectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const SettingSection = ({ icon: Icon, title, children, delay = 0 }: SettingSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative rounded-xl border border-border bg-card overflow-hidden group"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(300px circle at 50% 0%, hsl(174 83% 50% / 0.08), transparent 70%)",
      }}
    />
    <div className="relative z-10">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5 space-y-5">
        {children}
      </div>
    </div>
  </motion.div>
);

interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const SettingRow = ({ label, description, children }: SettingRowProps) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
    {children}
  </div>
);

export default function Settings() {
  const { lang, setLang } = useLang();
  const t = translations[lang];
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    driftThreshold: 5,
    autoRebalance: false,
    twoFactor: false,
  });
  
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.settings}</h1>
          <p className="text-sm text-muted-foreground">{t.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              {t.saved}
            </motion.div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-[#030712] text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>

      <div className="space-y-6">
        <SettingSection icon={Globe} title={t.general} delay={0}>
          <SettingRow label={t.language} description={t.languageDesc}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  lang === "en"
                    ? "bg-primary text-[#030712] border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("pt")}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  lang === "pt"
                    ? "bg-primary text-[#030712] border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Português
              </button>
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Bell} title={t.notifications} delay={0.1}>
          <SettingRow label={t.email} description={t.emailDesc}>
            <Toggle
              enabled={settings.emailNotifications}
              onChange={(v) => setSettings({ ...settings, emailNotifications: v })}
            />
          </SettingRow>
          <SettingRow label={t.push} description={t.pushDesc}>
            <Toggle
              enabled={settings.pushNotifications}
              onChange={(v) => setSettings({ ...settings, pushNotifications: v })}
            />
          </SettingRow>
          <SettingRow label={t.drift} description={t.driftDesc}>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="20"
                value={settings.driftThreshold}
                onChange={(e) => setSettings({ ...settings, driftThreshold: parseInt(e.target.value) })}
                className="w-24 h-2 bg-muted/30 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-medium text-foreground w-8">{settings.driftThreshold}%</span>
            </div>
          </SettingRow>
          <SettingRow label={t.autoRebalance} description={t.autoRebalanceDesc}>
            <Toggle
              enabled={settings.autoRebalance}
              onChange={(v) => setSettings({ ...settings, autoRebalance: v })}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Shield} title={t.security} delay={0.2}>
          <SettingRow label={t.twoFactor} description={t.twoFactorDesc}>
            <Toggle
              enabled={settings.twoFactor}
              onChange={(v) => setSettings({ ...settings, twoFactor: v })}
            />
          </SettingRow>
          <SettingRow label={t.apiKey} description={t.apiKeyDesc}>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value="eq_live_xxxxxxxxxxxxxxxxxxxx"
                readOnly
                className="w-64 px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm text-muted-foreground"
              />
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Database} title={t.api} delay={0.3}>
          <SettingRow label={t.webhook} description={t.webhookDesc}>
            <input
              type="text"
              placeholder="https://your-webhook-url.com/events"
              className="w-80 px-3 py-2 bg-muted/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Palette} title={t.appearance} delay={0.4}>
          <SettingRow label={t.theme} description={t.themeDesc}>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm rounded-lg border border-primary bg-primary/10 text-primary">
                Teal (Default)
              </button>
              <button className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors">
                Dark
              </button>
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    </div>
  );
}
