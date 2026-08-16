import { createFileRoute } from "@tanstack/react-router";
import { Award, ExternalLink } from "lucide-react";
import { PageTransition, Reveal, SectionHeading } from "@/components/Reveal";
import { certifications } from "@/data/portfolio";

const title = "Certifications — Katakam Bhargav | AWS, Python & Data Science";
const description =
  "Verified certifications earned by Katakam Bhargav, including AWS Academy Data Engineering, Data Analysis with Python, Data Visualization with Python and Python 101 for Data Science.";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/certifications" },
    ],
    links: [{ rel: "canonical", href: "/certifications" }],
  }),
  component: Certifications,
});

function Certifications() {
  return (
    <PageTransition>
      <SectionHeading
        eyebrow="Verified learning"
        title="Certifications &"
        accent="badges"
        description="Credentials from AWS Academy, Credly and Cognitive Class — each one links to the verifiable original."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <article className="surface-card surface-card-hover group flex h-full flex-col rounded-2xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award size={20} />
              </span>
              <h2 className="mt-5 text-lg leading-snug transition-colors group-hover:text-primary">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {c.issuer} · {c.year}
              </p>
              <div className="mt-auto flex flex-wrap gap-4 pt-6">
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink size={15} /> Verify
                </a>
                <a
                  href={c.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Preview
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageTransition>
  );
}
