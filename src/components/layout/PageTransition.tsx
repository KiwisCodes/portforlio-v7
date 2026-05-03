import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function PageTransition({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    // Start with overlay covering, and content hidden
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power3.inOut",
      delay: 0.1
    })
    .fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", clearProps: "all" },
      "-=0.5"
    );

  }, []);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[999] bg-bg-primary pointer-events-none origin-bottom h-screen w-screen flex items-center justify-center"
      >
        <span className="text-accent-gold font-display text-2xl tracking-widest animate-pulse">HUNG</span>
      </div>
      <div ref={containerRef}>
        {children}
      </div>
    </>
  );
}
