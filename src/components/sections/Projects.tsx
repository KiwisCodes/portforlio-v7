import { useState } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { PROJECTS } from "../../data/projects";

export function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Create state to store the navigation button elements
  // This ensures Swiper re-renders once the buttons are available in the DOM
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  // FIX: Triple the array for the loop to satisfy EffectCards requirement.
  // Swiper 11/12 with 'cards' effect needs many slides to loop correctly without warnings.
  const loopedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <section
      id="projects"
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative"
    >
      <SectionTitle num="02" title="Featured Work" />

      <div className="w-full py-12 max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto relative group/swiper">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          loopAdditionalSlides={3}
          // Use the state-based refs for navigation
          navigation={{
            prevEl,
            nextEl,
          }}
          cardsEffect={{
            perSlideOffset: 12,
            perSlideRotate: 3,
            rotate: true,
            slideShadows: true,
          }}
          modules={[EffectCards, Navigation]}
          className="w-full h-[550px]"
        >
          {loopedProjects.map((project, idx) => (
            <SwiperSlide
              key={`${project.id}-${idx}`}
              className="rounded-2xl border border-border bg-bg-secondary overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div
                className="absolute inset-0 z-0 bg-gradient-to-b opacity-50 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-stops))`,
                }}
              />
              <div
                className={`absolute inset-0 z-0 bg-gradient-to-b ${project.color} opacity-40 transition-opacity duration-500`}
              />

              <div className={`relative z-10 flex flex-col h-full`}>
                <div
                  className="p-8 flex-1 flex flex-col items-start"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {project.featured && (
                    <span className="inline-flex items-center self-start px-3 py-1 mb-6 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-mono font-medium border border-accent-gold/20 shadow-[0_0_10px_rgba(201,169,110,0.2)]">
                      🏆 Signature Project
                    </span>
                  )}
                  <h3 className="font-display text-3xl mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-text-tertiary mb-6 uppercase tracking-wider">
                    {project.subtitle}
                  </p>
                  <p className="text-text-secondary mb-8 max-w-sm line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md bg-bg-tertiary border border-border text-xs font-mono text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 rounded-md bg-transparent border border-transparent text-xs font-mono text-text-tertiary">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedId(project.id)}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent-gold group/btn origin-left mt-auto bg-text-primary text-bg-primary px-5 py-2.5 rounded-full hover:bg-accent-gold hover:text-bg-primary shadow-lg"
                  >
                    Explore Details
                  </button>
                </div>

                <div className={`relative overflow-hidden h-56 mt-auto`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons using React refs */}
        <button
          ref={(node) => setPrevEl(node)}
          className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg-tertiary border border-border flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover/swiper:opacity-100 transition-opacity hover:bg-border/50 hover:text-accent-gold shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          ref={(node) => setNextEl(node)}
          className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg-tertiary border border-border flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover/swiper:opacity-100 transition-opacity hover:bg-border/50 hover:text-accent-gold shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 py-12 md:p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row my-auto pointer-events-auto"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary via-transparent to-transparent hidden md:block opacity-0 md:opacity-100" />
              </div>

              <div className="p-8 md:p-12 md:w-1/2 flex flex-col items-start text-left relative z-10 bg-bg-secondary">
                <p className="font-mono text-xs text-accent-gold mb-2 uppercase tracking-wider">
                  {selectedProject.subtitle}
                </p>
                <h3 className="font-display text-4xl mb-6">
                  {selectedProject.title}
                </h3>

                <p className="text-text-secondary leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="space-y-3 mb-10 w-full">
                  {selectedProject.details.map((detail, i) => (
                    <div key={i} className="flex flex-row items-baseline gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0 mt-2" />
                      <span className="text-sm text-text-primary leading-relaxed text-left">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-md bg-bg-tertiary border border-border text-xs font-mono text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-4 w-full">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-text-primary text-bg-primary font-medium hover:bg-text-primary/90 transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:bg-bg-tertiary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
