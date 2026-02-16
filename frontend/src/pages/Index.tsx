import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AssetTicker from "@/components/AssetTicker";
import AboutSection from "@/components/AboutSection";
import FeatureGrid from "@/components/FeatureGrid";
import TerminalSection from "@/components/TerminalSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AssetTicker />
        <AboutSection />
        <FeatureGrid />
        <TerminalSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
