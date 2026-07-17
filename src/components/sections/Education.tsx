import { useRef, useState, useEffect } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { useScroll, useTransform, motion } from "framer-motion";
import { EDUCATION_DATA } from "../../data/education";
import { DecorativeSquiggle, SQUIGGLE_PATHS } from "../ui/DecorativeSquiggle";

export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size to simplify mobile timeline
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Progress tracker for the active gold line drawing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Track scroll progress for background parallax landmarks
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background parallax drifts
  const bgVector1X = useTransform(bgProgress, [0, 1], ["50px", "-50px"]);
  const bgVector2X = useTransform(bgProgress, [0, 1], ["-60px", "60px"]);

  // Golden timeline line scale
  const scaleLineY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (isMobile) {
    return (
      <section id="education" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden bg-transparent">
        <SectionTitle num="05" title="Academic Journey" />
        <DecorativeSquiggle
          path={SQUIGGLE_PATHS.wave}
          width={280}
          height={80}
          className="absolute top-2 right-4 opacity-20 block sm:hidden"
          duration={2.5}
        />

        <div className="relative mt-12 pb-12">
          {/* Mobile vertical line */}
          <div className="absolute top-4 bottom-4 left-4 w-px bg-border z-0" />

          <div className="space-y-12 pl-10 relative">
            {EDUCATION_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 18, delay: idx * 0.05 }}
                className="relative text-left"
              >
                {/* Dot */}
                <div className="absolute left-[-32px] top-2 w-3.5 h-3.5 rounded-full bg-bg-primary border-4 border-accent-gold shadow-[0_0_10px_rgba(201,169,110,0.5)] z-10" />

                <h3 className="font-display text-xl font-semibold mb-1 text-text-primary">{item.institution}</h3>
                <p className="text-accent-gold font-mono text-[10px] uppercase tracking-wider mb-3">
                  {item.degree} • {item.period}
                </p>
                <div className="inline-block px-3 py-1 bg-bg-tertiary/60 border border-border/60 rounded-lg text-xs font-mono mb-4 text-text-secondary">
                  {item.highlightLabel}: <span className="text-text-primary font-bold">{item.highlightValue}</span>
                </div>

                <div className="space-y-2 mt-2">
                  {item.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-tertiary border border-border text-xs text-text-secondary w-fit">
                      <span>{ach.icon}</span>
                      <span className="font-medium">{ach.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      id="education" 
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden bg-transparent"
    >
      <SectionTitle num="05" title="Academic Journey" />

      {/* Dynamic vector lines drawing on scroll */}
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.loop}
        width={220}
        height={220}
        className="absolute top-24 left-10 opacity-20 pointer-events-none hidden xl:block"
        duration={2.8}
        delay={0.2}
      />
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.curl}
        width={150}
        height={250}
        className="absolute bottom-24 right-10 opacity-15 pointer-events-none hidden xl:block"
        duration={3}
        delay={0.5}
      />

      {/* Parallax Contour Lines in Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.02]">
        <motion.svg 
          style={{ x: bgVector1X }}
          className="absolute top-[10%] left-[-5%] w-[60%] h-[35%]" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="var(--accent-gold)" 
          strokeWidth="0.5"
        >
          <path d="M 0,50 Q 25,20 50,50 T 100,50 Q 80,80 50,60 Z" />
        </motion.svg>
        <motion.svg 
          style={{ x: bgVector2X }}
          className="absolute bottom-[10%] right-[-5%] w-[60%] h-[35%]" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="var(--accent-gold)" 
          strokeWidth="0.5"
        >
          <path d="M 0,30 Q 30,70 60,30 T 120,40 Q 90,10 40,30 Z" />
        </motion.svg>
      </div>

      <div className="relative mt-24 pb-20 z-10 w-full">
        {/* Timeline path line (Desktop only) */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-[2px] h-full pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Background dotted line */}
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 6" />
            {/* Golden drawing line */}
            <motion.line 
              x1="1" 
              y1="0" 
              x2="1" 
              y2="100%" 
              stroke="var(--accent-gold)" 
              strokeWidth="2.5"
              style={{ scaleY: scaleLineY, originY: 0 }}
            />
          </svg>
        </div>

        <div className="space-y-32 relative">
          {EDUCATION_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={item.id} className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                
                {/* Timeline Dot (Pops up when in view) */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute left-[50%] -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-bg-primary border-4 border-accent-gold shadow-[0_0_15px_rgba(201,169,110,0.6)] z-20 top-1/2 -translate-y-1/2"
                />

                {isLeft ? (
                  <>
                    {/* Left content card */}
                    <div className="w-full md:w-[45%] flex md:justify-end md:pr-12 md:order-1 order-2">
                      <motion.div 
                        initial={{ opacity: 0, x: -70, y: 25 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="text-left md:text-right w-full"
                      >
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2 text-text-primary">
                          {item.institution}
                        </h3>
                        <p className="text-accent-gold font-mono text-xs uppercase tracking-wider mb-4">
                          {item.degree} • {item.period}
                        </p>
                        
                        <div className="inline-block px-4 py-2 bg-bg-secondary/40 border border-border/60 rounded-xl text-xs font-mono mb-6 text-text-secondary shadow-sm backdrop-blur-sm">
                          {item.highlightLabel}: <span className="text-text-primary font-bold">{item.highlightValue}</span>
                        </div>
                        
                        <div className="flex flex-col md:items-end items-start gap-2.5">
                          {item.achievements.map((ach, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/80 bg-bg-secondary/30 backdrop-blur-sm text-xs font-medium text-text-secondary hover:border-accent-gold/45 hover:text-text-primary transition-all">
                              <span>{ach.icon}</span>
                              <span>{ach.text}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="w-[45%] pl-12 hidden md:block md:order-3" />
                  </>
                ) : (
                  <>
                    <div className="w-[45%] pr-12 hidden md:block" />

                    {/* Right content card */}
                    <div className="w-full md:w-[45%] flex justify-start md:pl-12">
                      <motion.div 
                        initial={{ opacity: 0, x: 70, y: 25 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="text-left w-full"
                      >
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2 text-text-primary">
                          {item.institution}
                        </h3>
                        <p className="text-accent-gold font-mono text-xs uppercase tracking-wider mb-4">
                          {item.degree} • {item.period}
                        </p>
                        
                        <div className="inline-block px-4 py-2 bg-bg-secondary/40 border border-border/60 rounded-xl text-xs font-mono mb-6 text-text-secondary shadow-sm backdrop-blur-sm">
                          {item.highlightLabel}: <span className="text-text-primary font-bold">{item.highlightValue}</span>
                        </div>
                        
                        <div className="flex flex-col items-start gap-2.5">
                          {item.achievements.map((ach, i) => (
                            <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/80 bg-bg-secondary/30 backdrop-blur-sm text-xs font-medium text-text-secondary hover:border-accent-gold/45 hover:text-text-primary transition-all">
                              <span>{ach.icon}</span>
                              <span>{ach.text}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
