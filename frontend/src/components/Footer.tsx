import miniLogo from "@/assets/equilibrium_mini_logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={miniLogo} alt="EQ Logo" className="h-10 w-10" />
        <span className="text-foreground font-bold text-xl tracking-wider">Equilibrium</span>
      </div>
      <nav className="flex items-center gap-8">
        <a href="https://github.com/rouri404/equilibrium" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
          GitHub
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
          Docs
        </a>
        <span className="text-muted-foreground/50 text-xs">Apache 2.0</span>
      </nav>
    </div>
  </footer>
);

export default Footer;
