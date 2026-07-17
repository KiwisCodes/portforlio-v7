import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface SkillDetailModalProps {
  skillName: string | null;
  category: string;
  knowledge: string[];
  onClose: () => void;
}

export function SkillDetailModal({
  skillName,
  category,
  knowledge,
  onClose,
}: SkillDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!skillName) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [skillName, onClose]);

  return (
    <AnimatePresence>
      {skillName && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/75 backdrop-blur-lg"
          />

          {/* Modal Card — wider than tall */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur-2xl shadow-2xl overflow-hidden z-10 pointer-events-auto"
          >
            {/* Ambient gold glow top edge */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-gold/60 to-transparent" />

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-gold/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-border/50">
              <div>
                <p className="font-mono text-[9px] tracking-widest text-accent-gold uppercase mb-2">
                  {category}
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-primary leading-tight">
                  {skillName}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-border/60 text-text-tertiary hover:text-text-primary hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all duration-200 cursor-pointer flex-shrink-0 mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Knowledge badges grid */}
            <div className="px-8 py-7">
              {knowledge.length > 0 ? (
                <>
                  <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest mb-5">
                    What I know & use
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {knowledge.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 22,
                          delay: i * 0.035,
                        }}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-bg-tertiary/60 border border-border/50 text-xs font-medium text-text-primary hover:border-accent-gold/35 hover:bg-accent-gold/[0.04] transition-all duration-200 cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-text-secondary text-sm italic">
                  No details available for this skill yet.
                </p>
              )}
            </div>

            {/* Footer bar */}
            <div className="px-8 py-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-tertiary">
                {knowledge.length} items
              </span>
              <button
                onClick={onClose}
                className="text-[10px] font-mono text-text-tertiary hover:text-accent-gold transition-colors duration-200 uppercase tracking-wider cursor-pointer"
              >
                [esc] Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
