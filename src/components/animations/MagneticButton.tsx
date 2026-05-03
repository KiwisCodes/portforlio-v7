import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({ children, className, strength = 20, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    
    let textXTo: (val: number) => void;
    let textYTo: (val: number) => void;
    if (textRef.current) {
        textXTo = gsap.quickTo(textRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        textYTo = gsap.quickTo(textRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    }

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
      
      if (textXTo && textYTo) {
          textXTo(x * (strength / 150));
          textYTo(y * (strength / 150));
      }
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
      if (textXTo && textYTo) {
          textXTo(0);
          textYTo(0);
      }
    };

    btn.addEventListener('mousemove', mouseMove);
    btn.addEventListener('mouseleave', mouseLeave);

    return () => {
      btn.removeEventListener('mousemove', mouseMove);
      btn.removeEventListener('mouseleave', mouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative flex items-center justify-center rounded-full px-6 py-3 transition-colors duration-300",
        className
      )}
      {...props}
    >
      <span ref={textRef} className="pointer-events-none relative z-10 flex items-center">
        {children}
      </span>
    </button>
  );
}
