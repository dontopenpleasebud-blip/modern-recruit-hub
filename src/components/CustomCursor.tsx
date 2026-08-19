import { useEffect, useRef, useState } from "react";

/**
 * Amber dot + trailing ring cursor that matches the particle background.
 * Desktop / fine-pointer only, disabled for reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };

    const interactive = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = e.target as Element | null;
      setHovering(Boolean(el?.closest?.(interactive)));
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 240ms ease" }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border"
        style={{
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          borderColor: "var(--particle-color)",
          backgroundColor: hovering ? "color-mix(in oklab, var(--primary) 10%, transparent)" : "transparent",
          boxShadow: "0 0 24px -6px var(--particle-color)",
          transition: "width 220ms cubic-bezier(.22,1,.36,1), height 220ms cubic-bezier(.22,1,.36,1), background-color 220ms ease",
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-primary"
        style={{
          width: pressed ? 10 : hovering ? 4 : 6,
          height: pressed ? 10 : hovering ? 4 : 6,
          transition: "width 160ms ease, height 160ms ease",
        }}
      />
    </div>
  );
}
