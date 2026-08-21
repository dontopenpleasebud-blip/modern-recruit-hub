import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(140).optional().default(""),
  message: z.string().trim().min(10).max(4000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const to = process.env["CONTACT_TO_EMAIL"];
    const from = process.env["CONTACT_FROM_EMAIL"] ?? "Portfolio <onboarding@resend.dev>";

    if (!apiKey || !to) {
      return {
        ok: false as const,
        error: "Email is not configured yet. Please email me directly for now.",
      };
    }

    const subject = data.subject || `New portfolio message from ${data.name}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "Could not send right now. Try again shortly." };
    }

    return { ok: true as const };
  });
