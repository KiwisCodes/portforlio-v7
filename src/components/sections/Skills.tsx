import { SectionTitle } from '../ui/SectionTitle';
import { FadeUp } from '../animations/FadeUp';
import { motion } from 'framer-motion';

import { SKILLS, PROFICIENCIES } from '../../data/skills';

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionTitle num="03" title="Tools & Technologies" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          {SKILLS.map((group, idx) => (
            <div key={group.id} className="mb-12 last:mb-0">
              <FadeUp delay={idx * 0.1}>
                <h3 className="font-mono text-sm tracking-widest text-text-secondary uppercase mb-6 pb-2 border-b border-border/50">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 15,
                        delay: i * 0.05 + 0.1 
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg bg-bg-tertiary border border-border text-sm font-medium transition-all hover:border-accent-gold/40 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] cursor-default"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-8">
          {PROFICIENCIES.map((prof, idx) => (
            <FadeUp key={prof.name} delay={0.2 + idx * 0.1}>
              <div className="mb-2 flex justify-between items-end">
                <span className="font-medium">{prof.name}</span>
                <span className="font-mono text-xs text-text-tertiary">{prof.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${prof.level}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.3 + idx * 0.1 }}
                  className="h-full bg-accent-gold rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </FadeUp>
          ))}

          <FadeUp delay={0.8} className="mt-8 p-6 rounded-2xl border border-border bg-bg-secondary relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <h4 className="font-display text-2xl mb-2 relative z-10">Beyond the code</h4>
             <p className="text-text-secondary text-sm leading-relaxed relative z-10">
               Engineering is more than languages. I focus on system architecture, test-driven development, clear documentation, and understanding user needs before writing a single line of logic.
             </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
