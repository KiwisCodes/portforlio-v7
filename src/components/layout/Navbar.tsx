import { useScrollDirection } from '../../hooks/useScrollDirection';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const { scrollDirection, isTop } = useScrollDirection();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out",
        (!isTop && scrollDirection === 'down') ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex items-center gap-5 px-5 py-2.5 rounded-full bg-bg-primary/50 backdrop-blur-xl border border-border/75 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-accent-gold/20 hover:shadow-[0_12px_40px_rgba(166,124,61,0.06)] transition-all duration-500">
        
        {/* Brand logo link */}
        <a href="#" className="font-display font-semibold text-lg tracking-wide flex items-center gap-1.5 hover:text-accent-gold transition-colors pl-2.5 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span>Hung</span>
        </a>
        
        {/* Links with sliding capsule bubble background */}
        <div className="hidden md:flex items-center gap-1.5 ml-5 pl-5 border-l border-border/60 relative">
          {LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-[10px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors duration-300 select-none",
                  isActive ? "text-text-primary font-semibold" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavBubble"
                    className="absolute inset-0 bg-accent-gold/10 border border-accent-gold/20 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="ml-2 pr-1 flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
