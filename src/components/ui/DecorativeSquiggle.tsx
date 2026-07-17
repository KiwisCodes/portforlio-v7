import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from "framer-motion";

interface DecorativeSquiggleProps {
  /** SVG path d attribute — pass any squiggly/wavy path */
  path: string;
  /** Width of the SVG viewBox */
  width?: number;
  /** Height of the SVG viewBox */
  height?: number;
  /** CSS class for positioning */
  className?: string;
  /** Stroke color — defaults to accent-gold at low opacity */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Animation draw duration in seconds (for time-based draw) */
  duration?: number;
  /** Delay before draw starts (for time-based draw) */
  delay?: number;
  /** If true, the drawing progress binds dynamically to scroll position */
  scrollLinked?: boolean;
}

export function DecorativeSquiggle({
  path,
  width = 300,
  height = 200,
  className = "",
  color = "var(--accent-gold)",
  strokeWidth = 2.2,
  duration = 2.5,
  delay = 0,
  scrollLinked = true,
}: DecorativeSquiggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-bound Drawing ─────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Maps scroll progress to draw length with a spring response for premium slickness
  const rawPathLength = useTransform(scrollYProgress, [0.12, 0.85], [0, 1]);
  const smoothPathLength = useSpring(rawPathLength, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001
  });

  // Fade out opacity at extreme ends of scroll viewport
  const smoothOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.82, 0.95],
    [0, 0.38, 0.38, 0]
  );

  // ── Time-based Entrance Drawing (Fallback for Hero) ──
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (!scrollLinked && isInView) {
      controls.start("visible");
    }
  }, [isInView, controls, scrollLinked]);

  return (
    <div ref={containerRef} className={`pointer-events-none select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          {...(scrollLinked
            ? {
                style: {
                  pathLength: smoothPathLength,
                  opacity: smoothOpacity,
                },
              }
            : {
                initial: "hidden",
                animate: controls,
                variants: {
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 0.38,
                    transition: {
                      pathLength: { duration, delay, ease: "easeInOut" },
                      opacity: { duration: 0.3, delay },
                    },
                  },
                },
              })}
        />
      </svg>
    </div>
  );
}

// ─── Pre-built squiggle presets ───────────────────────────────────────────────

export const SQUIGGLE_PATHS = {
  /** Flowing horizontal wave */
  wave: "M0,100 C30,60 70,140 100,100 C130,60 170,140 200,100 C230,60 270,140 300,100",

  /** Loose spiral curl */
  curl: "M20,180 C20,120 80,120 80,60 C80,20 40,10 20,40 C0,70 20,100 60,100 C100,100 110,70 100,40",

  /** Corner bracket accent */
  bracket: "M60,20 L20,20 L20,180 L60,180",

  /** Gentle S-curve */
  sCurve: "M20,20 C20,20 150,20 150,100 C150,180 280,180 280,180",

  /** Small scribble loop */
  loop: "M50,100 C50,50 150,50 150,100 C150,150 250,150 250,100 C250,60 200,30 170,60 C140,90 160,130 190,120",

  /** Diagonal hatching strokes */
  hatch: "M0,60 L60,0 M40,100 L100,40 M80,140 L140,80 M120,180 L180,120 M160,200 L200,160",

  /** Asterisk / starburst */
  star: "M100,20 L100,180 M20,100 L180,100 M35,35 L165,165 M165,35 L35,165",

  /** DNA-like double helix */
  helix:
    "M20,0 C20,0 80,50 80,100 C80,150 20,200 20,200 M80,0 C80,0 20,50 20,100 C20,150 80,200 80,200",
};
