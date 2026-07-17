import { useRef, useState, useEffect } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { FadeUp } from "../animations/FadeUp";
import { useScroll, useTransform, motion } from "framer-motion";
import { DecorativeSquiggle, SQUIGGLE_PATHS } from "../ui/DecorativeSquiggle";
import { EXPERIENCES } from "../../data/experience";
import { Image, Smartphone, Laptop, Globe } from "lucide-react";

function PhotoPlaceholder({ alt, src }: { alt: string; src: string }) {
  if (src) {
    return <img src={src} alt={alt} className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-bg-secondary/30">
      <Image className="w-8 h-8 text-text-tertiary/50" strokeWidth={1} />
      <span className="font-mono text-[9px] tracking-widest text-text-tertiary/50 uppercase">
        {alt}
      </span>
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Device platform detection for download links
  const [platform, setPlatform] = useState<{
    label: string;
    url: string;
    icon: "ios" | "android" | "macos" | "windows" | "web";
  }>({ label: "Open Web App", url: "https://noteee.app", icon: "web" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(userAgent);
    const isWindows = /windows|win32/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);

    if (isIOS) {
      setPlatform({
        label: "Download on App Store (iOS)",
        url: "https://apps.apple.com/app/noteee",
        icon: "ios",
      });
    } else if (isAndroid) {
      setPlatform({
        label: "Get it on Google Play (Android)",
        url: "https://play.google.com/store/apps/details?id=app.noteee",
        icon: "android",
      });
    } else if (isMac) {
      setPlatform({
        label: "Download for macOS",
        url: "https://noteee.app/download/macos",
        icon: "macos",
      });
    } else if (isWindows) {
      setPlatform({
        label: "Download for Windows",
        url: "https://noteee.app/download/windows",
        icon: "windows",
      });
    } else {
      setPlatform({
        label: "Open Noteee Web App",
        url: "https://noteee.app",
        icon: "web",
      });
    }
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for each photo — same mechanic as About
  const y1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const y2 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const exp = EXPERIENCES[0];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden bg-transparent"
    >
      {/* ── Decorative squiggles ─────────────────────────── */}
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.wave}
        width={320}
        height={120}
        className="absolute -top-4 right-8 opacity-60"
        duration={3}
        delay={0.3}
      />
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.curl}
        width={140}
        height={200}
        className="absolute bottom-10 left-0 opacity-40"
        duration={2.5}
        delay={0.8}
      />

      <SectionTitle num="02" title="Work Experience" />

      {/* ── Entry loop (one card per job) ─────────────────── */}
      {EXPERIENCES.map((entry, entryIdx) => {
        const isEven = entryIdx % 2 === 0;
        return (
          <div
            key={entry.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-20 pb-16 border-b border-border/20 last:border-0 last:pb-0"
          >
            {/* ── Text column (moves to right on even indices) ── */}
            <div className={`space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
              <FadeUp delay={0.1}>
                {/* Role + Company */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[9px] tracking-widest text-accent-gold uppercase border border-accent-gold/30 rounded-full px-2.5 py-0.5 bg-accent-gold/5">
                      {entry.type}
                    </span>
                    <span className="font-mono text-[9px] text-text-secondary">{entry.period}</span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-text-primary leading-tight">
                    {entry.role}
                  </h3>
                  <p className="text-accent-gold font-medium text-lg mt-1">
                    {entry.company}
                  </p>
                  <p className="font-mono text-[11px] text-text-tertiary mt-0.5 tracking-wide">
                    {entry.location}
                  </p>
                </div>
              </FadeUp>

              {/* Description bullets */}
              <FadeUp delay={0.2}>
                <ul className="space-y-4">
                  {entry.description.map((bullet, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-accent-gold" />
                      <p className="text-text-secondary leading-relaxed text-sm">{bullet}</p>
                    </li>
                  ))}
                </ul>
              </FadeUp>

              {/* Dynamic Platform Downloads */}
              {entry.downloadLinks && (
                <FadeUp delay={0.25}>
                  <div className="space-y-4 py-4 border-t border-border/40">
                    <div className="flex flex-col gap-2.5">
                      <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">
                        Get Noteee for your device
                      </span>
                      <div>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-accent-gold text-bg-primary hover:bg-accent-gold/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md font-medium text-xs border border-accent-gold/10"
                        >
                          {platform.icon === "ios" || platform.icon === "android" ? (
                            <Smartphone className="w-4 h-4" />
                          ) : platform.icon === "macos" || platform.icon === "windows" ? (
                            <Laptop className="w-4 h-4" />
                          ) : (
                            <Globe className="w-4 h-4" />
                          )}
                          <span>{platform.label}</span>
                        </a>
                      </div>
                    </div>

                    {/* Secondary Row for alternative options */}
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/20">
                      <span className="font-mono text-[8px] text-text-tertiary uppercase tracking-widest">
                        Also available on
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: "ios", label: "App Store (iOS & iPad)", icon: Smartphone, url: entry.downloadLinks.ios },
                          { key: "android", label: "Google Play", icon: Smartphone, url: entry.downloadLinks.android },
                          { key: "macos", label: "macOS App", icon: Laptop, url: entry.downloadLinks.macos },
                          { key: "windows", label: "Windows App", icon: Laptop, url: entry.downloadLinks.windows },
                          { key: "web", label: "Web version", icon: Globe, url: entry.downloadLinks.web },
                        ].map((link) => {
                          if (link.key === platform.icon) return null;
                          const Icon = link.icon;
                          return (
                            <a
                              key={link.key}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-bg-secondary/40 text-[10px] text-text-secondary hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-200"
                            >
                              <Icon className="w-3 h-3 opacity-80" />
                              <span>{link.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Tech tags */}
              <FadeUp delay={0.3}>
                <div className="pt-6 border-t border-border/40">
                  <p className="font-mono text-[9px] tracking-widest text-text-tertiary uppercase mb-3">
                    Tech used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-bg-secondary/50 border border-border/50 text-[11px] font-medium text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ── Photo column (moves to left on even indices) ── */}
            <div className={`relative h-[520px] sm:h-[600px] w-full mt-8 lg:mt-0 select-none ${isEven ? "lg:order-1" : "lg:order-2"}`}>
              {/* Photo 1 — top left, slight tilt left */}
              <motion.div
                style={{ y: y1 }}
                className="absolute top-0 left-0 w-[55%] h-[40%] rounded-xl overflow-hidden shadow-xl -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 z-10 border border-border/50 bg-bg-secondary/40 backdrop-blur-sm cursor-pointer"
              >
                <PhotoPlaceholder src={entry.photos[0]?.src ?? ""} alt={entry.photos[0]?.alt ?? "Work photo 1"} />
              </motion.div>

              {/* Photo 2 — middle right, slight tilt right */}
              <motion.div
                style={{ y: y2 }}
                className="absolute top-[18%] right-0 w-[50%] h-[45%] rounded-xl overflow-hidden shadow-2xl rotate-8 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 border border-border/50 bg-bg-secondary/40 backdrop-blur-sm cursor-pointer"
              >
                <PhotoPlaceholder src={entry.photos[1]?.src ?? ""} alt={entry.photos[1]?.alt ?? "Work photo 2"} />
              </motion.div>

              {/* Photo 3 — bottom center, subtle tilt */}
              <motion.div
                style={{ y: y3 }}
                className="absolute bottom-0 left-[10%] w-[60%] h-[42%] rounded-xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 z-30 border border-border/50 bg-bg-secondary/40 backdrop-blur-sm cursor-pointer"
              >
                <PhotoPlaceholder src={entry.photos[2]?.src ?? ""} alt={entry.photos[2]?.alt ?? "Work photo 3"} />
              </motion.div>

              {/* Ambient glow behind photos */}
              <div className="absolute inset-0 z-0 bg-accent-gold/[0.03] rounded-3xl blur-3xl pointer-events-none" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
