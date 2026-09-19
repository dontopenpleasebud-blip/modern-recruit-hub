import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const STORAGE_KEY = "kb-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f6f8fc" : "#141827");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const update = () => {
      setTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    };
    // Directional side-wipe of the whole page when supported:
    // light mode sweeps in from the right, dark mode from the left.
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.documentElement.setAttribute("data-theme-wipe", next === "light" ? "from-right" : "from-left");
      document.body.classList.add("theme-wiping");
      const vt = (
        document as Document & {
          startViewTransition: (cb: () => void) => { finished: Promise<void> };
        }
      ).startViewTransition(update);
      vt.finished.finally(() => document.body.classList.remove("theme-wiping"));
    } else {
      update();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: -14, opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
