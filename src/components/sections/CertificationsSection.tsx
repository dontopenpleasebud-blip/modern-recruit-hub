import { useState } from "react";
import { Award, ExternalLink, Eye } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Section from "@/components/sections/Section";
import DocPreview from "@/components/DocPreview";
import { certifications } from "@/data/portfolio";

type Cert = (typeof certifications)[number];

export default function CertificationsSection() {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Verified learning"
        title="Certifications &"
        accent="badges"
        description="Credentials from AWS Academy, Credly and Cognitive Class — preview each one right here, or open the verifiable original."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => setActive(c)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(c);
                }
              }}
              className="surface-card surface-card-hover group flex h-full cursor-pointer flex-col rounded-2xl p-6 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
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
                <span className="inline-flex items-center gap-1.5 text-sm text-primary/90">
                  <Eye size={15} /> Preview
                </span>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink size={15} /> Verify
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <DocPreview
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
        title={active?.title ?? ""}
        subtitle={active ? `${active.issuer} · ${active.year}` : undefined}
        file={active?.file ?? ""}
        link={active?.link}
        linkLabel="Verify original"
      />
    </Section>
  );
}
