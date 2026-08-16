import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageTransition, Reveal, SectionHeading } from "@/components/Reveal";
import { profile, stats } from "@/data/portfolio";

const title = "About Katakam Bhargav — CS Student & Full Stack Developer";
const description =
  "Learn about Katakam Bhargav: final-year Computer Science student, full stack developer and data enthusiast based in Andhra Pradesh, India. Download the résumé.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const details = [
  { label: "Full name", value: profile.name },
  { label: "Date of birth", value: profile.dob },
  { label: "Email", value: profile.email },
  { label: "Phone", value: profile.phone },
  { label: "Location", value: profile.location },
  { label: "Languages", value: profile.languages },
];

function About() {
  return (
    <PageTransition>
      <SectionHeading
        eyebrow="Get to know me"
        title="About"
        accent="me"
        description="A short version of who I am, what I work on, and how to reach me."
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.05}>
                <div className="border-l border-border pl-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {d.label}
                  </p>
                  <p className="mt-1 text-sm break-words">{d.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <FileText size={16} /> View résumé
            </a>
            <a
              href={profile.resume}
              download="KATAKAM_BHARGAV_RESUME.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Download size={16} /> Download
            </a>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.1}>
            <div className="surface-card overflow-hidden rounded-3xl">
              <img
                src={profile.photo}
                alt="Katakam Bhargav working as a full stack developer"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </Reveal>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.06}>
                <div className="surface-card surface-card-hover rounded-2xl p-4">
                  <p className="font-display text-3xl text-gradient">{s.num}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
