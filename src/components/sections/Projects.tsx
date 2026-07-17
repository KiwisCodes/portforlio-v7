import { useState, useRef, useEffect } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ArrowUpRight,
} from "lucide-react";

import { PROJECTS } from "../../data/projects";
import { DecorativeSquiggle, SQUIGGLE_PATHS } from "../ui/DecorativeSquiggle";

export function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  // Monitor viewport size to toggle 3D circular carousel vs mobile swipeable track
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sort projects so that the featured project is positioned nicely
  const sortedProjects = [...PROJECTS].sort((a, b) => 
    (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  // Scroll Progress tracker for the sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll progress to Y-axis rotation (0 to -360deg for a full cylinder revolution)
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  if (isMobile) {
    return (
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
        <SectionTitle num="03" title="Selected Works" />
        <DecorativeSquiggle
          path={SQUIGGLE_PATHS.wave}
          width={280}
          height={80}
          className="absolute top-2 right-4 opacity-20 block sm:hidden"
          duration={2.5}
        />
        
        {/* Mobile touch-swipeable track */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-12 -mx-6 px-6 pointer-events-auto">
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setSelectedId(project.id)}
              className={`snap-center flex-shrink-0 w-[75vw] sm:w-[280px] aspect-[1/1.618] flex flex-col rounded-2xl border bg-bg-secondary/40 backdrop-blur-md overflow-hidden shadow-lg select-none cursor-pointer ${
                project.featured 
                  ? "border-accent-gold/40 shadow-[0_15px_40px_rgba(166,124,61,0.06)] bg-bg-secondary/60" 
                  : "border-border/80"
              }`}
            >
              {/* Card Image (45% height) */}
              <div className="h-[45%] w-full relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-transparent to-transparent opacity-80" />
                <div className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-25`} />
              </div>

              {/* Card Info (55% height) */}
              <div className="h-[55%] p-5 flex flex-col justify-between text-left">
                <div>
                  <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest block mb-1">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 text-text-primary leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-[11px] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 rounded bg-bg-tertiary/75 border border-border/40 text-[9px] font-mono text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                    Explore Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay Render */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <Modal project={selectedProject} onClose={() => setSelectedId(null)} />
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop 3D Circular Cylinder Scroll Carousel Layout
  return (
    <div id="projects" ref={sectionRef} className="relative h-[350vh] bg-transparent">
      {/* Sticky framing viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center h-full">
          <SectionTitle num="03" title="Selected Works" />
          
          {/* Decorative self-drawing vectors in Projects section background */}
          <DecorativeSquiggle
            path={SQUIGGLE_PATHS.helix}
            width={120}
            height={260}
            className="absolute top-1/4 left-6 opacity-25 hidden xl:block"
            duration={3}
            delay={0.2}
          />
          <DecorativeSquiggle
            path={SQUIGGLE_PATHS.sCurve}
            width={300}
            height={100}
            className="absolute bottom-12 right-12 opacity-30 hidden lg:block"
            duration={2.5}
            delay={0.5}
          />
          
          {/* 3D Perspective Scene Viewport */}
          <div 
            className="w-full mt-2 relative flex items-center justify-center h-[640px]"
            style={{ 
              perspective: "1600px", 
              transformStyle: "preserve-3d" 
            }}
          >
            {/* The Rotating 3D Cylinder Container */}
            <motion.div
              style={{
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[320px] h-[518px] flex items-center justify-center pointer-events-auto"
            >
              {sortedProjects.map((project, idx) => {
                const baseAngle = idx * 60;
                const radius = 380; // Cylinder radius

                // Calculate opacity dynamically based on the card's relative angle to the camera
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, (progress) => {
                  const currentRotation = progress * -300;
                  let relAngle = (baseAngle + currentRotation) % 360;
                  if (relAngle < 0) relAngle += 360;

                  const rad = (relAngle * Math.PI) / 180;
                  const cosValue = Math.cos(rad); // 1 = Front, -1 = Back
                  return 0.12 + ((cosValue + 1) / 2) * 0.88;
                });

                // Calculate dynamic scale on scroll (card scales up when facing front)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, (progress) => {
                  const currentRotation = progress * -300;
                  let relAngle = (baseAngle + currentRotation) % 360;
                  if (relAngle < 0) relAngle += 360;

                  const rad = (relAngle * Math.PI) / 180;
                  const cosValue = Math.cos(rad);
                  return 0.88 + ((cosValue + 1) / 2) * 0.12;
                });

                // Calculate dynamic pointer events to prevent clicking cards rotated to the back
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const pointerEvents = useTransform(scrollYProgress, (progress) => {
                  const currentRotation = progress * -300;
                  let relAngle = (baseAngle + currentRotation) % 360;
                  if (relAngle < 0) relAngle += 360;
                  return relAngle < 80 || relAngle > 280 ? "auto" : "none";
                });

                return (
                  <motion.div
                    key={project.id}
                    style={{
                      transform: `rotateY(${baseAngle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                      position: "absolute",
                      opacity,
                      pointerEvents,
                    }}
                    className="w-[320px] h-[518px]"
                  >
                    {/* Inner wrapper handles the interactive lift and tilt animations to avoid overriding cylindrical positioning */}
                    <motion.div
                      whileHover={{ 
                        y: -20, 
                        z: 32,
                        scale: 1.04, 
                        transition: { type: "spring", stiffness: 350, damping: 20 }
                      }}
                      onClick={() => setSelectedId(project.id)}
                      className={`relative w-full h-full flex flex-col rounded-2xl border bg-bg-secondary/25 border-border/40 hover:border-accent-gold/45 hover:shadow-[0_20px_50px_rgba(201,169,110,0.06)] overflow-hidden shadow-2xl transition-colors duration-300 backdrop-blur-lg select-none cursor-pointer group`}
                      style={{
                        scale,
                        transformStyle: "preserve-3d"
                      }}
                    >
                      {/* Glass flash glare shine overlay */}
                      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-2xl">
                        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transform skew-x-12 group-hover:left-[150%] transition-[left] duration-1000 ease-out" />
                      </div>

                      {/* Accent Highlight Bar for Signature/Featured Projects */}
                      {project.featured && (
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-gold/55 to-transparent animate-pulse" />
                      )}

                      {/* Top Image (45% height) */}
                      <div className="h-[45%] w-full relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-transparent to-transparent opacity-85" />
                        <div className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-20`} />
                      </div>

                      {/* Bottom Info (55% height) */}
                      <div 
                        className="h-[55%] p-6 flex flex-col justify-between text-left"
                        style={{ transform: "translateZ(15px)" }} // Pop text depth slightly
                      >
                        <div>
                          {project.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 mb-3 rounded-full bg-accent-gold/10 text-accent-gold text-[9px] font-mono tracking-wider border border-accent-gold/20">
                              🏆 SIGNATURE
                            </span>
                          )}
                          
                          <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest block mb-1">
                            {project.subtitle}
                          </span>
                          
                          <h3 className="font-display text-xl font-semibold mb-2 text-text-primary group-hover:text-accent-gold transition-colors duration-300 leading-snug">
                            {project.title}
                          </h3>
                          
                          <p className="text-text-secondary text-[11px] leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded bg-bg-tertiary/75 border border-border/40 text-[9px] font-mono text-text-secondary animate-fade-in"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                            Explore Project
                            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <Modal project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ModalProps {
  project: typeof PROJECTS[0];
  onClose: () => void;
}

function Modal({ project, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] h-[85vh] max-h-[720px] aspect-[1/1.618] bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto pointer-events-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Image Column (35% height) */}
        <div className="h-[35%] w-full relative overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-95" />
          <div className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-20`} />
        </div>

        {/* Bottom Info Column (65% height) - Scrollable */}
        <div className="h-[65%] p-6 flex flex-col justify-between items-start text-left bg-bg-secondary overflow-y-auto hide-scrollbar relative z-10 w-full">
          <div className="w-full">
            <span className="font-mono text-[9px] text-accent-gold uppercase tracking-widest block mb-1">
              {project.subtitle}
            </span>
            <h3 className="font-display text-2xl font-semibold mb-4 text-text-primary leading-snug">
              {project.title}
            </h3>

            <p className="text-text-secondary leading-relaxed mb-6 text-xs">
              {project.description}
            </p>

            {/* Achievement details */}
            <div className="space-y-2.5 mb-6 w-full">
              {project.details.map((detail, i) => (
                <div key={i} className="flex flex-row items-baseline gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0 mt-2" />
                  <span className="text-xs text-text-primary leading-relaxed text-left">
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags capsules */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded bg-bg-tertiary/75 border border-border/40 text-[9px] font-mono text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="mt-auto pt-4 flex gap-4 w-full flex-shrink-0 bg-bg-secondary z-20">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-text-primary text-bg-primary font-medium hover:bg-text-primary/90 transition-colors text-xs"
            >
              <Github className="w-3.5 h-3.5" /> Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border hover:bg-bg-tertiary transition-colors text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
