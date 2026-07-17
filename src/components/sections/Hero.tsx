import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { SplitChars } from '../animations/SplitChars';
import { FadeUp } from '../animations/FadeUp';
import { MagneticButton } from '../animations/MagneticButton';
import { ArrowDown, FileText } from 'lucide-react';
import { DecorativeSquiggle, SQUIGGLE_PATHS } from '../ui/DecorativeSquiggle';

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates for the 3D parallax tilt effect on the profile card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to the center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Scale max rotation to 12 degrees
    const tiltX = -(mouseY / (height / 2)) * 12;
    const tiltY = (mouseX / (width / 2)) * 12;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  useGSAP(() => {
    // Scroll indicator bounce animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.5
      });
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50 pointer-events-none" />

      {/* Morphing Mesh Gradient Shapes (AI can't do custom interactive math here) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '55%',
            aspectRatio: '1',
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(circle, rgba(166,124,61,0.14) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div 
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '55%',
            aspectRatio: '1',
            borderRadius: '50%',
            backgroundImage: 'radial-gradient(circle, rgba(46,109,180,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Text */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-12 lg:pt-0">
          <div className="overflow-hidden mb-4">
            <h2 className="text-xl md:text-2xl font-light text-text-secondary tracking-widest uppercase">
              <SplitChars text="Hello, I'm" delay={1.5} />
            </h2>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-semibold tracking-tight mb-8">
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2">
              <SplitChars text="Thanh Hung" delay={1.8} />
            </span>
            <span className="block overflow-hidden px-2 pb-10 -mb-4 -mx-2 mt-[-1.5rem]">
              <SplitChars text="Phan" delay={2.1} />
            </span>
          </h1>
          
          <FadeUp delay={2.4}>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-12 leading-relaxed">
              CS & Engineering Student @ Vietnamese-German Univ. <br />
              Building scalable system architectures & polished frontends.
            </p>
          </FadeUp>

          <FadeUp delay={2.6} className="flex flex-wrap items-center gap-6 mb-16">
            <MagneticButton 
              className="bg-text-primary text-bg-primary hover:bg-accent-gold" 
              strength={30}
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-2 font-medium text-inherit">
                View My Work <ArrowDown className="w-4 h-4" />
              </div>
            </MagneticButton>
            <MagneticButton 
              className="border border-border hover:bg-bg-tertiary" 
              strength={20}
              onClick={onOpenResume}
            >
              <div className="flex items-center gap-2 font-medium text-inherit">
                Resume <FileText className="w-4 h-4" />
              </div>
            </MagneticButton>
          </FadeUp>

          {/* Badges */}
          <FadeUp delay={2.8} className="flex flex-wrap gap-3">
            {['Java', 'Spring Boot', 'C#', '.NET', 'Next.js', 'TypeScript', 'JavaScript', 'C++', 'Python', 'FastAPI'].map(tech => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-border text-xs font-mono tracking-wide text-text-secondary">
                {tech}
              </span>
            ))}
          </FadeUp>
        </div>

        {/* Right Column: Interactive 3D Parallax Image Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative">
          {/* Decorative Squiggle behind/around profile photo */}
          <DecorativeSquiggle
            path={SQUIGGLE_PATHS.star}
            width={160}
            height={160}
            className="absolute -top-12 -left-12 opacity-30 animate-pulse hidden sm:block"
            duration={3}
            delay={1.5}
            scrollLinked={false}
          />
          <DecorativeSquiggle
            path={SQUIGGLE_PATHS.hatch}
            width={120}
            height={120}
            className="absolute -bottom-8 -right-8 opacity-40 hidden sm:block"
            duration={2.5}
            delay={2.0}
            scrollLinked={false}
          />
          <FadeUp delay={1.5} className="w-full max-w-[320px] lg:max-w-[400px]">
            <div 
              style={{ perspective: "1000px" }}
              className="w-full aspect-square"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  scale: isHovered ? 1.03 : 1
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full h-full rounded-full border border-border/20 overflow-hidden shadow-2xl bg-bg-secondary/40 backdrop-blur-sm cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img 
                  src="/pth-office-upscaled.jpg" 
                  alt="Thanh Hung Phan" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ 
                    transform: "translateZ(20px)",
                    scale: 1.05
                  }}
                  onError={(e) => {
                    // Fallback while the user uploads their image
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                    e.currentTarget.onerror = null;
                  }}
                />
                
                {/* Thin overlay shimmer */}
                <div 
                  className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-opacity duration-300"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-tertiary"
      >
        <ArrowDown className="w-6 h-6 opacity-50" />
      </div>
    </section>
  );
}
