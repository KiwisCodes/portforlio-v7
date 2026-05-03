import { SectionTitle } from '../ui/SectionTitle';
import { FadeUp } from '../animations/FadeUp';
import { MagneticButton } from '../animations/MagneticButton';
import { Mail, Linkedin, Github } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionTitle num="05" title="Let's Connect" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <FadeUp>
            <p className="text-xl text-text-secondary leading-relaxed mb-12">
              Have a project in mind, or just want to say hello? Whether it's about software architecture, frontend design, or a potential collaboration, I'm always open to talking.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="space-y-6 hidden lg:block">
             <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-accent-gold group-hover:border-accent-gold group-hover:text-bg-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:phanthanhhung.main@gmail.com" className="text-lg font-mono hover:text-accent-gold transition-colors">
                  phanthanhhung.main@gmail.com
                </a>
             </div>
             
             <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-[#0077b5] group-hover:border-[#0077b5] group-hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </div>
                <a href="#" className="text-lg font-mono hover:text-[#0077b5] transition-colors relative overflow-hidden group/link">
                  LinkedIn Profile
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#0077b5] -translate-x-full group-hover/link:translate-x-0 transition-transform duration-300" />
                </a>
             </div>

             <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-text-primary group-hover:border-text-primary group-hover:text-bg-primary">
                  <Github className="w-5 h-5" />
                </div>
                <a href="#" className="text-lg font-mono hover:text-text-primary transition-colors relative overflow-hidden group/link">
                  GitHub Profile
                  <span className="absolute bottom-0 left-0 w-full h-px bg-text-primary -translate-x-full group-hover/link:translate-x-0 transition-transform duration-300" />
                </a>
             </div>
          </FadeUp>
        </div>

        <div>
          <FadeUp delay={0.3}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-text-secondary mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-text-secondary mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-text-secondary mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <MagneticButton className="bg-text-primary text-bg-primary hover:bg-accent-gold" strength={30}>
                  Send Message <span className="ml-2">↗</span>
                </MagneticButton>
              </div>
            </form>
          </FadeUp>

          {/* Mobile links */}
          <FadeUp delay={0.4} className="mt-16 flex flex-wrap gap-6 lg:hidden">
            <a href="mailto:phanthanhhung.main@gmail.com" className="flex items-center gap-2 font-mono text-sm border border-border px-4 py-2 rounded-full hover:border-accent-gold">
               <Mail className="w-4 h-4" /> Email
            </a>
            <a href="#" className="flex items-center gap-2 font-mono text-sm border border-border px-4 py-2 rounded-full hover:border-[#0077b5]">
               <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 font-mono text-sm border border-border px-4 py-2 rounded-full hover:border-text-primary">
               <Github className="w-4 h-4" /> GitHub
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
