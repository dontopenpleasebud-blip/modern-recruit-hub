import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Award, Briefcase, ExternalLink, GraduationCap, Link2 } from "lucide-react";
import { CopyButton } from "@/components/CopyField";
import Section from "@/components/sections/Section";
import { Reveal, SectionHeading } from "@/components/Reveal";
import {
  certifications,
  education,
  experience,
  navLinks,
  profile,
  projects,
  skills,
  stats,
} from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";

const SITE = "https://modern-recruit-hub.lovable.app";

export const Route = createFileRoute("/copy1")({
  head: () => ({
    meta: [
      { title: "Copy sheet — Katakam Bhargav" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private copy-friendly version of the portfolio." },
    ],
  }),
  component: Copy1Page,
});

/* ---------- building blocks ---------- */

function Copyable({
  value,
  children,
  className = "",
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group/copy flex items-start gap-2 ${className}`}>
      <div className="min-w-0 flex-1 select-all break-words">{children}</div>
      <CopyButton value={value} label="Copy" className="mt-0.5" />
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  return (
    <div className="surface-card rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ExternalLink size={13} /> Open
          </a>
          <CopyButton value={href} />
        </div>
      </div>
      <p className="mt-2 select-all break-all font-mono text-xs text-foreground">{href}</p>
    </div>
  );
}

function CopyNav() {
  const [active, setActive] = useState("home");
  const ids = navLinks.map((n) => n.to);

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0]!;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-8">
        <span className="shrink-0 rounded-full border border-primary/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">
          Copy mode
        </span>
        <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((l) => (
            <button
              key={l.to}
              type="button"
              onClick={() => scrollToSection(l.to)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                active === l.to
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------- page ---------- */

function Copy1Page() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <CopyNav />

      {/* HERO */}
      <Section id="home" className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {profile.status}
              </span>
              <CopyButton value={profile.status} />
            </div>

            <div className="mt-6 space-y-3">
              <Copyable value={first ?? ""}>
                <h1 className="text-[clamp(2.2rem,7vw,4rem)] leading-[1]">{first}</h1>
              </Copyable>
              <Copyable value={last}>
                <p className="text-gradient font-display text-[clamp(2.2rem,7vw,4rem)] italic leading-[1]">
                  {last}
                </p>
              </Copyable>
              <Copyable value={profile.name}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Full name · {profile.name}
                </p>
              </Copyable>
            </div>

            <div className="mt-6 space-y-3">
              {profile.roles.map((r) => (
                <Copyable key={r} value={r}>
                  <p className="font-mono text-sm text-primary">{r}</p>
                </Copyable>
              ))}
              <Copyable value={profile.roles.join(" · ")}>
                <p className="font-mono text-xs text-muted-foreground">
                  All roles · {profile.roles.join(" · ")}
                </p>
              </Copyable>
            </div>

            <div className="mt-6">
              <Copyable value={profile.tagline}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {profile.tagline}
                </p>
              </Copyable>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="surface-card rounded-2xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-3xl text-gradient">{s.num}</p>
                  <CopyButton value={`${s.num} ${s.label}`} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about">
        <SectionHeading
          eyebrow="Get to know me"
          title="About"
          accent="me"
          description="Every detail below is selectable and has its own copy button."
        />

        <Copyable value={profile.summary} className="mb-8">
          <p className="text-base leading-relaxed text-muted-foreground">{profile.summary}</p>
        </Copyable>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Full name", value: profile.name },
            { label: "Date of birth", value: profile.dob },
            { label: "Email", value: profile.email },
            { label: "Phone", value: profile.phone },
            { label: "Location", value: profile.location },
            { label: "Languages", value: profile.languages },
          ].map((d) => (
            <div key={d.label} className="surface-card rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {d.label}
                </span>
                <CopyButton value={d.value} />
              </div>
              <p className="mt-2 select-all break-words text-sm">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <LinkRow label="GitHub" href={profile.github} />
          <LinkRow label="LinkedIn" href={profile.linkedin} />
          <LinkRow label="Portfolio" href={SITE} />
          <LinkRow label="Résumé (PDF)" href={`${SITE}${profile.resume}`} />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionHeading
          eyebrow="What I've built"
          title="Selected"
          accent="projects"
          description="Full blocks — no popups. Title, description, stack and full links, each copyable."
        />

        <div className="space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="surface-card overflow-hidden rounded-3xl">
                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="border-b border-border bg-secondary/30 lg:border-b-0 lg:border-r">
                    <img
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      loading="lazy"
                      className="h-full max-h-[320px] w-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5 sm:p-7">
                    <Copyable value={p.date}>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {p.date}
                      </span>
                    </Copyable>

                    <Copyable value={p.title} className="mt-2">
                      <h3 className="text-2xl">{p.title}</h3>
                    </Copyable>

                    <Copyable value={p.desc} className="mt-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </Copyable>

                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="select-all rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <CopyButton value={p.tags.join(", ")} label="Stack" />
                    </div>

                    <div className="mt-5 space-y-3">
                      <LinkRow label="GitHub repo" href={p.github} />
                      {p.live && <LinkRow label="Live demo" href={p.live} />}
                    </div>

                    <div className="mt-4">
                      <CopyButton
                        label="Copy everything"
                        value={[
                          p.title,
                          p.date,
                          p.desc,
                          `Tech: ${p.tags.join(", ")}`,
                          `GitHub: ${p.github}`,
                          p.live ? `Live: ${p.live}` : "",
                        ]
                          .filter(Boolean)
                          .join("\n")}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE + EDUCATION */}
      <Section id="experience">
        <SectionHeading
          eyebrow="My journey"
          title="Experience &"
          accent="education"
          description="Roles, bullet points and academics — copy any line or the whole block."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Briefcase size={18} />
                </span>
                <h3 className="text-2xl">Work</h3>
              </div>
              <CopyButton
                label="Copy all experience"
                value={experience
                  .map(
                    (item) =>
                      [item.title, item.org, item.date, ...item.points].join("\n")
                  )
                  .join("\n\n")}
              />
            </div>

            <div className="space-y-5">
              {experience.map((item) => (
                <div key={item.title} className="surface-card rounded-2xl p-5">
                  <Copyable value={item.date}>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                      {item.date}
                    </p>
                  </Copyable>
                  <Copyable value={item.title} className="mt-2">
                    <h4 className="text-lg leading-snug">{item.title}</h4>
                  </Copyable>
                  <Copyable value={item.org} className="mt-1">
                    <p className="text-sm text-muted-foreground">{item.org}</p>
                  </Copyable>
                  <div className="mt-3 space-y-2">
                    {item.points.map((pt) => (
                      <Copyable key={pt} value={pt}>
                        <p className="text-sm leading-relaxed text-muted-foreground">• {pt}</p>
                      </Copyable>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CopyButton label="Copy all descriptions" value={item.points.join("\n")} />
                    <CopyButton
                      label="Copy everything"
                      value={[item.title, item.org, item.date, ...item.points].join("\n")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap size={18} />
              </span>
              <h3 className="text-2xl">Education</h3>
            </div>

            <div className="space-y-5">
              {education.map((item) => (
                <div key={item.title} className="surface-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                      {item.date}
                    </p>
                    <span className="select-all rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                      {item.badge}
                    </span>
                    <CopyButton value={item.badge} label="Score" />
                  </div>
                  <Copyable value={item.title} className="mt-2">
                    <h4 className="text-lg leading-snug">{item.title}</h4>
                  </Copyable>
                  <Copyable value={item.org} className="mt-1">
                    <p className="text-sm text-muted-foreground">{item.org}</p>
                  </Copyable>
                  <Copyable value={item.desc} className="mt-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </Copyable>
                  <div className="mt-4">
                    <CopyButton
                      label="Copy everything"
                      value={[item.title, item.org, item.date, item.badge, item.desc].join("\n")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <SectionHeading
          eyebrow="What I know"
          title="Skills &"
          accent="stack"
          description="Copy a single group or the whole technology list at once."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name} className="surface-card rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg">{s.name}</h3>
                <CopyButton value={`${s.name}: ${s.tech}`} />
              </div>
              <p className="mt-2 select-all text-sm leading-relaxed text-muted-foreground">
                {s.tech}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${s.pct}%`, backgroundImage: "var(--gradient-primary)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <CopyButton
            label="Copy all skills"
            value={skills.map((s) => `${s.name}: ${s.tech}`).join("\n")}
          />
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications">
        <SectionHeading
          eyebrow="Verified learning"
          title="Certifications &"
          accent="badges"
          description="Titles, issuers and full verification links — all copyable."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.title} className="surface-card rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award size={18} />
                </span>
                <CopyButton
                  label="Copy everything"
                  value={`${c.title} — ${c.issuer} (${c.year})\n${c.link}`}
                />
              </div>
              <Copyable value={c.title} className="mt-4">
                <h3 className="text-lg leading-snug">{c.title}</h3>
              </Copyable>
              <Copyable value={`${c.issuer} · ${c.year}`} className="mt-1">
                <p className="text-sm text-muted-foreground">
                  {c.issuer} · {c.year}
                </p>
              </Copyable>
              <div className="mt-4 space-y-3">
                <LinkRow label="Verify link" href={c.link} />
                <LinkRow label="Certificate file" href={`${SITE}${c.file}`} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="pb-28">
        <SectionHeading
          eyebrow="Say hello"
          title="Contact"
          accent="details"
          description="Everything a recruiter form asks for, ready to paste."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Email", value: profile.email },
            { label: "Phone", value: profile.phone },
            { label: "Location", value: profile.location },
            { label: "Availability", value: profile.status },
          ].map((d) => (
            <div key={d.label} className="surface-card rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {d.label}
                </span>
                <CopyButton value={d.value} />
              </div>
              <p className="mt-2 select-all break-words text-sm">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <LinkRow label="Portfolio" href={SITE} />
          <LinkRow label="GitHub" href={profile.github} />
          <LinkRow label="LinkedIn" href={profile.linkedin} />
          <LinkRow label="Résumé (PDF)" href={`${SITE}${profile.resume}`} />
        </div>

        <div className="surface-card mt-8 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link2 size={15} />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">
              One-shot copy
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton
              label="Contact block"
              value={`${profile.name}\n${profile.email}\n${profile.phone}\n${profile.location}\n${profile.github}\n${profile.linkedin}\n${SITE}`}
            />
            <CopyButton
              label="Full profile"
              value={[
                profile.name,
                profile.roles.join(" · "),
                profile.email,
                profile.phone,
                profile.location,
                "",
                profile.summary,
                "",
                "SKILLS",
                ...skills.map((s) => `${s.name}: ${s.tech}`),
                "",
                "PROJECTS",
                ...projects.map(
                  (p) =>
                    `${p.title} (${p.date}) — ${p.desc} | Tech: ${p.tags.join(", ")} | GitHub: ${p.github}${p.live ? ` | Live: ${p.live}` : ""}`,
                ),
                "",
                "EXPERIENCE",
                ...experience.map(
                  (e) => `${e.title} — ${e.org} (${e.date})\n${e.points.map((x) => `- ${x}`).join("\n")}`,
                ),
                "",
                "EDUCATION",
                ...education.map((e) => `${e.title} — ${e.org} (${e.date}) — ${e.badge}`),
                "",
                "CERTIFICATIONS",
                ...certifications.map((c) => `${c.title} — ${c.issuer} (${c.year}) — ${c.link}`),
                "",
                "LINKS",
                `Portfolio: ${SITE}`,
                `GitHub: ${profile.github}`,
                `LinkedIn: ${profile.linkedin}`,
              ].join("\n")}
            />
          </div>
        </div>
      </Section>
    </motion.main>
  );
}
