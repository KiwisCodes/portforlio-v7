import { useState } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { FadeUp } from "../animations/FadeUp";
import { MagneticButton } from "../animations/MagneticButton";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { DecorativeSquiggle, SQUIGGLE_PATHS } from "../ui/DecorativeSquiggle";

export function Contact() {
  const GITHUB_URL = "https://github.com/KiwisCodes";
  const LINKEDIN_URL = "https://www.linkedin.com/in/th%C3%A0nh-h%C6%B0ng-phan-05397b327/";

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "missing_key">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!ACCESS_KEY) {
      console.error("Web3Forms Error: Access Key is missing in .env file.");
      setStatus("missing_key");
      return;
      
    }

    setStatus("sending");
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormValues({ name: "", email: "", message: "" });
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms Error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto bg-transparent relative overflow-hidden">
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.sCurve}
        width={300}
        height={100}
        className="absolute top-8 left-10 opacity-20 pointer-events-none hidden md:block"
        duration={2.5}
        delay={0.2}
      />
      <DecorativeSquiggle
        path={SQUIGGLE_PATHS.star}
        width={100}
        height={100}
        className="absolute bottom-16 right-16 opacity-30 pointer-events-none hidden lg:block"
        duration={2}
        delay={0.6}
      />
      <SectionTitle num="06" title="Let's Connect" />

      {/* Morphing Mesh Gradient shape inside contact section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute top-[20%] left-[-20%] w-[60%] aspect-square rounded-full bg-accent-gold blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 relative z-10">
        
        {/* Left Column: Typographic intro and social links */}
        <div className="flex flex-col justify-between">
          <div>
            <FadeUp>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-8 text-text-primary leading-tight max-w-md">
                Let's build <br />
                something <span className="text-accent-gold italic">significant</span>.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-text-secondary leading-relaxed mb-12 max-w-md">
                Have a project in mind, or just want to say hello? Whether it's
                about software architecture, frontend design, or a potential
                collaboration, I'm always open to talking.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="space-y-5 hidden lg:block pb-4">
            {/* Email link */}
            <div className="flex items-center gap-5 group select-none">
              <div className="w-11 h-11 rounded-xl border border-border/80 flex items-center justify-center transition-all duration-300 bg-bg-secondary/40 backdrop-blur-sm group-hover:bg-accent-gold group-hover:border-accent-gold group-hover:text-bg-primary group-hover:scale-105">
                <Mail className="w-4 h-4" />
              </div>
              <a
                href="mailto:phanthanhhung.main@gmail.com"
                className="text-md font-mono text-text-secondary hover:text-accent-gold transition-colors duration-300"
              >
                phanthanhhung.main@gmail.com
              </a>
            </div>

            {/* LinkedIn link */}
            <div className="flex items-center gap-5 group select-none">
              <div className="w-11 h-11 rounded-xl border border-border/80 flex items-center justify-center transition-all duration-300 bg-bg-secondary/40 backdrop-blur-sm group-hover:bg-[#0077b5] group-hover:border-[#0077b5] group-hover:text-white group-hover:scale-105">
                <Linkedin className="w-4 h-4" />
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="text-md font-mono text-text-secondary hover:text-text-primary transition-colors duration-300 relative overflow-hidden group/link flex items-center gap-1.5"
              >
                LinkedIn Profile
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* GitHub link */}
            <div className="flex items-center gap-5 group select-none">
              <div className="w-11 h-11 rounded-xl border border-border/80 flex items-center justify-center transition-all duration-300 bg-bg-secondary/40 backdrop-blur-sm group-hover:bg-text-primary group-hover:border-text-primary group-hover:text-bg-primary group-hover:scale-105">
                <Github className="w-4 h-4" />
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-md font-mono text-text-secondary hover:text-text-primary transition-colors duration-300 relative overflow-hidden group/link flex items-center gap-1.5"
              >
                GitHub Profile
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Luxury Minimal Glass Form Card */}
        <div className="relative">
          <FadeUp delay={0.3}>
            <div className="rounded-2xl border border-border bg-bg-secondary/25 backdrop-blur-md p-8 sm:p-10 shadow-xl relative">
              <form className="space-y-8" onSubmit={handleSubmit}>
                
                {/* Name Field (Floating label) */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-border/70 py-2.5 focus:outline-none focus:border-accent-gold transition-colors text-text-primary text-sm pt-5"
                    placeholder=""
                  />
                  <motion.label
                    htmlFor="name"
                    animate={{
                      y: (focusedField === "name" || formValues.name) ? -16 : 8,
                      scale: (focusedField === "name" || formValues.name) ? 0.8 : 1,
                      color: (focusedField === "name") ? "var(--color-accent-gold)" : "var(--color-text-secondary)"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute left-0 text-sm font-mono pointer-events-none origin-left text-text-secondary"
                  >
                    Name
                  </motion.label>
                </div>

                {/* Email Field (Floating label) */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-border/70 py-2.5 focus:outline-none focus:border-accent-gold transition-colors text-text-primary text-sm pt-5"
                    placeholder=""
                  />
                  <motion.label
                    htmlFor="email"
                    animate={{
                      y: (focusedField === "email" || formValues.email) ? -16 : 8,
                      scale: (focusedField === "email" || formValues.email) ? 0.8 : 1,
                      color: (focusedField === "email") ? "var(--color-accent-gold)" : "var(--color-text-secondary)"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute left-0 text-sm font-mono pointer-events-none origin-left text-text-secondary"
                  >
                    Email Address
                  </motion.label>
                </div>

                {/* Message Field (Floating label) */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-border/70 py-2.5 focus:outline-none focus:border-accent-gold transition-colors text-text-primary text-sm pt-5 resize-none"
                    placeholder=""
                  />
                  <motion.label
                    htmlFor="message"
                    animate={{
                      y: (focusedField === "message" || formValues.message) ? -16 : 8,
                      scale: (focusedField === "message" || formValues.message) ? 0.8 : 1,
                      color: (focusedField === "message") ? "var(--color-accent-gold)" : "var(--color-text-secondary)"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute left-0 text-sm font-mono pointer-events-none origin-left text-text-secondary"
                  >
                    Your Message
                  </motion.label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-left">
                    {status === "success" && (
                      <div className="flex items-center gap-2 text-green-500 font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-left-4">
                        <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
                        <span>Message sent successfully!</span>
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-500 font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-left-4">
                        <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                        <span>Something went wrong. Try again.</span>
                      </div>
                    )}
                    {status === "missing_key" && (
                      <div className="flex items-center gap-2 text-amber-500 font-medium text-[10px] sm:text-xs animate-in fade-in slide-in-from-left-4">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Dev Note: Please restart server and check .env</span>
                      </div>
                    )}
                  </div>

                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    className="flex-shrink-0"
                  >
                    <MagneticButton
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-text-primary text-bg-primary hover:bg-accent-gold disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] py-3 shadow-lg rounded-xl text-sm font-semibold transition-colors duration-300"
                      strength={30}
                    >
                      {status === "sending" ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </span>
                      ) : (
                        <>
                          Send Message <span className="ml-1">↗</span>
                        </>
                      )}
                    </MagneticButton>
                  </motion.div>
                </div>
              </form>
            </div>
          </FadeUp>

          {/* Mobile links */}
          <FadeUp delay={0.4} className="mt-12 flex flex-wrap gap-4 lg:hidden justify-center">
            <a
              href="mailto:phanthanhhung.main@gmail.com"
              className="flex items-center gap-2 font-mono text-xs border border-border/80 px-4 py-2 rounded-full hover:border-accent-gold text-text-secondary"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs border border-border/80 px-4 py-2 rounded-full hover:border-[#0077b5] text-text-secondary"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs border border-border/80 px-4 py-2 rounded-full hover:border-text-primary text-text-secondary"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
