import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import { profile, projects } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";

const title = "Katakam Bhargav — Full Stack Developer & Data Analyst";
const description =
  "Portfolio of Katakam Bhargav, a final-year Computer Science student and full stack developer skilled in React, Node.js, Java and Python. Projects, experience, skills, certifications and contact — all on one page.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Katakam Bhargav, full stack developer portfolio, React developer India, Node.js developer, Java developer intern, data analyst, student portfolio, fresher software engineer, Andhra Pradesh developer",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Full Stack Developer",
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          url: "/",
          image: profile.photo,
          sameAs: [profile.github, profile.linkedin],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Palakollu",
            addressRegion: "Andhra Pradesh",
            addressCountry: "IN",
          },
          knowsAbout: [
            "React",
            "Node.js",
            "Express.js",
            "Java",
            "Python",
            "MongoDB",
            "MySQL",
            "Data Analysis",
          ],
        }),
      },
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
  component: Home,
});

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="surface-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 glow-bg" />
            <h2 className="relative text-3xl sm:text-4xl">
              Looking for a developer who <span className="text-gradient italic">ships</span>?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
              I'm open to internships and entry-level software engineering roles. Let's talk
              about what you're building.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Get in touch <ArrowRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </motion.main>
  );
}
