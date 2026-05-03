import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2, // Smooth interpolation
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] origin-left">
      <div 
        ref={progressRef}
        className="h-full bg-accent-gold w-full scale-x-0 origin-left"
        style={{
          boxShadow: '0 0 10px var(--accent-gold)'
        }}
      />
    </div>
  );
}
