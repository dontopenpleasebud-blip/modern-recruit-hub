import { useState } from "react";
import { Check, Copy } from "lucide-react";

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await writeClipboard(value);
        if (!ok) return;
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
      }}
      aria-label={`${label}: ${value.slice(0, 40)}`}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
        done
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
      } ${className}`}
    >
      {done ? <Check size={13} /> : <Copy size={13} />}
      {done ? "Copied" : label}
    </button>
  );
}

export default function CopyField({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <CopyButton value={value} />
      </div>
      <p
        className={`mt-2 select-all break-words text-sm text-foreground ${
          multiline ? "leading-relaxed" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
