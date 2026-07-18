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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll indicator bounce animation
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
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* ── Hero Background ─────────────────────────────────────────────────── */}
      {/* Full-bleed portrait: left side blurred+darkened/whitened, right clear */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">

        {/* Base image — zoomed out slightly, no filters applied directly */}
        <img
          src="/hungfinal1.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] scale-[0.92] origin-center"
        />

        {/*
          LEFT PANEL: blur + slight darken/lighten blending.
          backdrop-filter blurs whatever is beneath it (the image).
          Mask = hard left, soft feather rightward ~58%.
        */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(5px) brightness(0.88)",
            WebkitBackdropFilter: "blur(5px) brightness(0.88)",
            maskImage: "linear-gradient(to right, black 0%, black 25%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 25%, transparent 50%)"
          }}
        />

        {/*
          LEFT BLEND: fade the blurred left zone into the page bg color.
          Light mode → cream (#FAF9F5), dark mode → near black (#0A0A0B).
        */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-bg-primary to-transparent"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 10%, transparent 45%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 10%, transparent 45%)"
          }}
        />

        {/* ── RIGHT SIDE EDGE BLENDING ── */}

        {/* TOP edge: blur + fade into bg — stronger inward reach */}
        <div
          className="absolute inset-x-0 top-0 h-64"
          style={{
            backdropFilter: "blur(12px) brightness(0.72)",
            WebkitBackdropFilter: "blur(12px) brightness(0.72)",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)"
          }}
        />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-bg-primary via-bg-primary/70 to-transparent" />

        {/* RIGHT edge: blur + fade into bg */}
        <div
          className="absolute inset-y-0 right-0 w-72"
          style={{
            backdropFilter: "blur(10px) brightness(0.75)",
            WebkitBackdropFilter: "blur(10px) brightness(0.75)",
            maskImage: "linear-gradient(to left, black 0%, black 38%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 0%, black 38%, transparent 100%)"
          }}
        />
        <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-l from-bg-primary via-bg-primary/70 to-transparent" />

        {/* BOTTOM edge: blur + fade into bg — stronger inward reach */}
        <div
          className="absolute inset-x-0 bottom-0 h-72"
          style={{
            backdropFilter: "blur(12px) brightness(0.72)",
            WebkitBackdropFilter: "blur(12px) brightness(0.72)",
            maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 100%)"
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent" />
      </div>
      {/* ─────────────────────────────────────────────────────────────────────── */}

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20">

        {/* Left Column: Text */}
        <div className="lg:col-span-8 flex flex-col justify-center pt-12 lg:pt-0">
          <div className="overflow-hidden mb-4">
            <h2 className="text-xl md:text-2xl font-light tracking-widest uppercase text-text-secondary">
              <SplitChars text="Hello, I'm" delay={0.7} />
            </h2>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-semibold tracking-tight mb-8 text-text-primary">
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2">
              <SplitChars text="Thanh Hung" delay={0.9} />
            </span>
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2 mt-[-1.5rem]">
              <SplitChars text="Phan" delay={1.1} />
            </span>
          </h1>

          <FadeUp delay={1.3}>
            <p className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed text-text-secondary">
              CS & Engineering Student @ Vietnamese-German Univ. <br />
              Building scalable system architectures & polished frontends.
            </p>
          </FadeUp>

          <FadeUp delay={1.5} className="flex flex-wrap items-center gap-6 mb-16">
            <MagneticButton
              className="hover:bg-accent-gold"
              style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' } as React.CSSProperties}
              strength={30}
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-2 font-medium text-inherit">
                View My Work <ArrowDown className="w-4 h-4" />
              </div>
            </MagneticButton>
            <MagneticButton
              className="hover:bg-bg-tertiary"
              style={{ border: '1px solid var(--border-hover)', color: 'var(--text-primary)' } as React.CSSProperties}
              strength={20}
              onClick={onOpenResume}
            >
              <div className="flex items-center gap-2 font-medium text-inherit">
                Resume <FileText className="w-4 h-4" />
              </div>
            </MagneticButton>
          </FadeUp>

          {/* Badges Container — Fixed with max-w-xl and items-start to lock them left */}
          <FadeUp delay={1.7} className="flex flex-wrap gap-3 max-w-xl items-start justify-start">
            {['Java', 'Spring Boot', 'C#', '.NET', 'Next.js', 'TypeScript', 'JavaScript', 'C++', 'Python', 'FastAPI'].map(tech => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wide backdrop-blur-sm border border-border-hover text-text-secondary bg-bg-glass whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </FadeUp>
        </div>

        {/* Right Column: Empty space so portrait background is visible */}
        <div className="lg:col-span-4" />
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary z-20"
      >
        <ArrowDown className="w-6 h-6 opacity-50" />
      </div>
    </section>
  );
}