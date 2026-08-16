import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAME = "KATAKAM BHARGAV";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 320);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background grain"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 glow-bg" />

          <div className="relative flex flex-wrap justify-center px-6">
            {NAME.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.06 * i,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[clamp(1.9rem,7vw,4.5rem)] leading-none"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mt-8 flex w-[min(78vw,22rem)] items-center gap-4"
          >
            <div className="h-px flex-1 overflow-hidden bg-border">
              <motion.div
                className="h-full origin-left"
                style={{ backgroundImage: "var(--gradient-primary)" }}
                animate={{ scaleX: progress / 100 }}
                initial={{ scaleX: 0 }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative mt-4 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground"
          >
            Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
