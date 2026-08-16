import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { profile, projects, stats } from "@/data/portfolio";

const title = "Katakam Bhargav — Full Stack Developer & Data Analyst";
const description =
  "Portfolio of Katakam Bhargav, a final-year Computer Science student and full stack developer skilled in React, Node.js, Java and Python. Explore projects, experience and certifications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Katakam Bhargav, full stack developer portfolio, React developer India, Node.js developer, Java developer intern, data analyst, student portfolio, fresher software engineer, Andhra Pradesh developer",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Full Stack Developer",
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          url: "/",
          image: profile.photo,
          sameAs: [profile.github, profile.linkedin],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Palakollu",
            addressRegion: "Andhra Pradesh",
            addressCountry: "IN",
          },
          knowsAbout: [
            "React",
            "Node.js",
            "Express.js",
            "Java",
            "Python",
            "MongoDB",
            "MySQL",
            "Data Analysis",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

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

function Home() {
  const typed = useTypedRole();

  return (
    <PageTransition>
      <section className="relative grid items-center gap-14 pb-8 lg:grid-cols-[1.15fr_0.85fr]">
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
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
            >
              View projects
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Hire me <Mail size={16} />
            </Link>
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
      </section>

      <section aria-label="Highlights" className="mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
      </section>

      <section className="mt-28">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-primary">
              Selected work
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Things I've <span className="text-gradient italic">shipped</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            All projects <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="surface-card surface-card-hover group h-full overflow-hidden rounded-2xl">
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary/40">
                  <img
                    src={p.image}
                    alt={`${p.title} project screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-primary"
          >
            All projects <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <Reveal className="mt-28">
        <div className="surface-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 glow-bg" />
          <h2 className="relative text-3xl sm:text-4xl">
            Looking for a developer who <span className="text-gradient italic">ships</span>?
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            I'm open to internships and entry-level software engineering roles. Let's talk
            about what you're building.
          </p>
          <Link
            to="/contact"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight size={17} />
          </Link>
        </div>
      </Reveal>
    </PageTransition>
  );
}
