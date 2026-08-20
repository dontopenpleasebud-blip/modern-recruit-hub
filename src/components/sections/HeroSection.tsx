import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import { profile, stats } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";

function useTypedRole() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = profile.roles[i] ?? "";
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
      } else {
        t = setTimeout(() => setDeleting(true), 1600);
      }
    } else if (text.length > 0) {
      t = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    } else {
      setDeleting(false);
      setI((p) => (p + 1) % profile.roles.length);
      return;
    }
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return text;
}

export default function HeroSection() {
  const typed = useTypedRole();

  return (
    <Section id="home" className="pt-28 sm:pt-32">
      <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 glow-bg" />

        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {profile.status}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.6rem,8vw,5rem)] leading-[0.98]">
            {"Katakam".split("").map((c, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient inline-block italic"
            >
              Bhargav
            </motion.span>
          </h1>

          <p className="mt-5 font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-primary">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-primary align-middle" />
          </p>

          <Reveal delay={0.2} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
            >
              View projects
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Hire me <Mail size={16} />
            </a>
            <div className="flex gap-2">
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="surface-card overflow-hidden rounded-3xl">
            <img
              src={profile.photo}
              alt="Portrait of Katakam Bhargav, full stack developer"
              width={640}
              height={800}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-2xl border border-primary/20 animate-float-slow" />
          <div className="surface-card absolute -bottom-5 left-4 rounded-2xl px-4 py-3 backdrop-blur-xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Based in
            </p>
            <p className="text-sm">Andhra Pradesh, India</p>
          </div>
        </motion.div>
      </div>

      <div
        aria-label="Highlights"
        className="mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div className="surface-card surface-card-hover h-full rounded-2xl p-5">
              <p className="font-display text-4xl text-gradient">{s.num}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
