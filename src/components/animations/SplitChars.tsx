import { motion, Variants } from 'framer-motion';

export function SplitChars({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
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
