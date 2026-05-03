import { useScrollDirection } from '../../hooks/useScrollDirection';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

const LINKS = [
  { label: 'About', href: '#about' },
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
        "fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out",
        (!isTop && scrollDirection === 'down') ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-bg-primary/70 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <a href="#" className="font-display font-semibold text-xl tracking-wide flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-gold" />
          Hung
        </a>
        
        <div className="hidden md:flex items-center gap-4 ml-6 pl-6 border-l border-border">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium tracking-wide transition-colors hover:text-accent-gold"
            >
              {link.label}
              {activeSection === link.href.substring(1) && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold" />
              )}
            </a>
          ))}
        </div>

        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
