import { Briefcase, GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import { education, experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="My journey"
        title="Experience &"
        accent="education"
        description="Where I've worked, what I delivered, and the academic path behind it."
      />

      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase size={18} />
            </span>
            <h3 className="text-2xl">Work</h3>
          </Reveal>

          <ol className="relative space-y-8 border-l border-border pl-7">
            {experience.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <li className="relative">
                  <span className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                    {item.date}
                  </p>
                  <h4 className="mt-2 text-xl">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary/60"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div>
          <Reveal className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap size={18} />
            </span>
            <h3 className="text-2xl">Education</h3>
          </Reveal>

          <ol className="relative space-y-8 border-l border-border pl-7">
            {education.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <li className="relative">
                  <span className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                      {item.date}
                    </p>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xl">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
