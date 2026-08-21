import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendContactMessage } from "@/lib/contact.functions";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

export default function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    if (payload.name.trim().length < 2 || payload.message.trim().length < 10) {
      setStatus({ kind: "error", msg: "Please add your name and a short message." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await send({ data: payload });
      if (res.ok) {
        form.reset();
        setStatus({ kind: "ok", msg: "Message sent — I'll reply within a day." });
      } else {
        setStatus({ kind: "error", msg: res.error });
      }
    } catch {
      setStatus({ kind: "error", msg: "Something went wrong. Please try again." });
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

  return (
    <form onSubmit={onSubmit} className="relative mt-6 grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Your name" className={field} required />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className={field}
          required
        />
      </div>
      <input name="subject" placeholder="Subject (optional)" className={field} />
      <textarea
        name="message"
        rows={4}
        placeholder="Tell me about the role, stack and timeline…"
        className={`${field} resize-none`}
        required
      />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status.kind === "sending" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>
      {status.msg && (
        <p
          className={`text-xs ${status.kind === "ok" ? "text-primary" : "text-destructive"}`}
          role="status"
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
