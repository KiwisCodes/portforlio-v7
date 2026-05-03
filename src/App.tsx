import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { useEffect, useState } from 'react';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Removed custom cursor for native browser speed */}
      <NoiseOverlay />
      <ScrollProgress />
      
      <PageTransition>
        <div className="relative z-10 bg-bg-primary transition-colors duration-300 pointer-events-auto">
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
