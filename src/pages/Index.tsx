
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { IntegratedWithAI } from "@/components/landing/IntegratedWithAI";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <IntegratedWithAI />
      <Cta />
      <Footer />
    </div>
  );
};

export default Index;
