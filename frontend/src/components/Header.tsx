import miniLogo from "@/assets/equilibrium_mini_logo.png";
import { useLang } from "@/hooks/useLang";

const Header = () => {
  const { lang, setLang } = useLang();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={miniLogo} alt="EQ Logo" className="h-10 w-10" />
          <span className="text-foreground font-bold text-xl tracking-wider">Equilibrium</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="https://github.com/rouri404/equilibrium" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Docs
          </a>
          <a href="https://github.com/rouri404/equilibrium" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            GitHub
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            Live Demo
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono border border-border rounded px-2 py-0.5"
          >
            {lang.toUpperCase()}
          </button>
          <span className="text-xs text-muted-foreground font-mono border border-border rounded px-2 py-0.5">v1.0.0</span>
          <span className="text-xs text-primary neon-text">[STABLE]</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
