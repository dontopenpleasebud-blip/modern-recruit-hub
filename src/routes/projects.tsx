import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { PageTransition, Reveal, SectionHeading } from "@/components/Reveal";
import { projects, type Project } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [active, setActive] = useState<Project | null>(null);

  return (
    <PageTransition>
      <SectionHeading
        eyebrow="What I've built"
        title="Selected"
        accent="projects"
        description="Full stack applications, dashboards and APIs — each one built end to end, deployed and documented on GitHub. Tap any card for the full case."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <motion.article
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(p);
                }
              }}
              className="surface-card surface-card-hover group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary/40">
                <img
                  src={p.image}
                  alt={`${p.title} — project screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-5 md:p-6">
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {p.date}
                </span>
                <h2 className="mt-1.5 text-base leading-snug transition-colors group-hover:text-primary sm:text-xl md:text-2xl">
                  {p.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm sm:line-clamp-none">
                  {p.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary/90 transition-transform duration-300 group-hover:translate-x-0.5 sm:text-sm">
                  View details <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="surface-card max-h-[88vh] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto rounded-2xl p-0">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary/40">
                  <img
                    src={active.image}
                    alt={`${active.title} — project screenshot`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {active.date}
                  </span>
                  <DialogTitle className="mt-2 text-2xl sm:text-3xl">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {active.desc}
                  </DialogDescription>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github size={16} /> Source code
                    </a>
                    {active.live && (
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <ExternalLink size={16} /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
