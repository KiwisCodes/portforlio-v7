import { SectionTitle } from '../ui/SectionTitle';
import { FadeUp } from '../animations/FadeUp';
import { CountUp } from '../animations/CountUp';

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionTitle num="01" title="About Me" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Text */}
        <div className="space-y-8">
          <FadeUp>
            <p className="text-xl md:text-2xl text-text-primary leading-relaxed font-light">
              A CS student at Vietnamese-German University, passionate about building impactful software that merges <span className="text-accent-gold font-medium italic">technical rigor</span> with <span className="font-medium">elegant design</span>.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-lg text-text-secondary leading-relaxed">
              Trilingual in Vietnamese, English (IELTS 8.0), and German (B1.1). Early in my studies, an exchange semester in Frankfurt, Germany completely changed how I approach architecture and scale in software engineering.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} className="grid grid-cols-3 gap-6 pt-8 border-t border-border mt-8">
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
              <div className="text-sm font-mono text-text-tertiary">Languages</div>
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
        <div className="relative h-[500px] sm:h-[600px] w-full">
          <FadeUp delay={0.3} className="absolute inset-0">
            {/* Photo 1 (Main) */}
            <div className="absolute top-0 right-[20%] w-[60%] h-[50%] rounded-xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20">
              <img src="https://images.unsplash.com/photo-1558961556-302deccbe415?q=80&w=600&auto=format&fit=crop" alt="Frankfurt City" className="w-full h-full object-cover" />
            </div>
            {/* Photo 2 (Small top right) */}
            <div className="absolute top-[10%] right-0 w-[40%] h-[35%] rounded-xl overflow-hidden shadow-xl rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 z-10">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" alt="Teamwork" className="w-full h-full object-cover" />
            </div>
            {/* Photo 3 (Bottom) */}
            <div className="absolute top-[45%] right-[10%] w-[70%] h-[45%] rounded-xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 z-30">
              <img src="https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=600&auto=format&fit=crop" alt="Coding Setup" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
