import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring, useTransform } from 'framer-motion';

export function CountUp({ to, duration = 2, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      springValue.set(to);
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, springValue, to]);

  const display = useTransform(springValue, (current) => current.toFixed(decimals));

  return <motion.span ref={ref}>{display}</motion.span>;
}
