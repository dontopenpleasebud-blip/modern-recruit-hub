import { Award, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import { certifications } from "@/data/portfolio";

export default function CertificationsSection() {
  return (
    <Section id="certifications">
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
              <h3 className="mt-5 text-lg leading-snug transition-colors group-hover:text-primary">
                {c.title}
              </h3>
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
    </Section>
  );
}
