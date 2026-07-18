import { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { motion } from 'framer-motion';

import { SKILLS, PROFICIENCIES, SKILL_DETAILS } from '../../data/skills';
import { SkillDetailModal } from '../ui/SkillDetailModal';
import { DecorativeSquiggle, SQUIGGLE_PATHS } from '../ui/DecorativeSquiggle';

interface SelectedSkill {
  name: string;
  category: string;
  knowledge: string[];
}

// Reusable bento card for a skill group
function SkillGroupCard({
  group,
  delay,
  colSpan = 1,
  onSkillClick,
}: {
  group: (typeof SKILLS)[number];
  delay: number;
  colSpan?: 1 | 2 | 3;
  onSkillClick: (item: string, category: string) => void;
}) {
  const spanClass = colSpan === 2 ? 'lg:col-span-2' : colSpan === 3 ? 'lg:col-span-3' : '';
  return (
    <motion.div
      key={group.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 15 } }}
      className={`group relative rounded-2xl border border-border bg-bg-secondary/25 backdrop-blur-md p-8 shadow-md flex flex-col justify-start ${spanClass}`}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent-gold/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <h3 className="font-mono text-[10px] tracking-widest text-accent-gold uppercase mb-6 pb-2 border-b border-border/40 relative z-10">
        {group.category}
      </h3>
      <div className="flex flex-wrap gap-2.5 relative z-10">
        {group.items.map((item) => (
          <motion.button
            key={item}
            onClick={() => onSkillClick(item, group.category)}
            whileHover={{ y: -4, scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
            whileTap={{ scale: 0.93 }}
            className="px-3.5 py-2 rounded-xl bg-bg-secondary/50 border border-border/60 text-xs font-medium text-text-primary hover:border-accent-gold/50 hover:shadow-[0_8px_20px_rgba(166,124,61,0.08)] transition-all duration-300 relative overflow-hidden group/item cursor-pointer text-left"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-accent-gold/5 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{item}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill | null>(null);

  const handleSkillClick = (item: string, category: string) => {
    setSelectedSkill({ name: item, category, knowledge: SKILL_DETAILS[item] ?? [] });
  };

  // Split groups by id for layout control
  const [languages, frameworks, aiTools, cicd, cloud] = SKILLS;

  return (
    <section id="skills" className="relative py-32 px-6 lg:px-12 max-w-7xl mx-auto bg-transparent overflow-hidden">
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.loop}
        width={180}
        height={180}
        className="absolute top-10 right-10 opacity-20 pointer-events-none hidden md:block"
        duration={2.5}
        delay={0.2}
      />
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.hatch}
        width={100}
        height={100}
        className="absolute bottom-10 left-10 opacity-25 pointer-events-none hidden lg:block"
        duration={3}
        delay={0.4}
      />
      <SectionTitle num="04" title="Tools & Technologies" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">

        {/* ── Row 1: Languages · Frameworks · AI Tools ── */}
        <SkillGroupCard group={languages}   delay={0}   onSkillClick={handleSkillClick} />
        <SkillGroupCard group={frameworks}  delay={0.1} onSkillClick={handleSkillClick} />
        <SkillGroupCard group={aiTools}     delay={0.2} onSkillClick={handleSkillClick} />

        {/* ── Row 2: CI/CD (1 col) · Cloud AWS (2 cols) ── */}
        <SkillGroupCard group={cicd}  delay={0.1} onSkillClick={handleSkillClick} />
        <SkillGroupCard group={cloud} delay={0.2} colSpan={2} onSkillClick={handleSkillClick} />

        {/* ── Row 3: Proficiencies (2 cols) · System Design (1 col) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-border bg-bg-secondary/25 backdrop-blur-md p-8 shadow-md flex flex-col justify-center gap-6"
        >
          <h3 className="font-mono text-[10px] tracking-widest text-accent-gold uppercase pb-2 border-b border-border/40 mb-2">
            Language Proficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {PROFICIENCIES.map((prof, idx) => (
              <div key={prof.name}>
                <div className="mb-2 flex justify-between items-end">
                  <span className="font-medium text-text-primary text-sm">{prof.name}</span>
                  <span className="font-mono text-[10px] text-text-tertiary">{prof.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden border border-border/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${prof.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'circOut', delay: idx * 0.1 }}
                    className="h-full bg-accent-gold rounded-full relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-white/25"
                      style={{ animation: 'shimmer 2.2s infinite', transform: 'translateX(-100%)' }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 15 } }}
          className="group relative rounded-2xl border border-border bg-bg-secondary/25 backdrop-blur-md p-8 shadow-md overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <h3 className="font-mono text-[10px] tracking-widest text-accent-gold uppercase pb-2 border-b border-border/40 mb-5">
            System Design
          </h3>
          <div className="flex flex-wrap gap-2 relative z-10">
            {[
              'REST & gRPC APIs', 'Microservices', 'Event-Driven Architecture',
              'Message Queues (Kafka)', 'Database Sharding', 'Caching (Redis)',
              'Load Balancing', 'CAP Theorem', 'Rate Limiting',
              'CI/CD Pipelines', 'Containerisation', 'API Gateway',
            ].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 22 }}
                className="px-2.5 py-1 rounded-lg bg-bg-tertiary/50 border border-border/40 text-[10px] font-medium text-text-secondary hover:text-text-primary hover:border-accent-gold/35 hover:bg-accent-gold/[0.04] transition-all duration-200 cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Reusable Skill Detail Modal */}
      <SkillDetailModal
        skillName={selectedSkill?.name ?? null}
        category={selectedSkill?.category ?? ''}
        knowledge={selectedSkill?.knowledge ?? []}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
}
