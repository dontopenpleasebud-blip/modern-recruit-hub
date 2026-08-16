import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PageTransition, Reveal, SectionHeading } from "@/components/Reveal";
import { profile } from "@/data/portfolio";

const title = "Contact Katakam Bhargav — Hire a Full Stack Developer";
const description =
  "Get in touch with Katakam Bhargav for internships, freelance work or full-time software engineering roles. Email, phone and LinkedIn details.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Katakam Bhargav",
          mainEntity: {
            "@type": "Person",
            name: profile.name,
            email: `mailto:${profile.email}`,
            telephone: profile.phone,
          },
        }),
      },
    ],
  }),
  component: Contact,
});

const items = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:+918074200988` },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?cid=18313922350827072918",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/bhargav-katakam",
    href: profile.linkedin,
  },
  { icon: Github, label: "GitHub", value: "github.com/bhargav2006", href: profile.github },
];

function Contact() {
  return (
    <PageTransition>
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build"
        accent="something"
        description="Open to internships, entry-level engineering roles and freelance builds. The fastest way to reach me is email."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={i * 0.06}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="surface-card surface-card-hover flex items-start gap-4 rounded-2xl p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="mt-1 block break-words text-sm">{item.value}</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="surface-card relative flex h-full flex-col justify-center overflow-hidden rounded-3xl p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 glow-bg" />
            <h2 className="relative text-3xl">
              Available for <span className="text-gradient italic">work</span>
            </h2>
            <p className="relative mt-4 text-muted-foreground">
              I reply to every genuine message within a day. Send over the role, the stack
              and the timeline — I'll tell you honestly whether I'm the right fit.
            </p>
            <a
              href={`mailto:${profile.email}?subject=Opportunity%20for%20Katakam%20Bhargav`}
              className="relative mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> Email me
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-3 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Or download my résumé
            </a>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
