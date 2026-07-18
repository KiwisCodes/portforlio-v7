import { motion, Variants, useReducedMotion } from 'framer-motion';

export function SplitChars({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();

  // Honor prefers-reduced-motion — render static text immediately
  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const chars = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.022, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 18,
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {chars.map((char, index) => (
        <motion.span variants={child} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }} key={index}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
