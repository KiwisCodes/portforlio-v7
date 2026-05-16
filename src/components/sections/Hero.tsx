import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitChars } from '../animations/SplitChars';
import { FadeUp } from '../animations/FadeUp';
import { MagneticButton } from '../animations/MagneticButton';
import { ArrowDown, FileText } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll indicator bounce
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.5
      });
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Text */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-12 lg:pt-0">
          <div className="overflow-hidden mb-4">
            <h2 className="text-xl md:text-2xl font-light text-text-secondary tracking-widest uppercase">
              <SplitChars text="Hello, I'm" delay={1.5} />
            </h2>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-semibold tracking-tight mb-8">
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2">
              <SplitChars text="Thanh Hung" delay={1.8} />
            </span>
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2 mt-[-1.5rem]">
              <SplitChars text="Phan" delay={2.1} />
            </span>
          </h1>
          
          <FadeUp delay={2.4}>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-12 leading-relaxed">
              CS & Engineering Student @ Vietnamese-German Univ. <br />
              Building scalable system architectures & polished frontends.
            </p>
          </FadeUp>

          <FadeUp delay={2.6} className="flex flex-wrap items-center gap-6 mb-16">
            <MagneticButton className="bg-text-primary text-bg-primary hover:bg-accent-gold" strength={30}>
              <a href="#projects" className="flex items-center gap-2 font-medium text-inherit">
                View My Work <ArrowDown className="w-4 h-4" />
              </a>
            </MagneticButton>
            <MagneticButton className="border border-border hover:bg-bg-tertiary" strength={20}>
              <button 
                onClick={onOpenResume}
                className="flex items-center gap-2 font-medium text-inherit cursor-pointer"
              >
                Resume <FileText className="w-4 h-4" />
              </button>
            </MagneticButton>
          </FadeUp>

          {/* Badges */}
          <FadeUp delay={2.8} className="flex flex-wrap gap-3">
            {['Java', 'React', 'Spring Boot', 'Python', 'TypeScript'].map(tech => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-border text-xs font-mono tracking-wide text-text-secondary">
                {tech}
              </span>
            ))}
          </FadeUp>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <FadeUp delay={1.5} className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-square overflow-hidden rounded-full border border-border/20 group">
            <img 
              ref={imgRef}
              src="/pth-office-upscaled.jpg" 
              alt="Thanh Hung Phan" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 z-10"
              data-cursor="view"
              onError={(e) => {
                // Fallback while the user uploads their image
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                e.currentTarget.onerror = null;
              }}
            />
          </FadeUp>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-tertiary"
      >
        <ArrowDown className="w-6 h-6 opacity-50" />
      </div>
    </section>
  );
}
