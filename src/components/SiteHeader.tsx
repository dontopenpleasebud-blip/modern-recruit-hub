import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: bar, backgroundImage: "var(--gradient-primary)" }}
        className="h-[2px] origin-left"
      />
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link to="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
              KB
            </span>
            <span className="hidden font-display text-lg sm:block">
              {profile.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-secondary"
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                      {l.label}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 sm:inline-flex"
            >
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-4 sm:px-8">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={l.to}
                    className="block border-b border-border/60 py-3 text-lg text-muted-foreground"
                    activeProps={{ className: "text-primary" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
