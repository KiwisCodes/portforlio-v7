import { motion } from 'framer-motion';

export function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-16 md:mb-24 flex flex-col gap-2">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-mono text-accent-gold text-sm tracking-widest"
      >
        §{num}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold"
      >
        {title}
      </motion.h2>
    </div>
  );
}
