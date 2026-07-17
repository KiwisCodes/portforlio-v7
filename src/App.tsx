import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { Hero } from './components/sections/Hero';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ResumeModal } from './components/ui/ResumeModal';
import { useState, lazy, Suspense } from 'react';

// Lazy load below-the-fold sections — only Hero loads on first paint
const About     = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const Experience = lazy(() => import('./components/sections/Experience').then(m => ({ default: m.Experience })));
const Projects  = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Skills    = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })));
const Education = lazy(() => import('./components/sections/Education').then(m => ({ default: m.Education })));
const Contact   = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

// Thin skeleton so layout doesn't jump while section JS loads
const SectionSkeleton = () => <div className="py-32" />;

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      {/* Removed custom cursor for native browser speed */}
      <NoiseOverlay />
      <ScrollProgress />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumeUrl="/resume.pdf" 
      />
      
      <PageTransition>
        <div className="relative z-10 bg-bg-primary transition-colors duration-300 pointer-events-auto">
          <Navbar />
          
          <main>
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <Suspense fallback={<SectionSkeleton />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <Contact />
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </PageTransition>
    </>
  );
}
