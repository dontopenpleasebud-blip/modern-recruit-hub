import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github, MonitorPlay, ImageIcon } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import { projects, type Project } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [mode, setMode] = useState<"shot" | "live">("shot");

  const open = (p: Project) => {
    setMode("shot");
    setActive(p);
  };

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="What I've built"
        title="Selected"
        accent="projects"
        description="Full stack applications, dashboards and APIs — each one built end to end, deployed and documented on GitHub. Tap any card to preview it live, right here."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <motion.article
              whileTap={{ scale: 0.97 }}
              onClick={() => open(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(p);
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
              <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {p.date}
                </span>
                <h3 className="mt-1.5 text-base leading-snug transition-colors group-hover:text-primary sm:text-lg">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
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
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs text-primary/90 transition-transform duration-300 group-hover:translate-x-0.5">
                  View details <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="surface-card flex h-[88vh] max-h-[88vh] w-[calc(100%-1.5rem)] max-w-5xl flex-col overflow-hidden rounded-2xl p-0 sm:h-[86vh]">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-0 flex-1 flex-col lg:flex-row"
              >
                {/* Preview pane */}
                <div className="relative min-h-0 flex-1 overflow-hidden border-b border-border bg-secondary/40 lg:border-b-0 lg:border-r">
                  {mode === "live" && active.live ? (
                    <iframe
                      src={active.live}
                      title={`${active.title} — live preview`}
                      loading="lazy"
                      className="h-full w-full bg-background"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  ) : (
                    <img
                      src={active.image}
                      alt={`${active.title} — project screenshot`}
                      className="h-full w-full object-cover object-top"
                    />
                  )}

                  {active.live && (
                    <div className="absolute left-3 top-3 flex gap-1 rounded-full border border-border bg-background/80 p-1 backdrop-blur">
                      <button
                        type="button"
                        onClick={() => setMode("shot")}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                          mode === "shot"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <ImageIcon size={12} /> Shot
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("live")}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
                          mode === "live"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <MonitorPlay size={12} /> Live
                      </button>
                    </div>
                  )}
                </div>

                {/* Details pane */}
                <div className="flex min-h-0 shrink-0 flex-col overflow-y-auto p-5 sm:p-6 lg:w-[22rem] xl:w-[24rem]">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {active.date}
                  </span>
                  <DialogTitle className="mt-2 text-2xl">{active.title}</DialogTitle>
                  <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {active.desc}
                  </DialogDescription>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 pt-1">
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github size={16} /> Source
                    </a>
                    {active.live && (
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <ExternalLink size={16} /> Open
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
