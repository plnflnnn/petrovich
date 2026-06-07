import { Resend } from "resend";

const DEFAULT_TO =
  process.env.CONTACT_EMAIL_TO?.trim();

type SendNotificationEmailInput = {
  subject: string;
  text: string;
  html?: string;
  to?: string;
};

export type SendNotificationEmailResult =
  | { ok: true }
  | { ok: false; error: "not_configured" | "send_failed" };

export async function sendNotificationEmail(
  input: SendNotificationEmailInput,
): Promise<SendNotificationEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "onboarding@resend.dev";

  if (!apiKey) {
    console.log("[email] RESEND_API_KEY missing — subject:", input.subject);
    if (process.env.NODE_ENV === "development") {
      return { ok: true };
    }
    return { ok: false, error: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [input.to?.trim() || DEFAULT_TO],
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { ok: false, error: "send_failed" };
  }

  return { ok: true };
}
