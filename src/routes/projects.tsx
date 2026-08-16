import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { PageTransition, Reveal, SectionHeading } from "@/components/Reveal";
import { projects } from "@/data/portfolio";

const title = "Projects — Katakam Bhargav | React, Node.js & MongoDB Builds";
const description =
  "Full stack projects by Katakam Bhargav: mini-Trello real-time task manager, Personal Budget Tracker, StocksApp dashboard, and REST API backends built with React, Node.js and MongoDB.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Projects by Katakam Bhargav",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            description: p.desc,
            url: p.live ?? p.github,
          })),
        }),
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageTransition>
      <SectionHeading
        eyebrow="What I've built"
        title="Selected"
        accent="projects"
        description="Full stack applications, dashboards and APIs — each one built end to end, deployed and documented on GitHub."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <article className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary/40">
                <img
                  src={p.image}
                  alt={`${p.title} — project screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl transition-colors group-hover:text-primary">
                    {p.title}
                  </h2>
                  <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {p.date}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-5 pt-1">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github size={16} /> Code
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink size={16} /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageTransition>
  );
}
