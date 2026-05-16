import { SectionTitle } from "../ui/SectionTitle";
import { FadeUp } from "../animations/FadeUp";
import { CountUp } from "../animations/CountUp";

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionTitle num="01" title="About Me" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Text */}
        <div className="space-y-8">
          <FadeUp>
            <p className="text-xl md:text-2xl text-text-primary leading-relaxed font-light">
              A CS student at Vietnamese-German University, passionate about
              building impactful software that merges{" "}
              <span className="text-accent-gold font-medium italic">
                technical rigor
              </span>{" "}
              with <span className="font-medium">elegant design</span>.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-text-secondary leading-relaxed">
              Trilingual in Vietnamese, English (IELTS 8.0), and German (B1.1).
              Early in my studies, an exchange semester in Frankfurt, Germany
              completely changed how I approach architecture and scale in
              software engineering.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.4}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-border mt-8"
          >
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold mb-2">
                <CountUp to={3.68} decimals={2} />
              </div>
              <div className="text-sm font-mono text-text-tertiary">GPA</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold mb-2">
                <CountUp to={3} />
              </div>
              <div className="text-sm font-mono text-text-tertiary">
                Languages
              </div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold mb-2">
                <CountUp to={8.0} decimals={1} />
              </div>
              <div className="text-sm font-mono text-text-tertiary">IELTS</div>
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Photos Masonry */}
        <div className="relative h-[550px] sm:h-[650px] w-full mt-12 lg:mt-0">
          <FadeUp delay={0.3} className="absolute inset-0">
            {/* Photo 1 (Top Left) */}
            <div className="absolute top-0 left-0 w-[55%] h-[40%] rounded-xl overflow-hidden shadow-xl -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 z-10 border border-border/50">
              <img
                src="https://images.unsplash.com/photo-1642096633192-9290503a9a38?q=80&w=2070&auto=format&fit=crop"
                alt="Frankfurt City"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Photo 2 (Middle Right) */}
            <div className="absolute top-[15%] right-0 w-[50%] h-[45%] rounded-xl overflow-hidden shadow-2xl rotate-8 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 border border-border/50">
              <img
                src="https://www.frankfurt-university.de/fileadmin/standard/Aktuelles/Pressemitteilungen/Gebaeude_9_Frankfurt_UAS_Quelle_Friederike_Mannig_Frankfurt_UAS_-1.jpg"
                alt="University Building"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Photo 3 (Bottom Left/Center) */}
            <div className="absolute bottom-0 left-[10%] w-[60%] h-[45%] rounded-xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 z-30 border border-border/50">
              <img
                src="https://www.twog-architecture.com/Data/Sites/1/Product/51/vgu-1.jpg"
                alt="VGU Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
