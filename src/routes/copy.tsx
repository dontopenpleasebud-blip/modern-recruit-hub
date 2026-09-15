import { createFileRoute } from "@tanstack/react-router";
import CopyField, { CopyButton } from "@/components/CopyField";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/data/portfolio";

export const Route = createFileRoute("/copy")({
  head: () => ({
    meta: [
      { title: "Copy Sheet — Katakam Bhargav" },
      {
        name: "description",
        content:
          "Private copy-friendly sheet of Katakam Bhargav's portfolio details for filling job and internship application forms.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Copy Sheet — Katakam Bhargav" },
      {
        property: "og:description",
        content: "Copy-friendly version of the portfolio for application forms.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CopyPage,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function CopyPage() {
  const skillsAll = skills.map((s) => `${s.name}: ${s.tech}`).join("\n");
  const techAll = Array.from(new Set(projects.flatMap((p) => p.tags))).join(", ");

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-primary">
        Private copy sheet
      </p>
      <h1 className="mt-3 text-4xl">
        Everything, <span className="text-gradient italic">copyable</span>
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Tap any Copy button to put that exact text on your clipboard, then paste it straight
        into an application form. Not linked anywhere on the site and not indexed by search
        engines.
      </p>

      <Block title="Personal">
        <CopyField label="Full name" value={profile.name} />
        <CopyField label="Email" value={profile.email} />
        <CopyField label="Phone" value={profile.phone} />
        <CopyField label="Date of birth" value={profile.dob} />
        <CopyField label="Location" value={profile.location} />
        <CopyField label="Languages" value={profile.languages} />
        <CopyField label="Current status" value={profile.status} />
        <CopyField label="Headline" value={profile.roles.join(" · ")} />
        <CopyField label="Tagline" value={profile.tagline} multiline />
        <CopyField label="Professional summary" value={profile.summary} multiline />
      </Block>

      <Block title="Links">
        <CopyField label="GitHub" value={profile.github} />
        <CopyField label="LinkedIn" value={profile.linkedin} />
        <CopyField label="Portfolio website" value="https://modern-recruit-hub.lovable.app" />
        <CopyField
          label="Résumé (PDF)"
          value={`https://modern-recruit-hub.lovable.app${profile.resume}`}
        />
      </Block>

      <Block title="Skills">
        <CopyField label="All skills (one per line)" value={skillsAll} multiline />
        <CopyField label="All technologies (comma separated)" value={techAll} />
        {skills.map((s) => (
          <CopyField key={s.name} label={s.name} value={s.tech} />
        ))}
      </Block>

      <Block title="Projects">
        {projects.map((p) => (
          <article key={p.title} className="surface-card rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="select-all text-lg">{p.title}</h3>
                <p className="mt-1 select-all font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.date}
                </p>
              </div>
              <CopyButton value={p.title} label="Title" />
            </div>

            <p className="mt-3 select-all text-sm leading-relaxed text-muted-foreground">
              {p.desc}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value={p.desc} label="Description" />
              <CopyButton value={p.tags.join(", ")} label="Tech stack" />
              <CopyButton value={p.github} label="GitHub link" />
              {p.live && <CopyButton value={p.live} label="Live link" />}
              <CopyButton
                value={`${p.title} (${p.date})\n${p.desc}\nTech: ${p.tags.join(", ")}\nCode: ${p.github}${
                  p.live ? `\nLive: ${p.live}` : ""
                }`}
                label="Everything"
              />
            </div>
          </article>
        ))}
      </Block>

      <Block title="Experience">
        <div className="surface-card rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Copy every experience bullet across all roles in one go.
            </p>
            <CopyButton
              value={experience
                .map(
                  (e) =>
                    `${e.title} — ${e.org} (${e.date})\n${e.points.map((p) => `• ${p}`).join("\n")}`
                )
                .join("\n\n")}
              label="Copy all descriptions"
            />
          </div>
        </div>

        {experience.map((e) => (
          <article key={e.title} className="surface-card rounded-2xl p-5">
            <h3 className="select-all text-lg">{e.title}</h3>
            <p className="mt-1 select-all text-sm text-muted-foreground">{e.org}</p>
            <p className="mt-1 select-all font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
              {e.date}
            </p>
            <ul className="mt-3 space-y-2">
              {e.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-start justify-between gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="select-all">{pt}</span>
                  <CopyButton value={pt} label="Copy" />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value={e.title} label="Role" />
              <CopyButton value={e.org} label="Company" />
              <CopyButton value={e.date} label="Dates" />
              <CopyButton
                value={`${e.title}\n${e.org}\n${e.date}\n${e.points.map((p) => `• ${p}`).join("\n")}`}
                label="Everything"
              />
              <CopyButton
                value={e.points.map((p) => `• ${p}`).join("\n")}
                label="All points"
              />
            </div>
          </article>
        ))}
      </Block>

      <Block title="Education">
        {education.map((ed) => (
          <article key={ed.title} className="surface-card rounded-2xl p-5">
            <h3 className="select-all text-lg">{ed.title}</h3>
            <p className="mt-1 select-all text-sm text-muted-foreground">{ed.org}</p>
            <p className="mt-1 select-all text-sm text-muted-foreground">
              {ed.date} · {ed.badge}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value={ed.title} label="Course" />
              <CopyButton value={ed.org} label="Institution" />
              <CopyButton value={ed.date} label="Dates" />
              <CopyButton value={ed.badge} label="Score" />
              <CopyButton
                value={`${ed.title}\n${ed.org}\n${ed.date} · ${ed.badge}`}
                label="Everything"
              />
            </div>
          </article>
        ))}
      </Block>

      <Block title="Certifications">
        {certifications.map((c) => (
          <article key={c.title} className="surface-card rounded-2xl p-5">
            <h3 className="select-all text-lg">{c.title}</h3>
            <p className="mt-1 select-all text-sm text-muted-foreground">
              {c.issuer} · {c.year}
            </p>
            <p className="mt-2 select-all break-all text-xs text-muted-foreground">{c.link}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value={c.title} label="Name" />
              <CopyButton value={c.issuer} label="Issuer" />
              <CopyButton value={c.year} label="Year" />
              <CopyButton value={c.link} label="Credential link" />
              <CopyButton
                value={`${c.title} — ${c.issuer} (${c.year})\n${c.link}`}
                label="Everything"
              />
            </div>
          </article>
        ))}
      </Block>

      <Block title="Ready-made answers">
        <CopyField
          label="Why hire me (short)"
          value={`I am a final-year Computer Science student with six months of Java web development internship experience and freelance delivery of a production billing system. I build full-stack applications with React, Node.js, Express and MongoDB, and I am comfortable owning a feature end to end — from REST API design to deployment on Nginx and PM2.`}
          multiline
        />
        <CopyField
          label="Cover letter opener"
          value={`Dear Hiring Team,\n\nI am Katakam Bhargav, a final-year Computer Science engineering student and full stack developer. I have shipped production web applications using React, Node.js, Express and MongoDB, and I would love to bring that hands-on experience to your team.`}
          multiline
        />
        <CopyField
          label="One-line bio"
          value="Katakam Bhargav — Full Stack Developer & Data Analyst | React, Node.js, Java, Python"
        />
      </Block>
    </main>
  );
}
