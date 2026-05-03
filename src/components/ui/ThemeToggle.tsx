import { motion } from 'framer-motion';
import { useTheme } from '../../providers';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-bg-tertiary focus:outline-none"
      aria-label="Toggle Theme"
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          rotate: isDark ? 0 : 90,
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="5"
          initial={false}
          animate={{
            r: isDark ? 4 : 5,
          }}
        />
        {/* Sun rays */}
        <motion.g
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>

        {/* Moon mask */}
        <motion.path
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          fill={isDark ? "currentColor" : "none"}
          className="origin-center"
        />
      </motion.svg>
    </button>
  );
}
