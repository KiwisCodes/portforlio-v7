import { useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { FadeUp } from '../animations/FadeUp';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { EDUCATION_DATA } from '../../data/education';

export function Education() {
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#education",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section id="education" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative">
      <SectionTitle num="04" title="Academic Journey" />

      <div className="relative mt-12 md:mt-20 pb-20">
        {/* Animated Timeline Line (Desktop only) */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-[2px] opacity-20 pointer-events-none hidden md:block h-full">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2 1000">
             <path 
               ref={lineRef}
               d="M1 0V1000" 
               stroke="var(--accent-gold)" 
               strokeWidth="2" 
               fill="none" 
             />
           </svg>
        </div>

        <div className="space-y-16 md:space-y-32 relative">
          {/* Timeline Line Mobile */}
          <div className="absolute top-4 bottom-4 left-4 w-px bg-border md:hidden z-0" />

          {EDUCATION_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={item.id} className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full pl-12 md:pl-0">
                {isLeft ? (
                  <>
                    <div className="w-full md:w-[45%] flex md:justify-end md:pr-8 md:order-1 order-2">
                      <FadeUp delay={0.1 * (index + 1)} className="text-left md:text-right w-full">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{item.institution}</h3>
                        <p className={item.degree === 'DAAD Scholar' ? "text-accent-gold font-mono text-xs md:text-sm mb-4" : "text-text-secondary font-mono text-xs md:text-sm mb-4"}>
                          {item.degree} • {item.period}
                        </p>
                        <div className="inline-block px-4 py-2 bg-bg-tertiary rounded-lg border border-border font-mono mb-6 text-sm">
                          {item.highlightLabel}: <span className="text-text-primary font-bold">{item.highlightValue}</span>
                        </div>
                        
                        <div className="flex flex-col md:items-end items-start gap-3">
                          {item.achievements.map((ach, i) => (
                            <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-full ${ach.isFeatured ? 'bg-accent-gold-dim border border-accent-gold/20 shadow-[0_0_15px_rgba(201,169,110,0.1)]' : 'bg-bg-tertiary border border-border hover:border-[#cd7f32]/50 hover:bg-[#cd7f32]/10 transition-colors'}`}>
                              <span className="text-lg">{ach.icon}</span> 
                              <span className={`text-xs md:text-sm font-medium ${ach.isFeatured ? 'text-accent-gold' : 'text-text-secondary hover:text-text-primary'}`}>
                                {ach.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </FadeUp>
                    </div>
                    
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-gold z-10 shadow-[0_0_15px_rgba(201,169,110,0.6)] md:top-1/2 top-2 origin-center" />

                    <div className="w-[45%] pl-8 hidden md:block md:order-3" />
                  </>
                ) : (
                  <>
                    <div className="w-[45%] pr-8 hidden md:block" />
                    
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-gold z-10 shadow-[0_0_15px_rgba(201,169,110,0.6)] md:top-1/2 top-2 origin-center" />

                    <div className="w-full md:w-[45%] flex justify-start md:pl-8">
                      <FadeUp delay={0.1 * (index + 1)} className="text-left w-full">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">{item.institution}</h3>
                        <p className={item.degree === 'DAAD Scholar' ? "text-accent-gold font-mono text-xs md:text-sm mb-4" : "text-text-secondary font-mono text-xs md:text-sm mb-4"}>
                          {item.degree} • {item.period}
                        </p>
                        <div className="inline-block px-4 py-2 bg-bg-tertiary rounded-lg border border-border font-mono mb-6 text-sm">
                          {item.highlightLabel}: <span className="text-text-primary font-bold">{item.highlightValue}</span>
                        </div>
                        
                        <div className="flex flex-col gap-3 items-start">
                          {item.achievements.map((ach, i) => (
                            <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-full ${ach.isFeatured ? 'bg-accent-gold-dim border border-accent-gold/20 shadow-[0_0_15px_rgba(201,169,110,0.1)]' : 'bg-bg-tertiary border border-border hover:border-[#cd7f32]/50 hover:bg-[#cd7f32]/10 transition-colors'}`}>
                              <span className="text-lg">{ach.icon}</span> 
                              <span className={`text-xs md:text-sm font-medium ${ach.isFeatured ? 'text-accent-gold' : 'text-text-secondary hover:text-text-primary'}`}>
                                {ach.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </FadeUp>
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
