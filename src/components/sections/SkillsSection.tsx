import { motion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="What I know"
        title="Skills &"
        accent="stack"
        description="The languages, frameworks and tools I use day to day to design, build and deploy applications."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <div className="surface-card surface-card-hover h-full rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl">{s.name}</h3>
                <span className="font-mono text-sm text-primary">{s.pct}%</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.tech}</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full origin-left rounded-full"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: s.pct / 100 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
