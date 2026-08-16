import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </span>
      <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
        {title} {accent && <span className="text-gradient italic">{accent}</span>}
      </h1>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32"
    >
      {children}
    </motion.main>
  );
}
