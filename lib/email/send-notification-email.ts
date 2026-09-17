import { Resend } from "resend";

type SendNotificationEmailInput = {
  subject: string;
  text: string;
  html?: string;
  to?: string;
};

export type SendNotificationEmailResult =
  | { ok: true }
  | { ok: false; error: "not_configured" | "send_failed" };

function resolveTo(inputTo?: string): string | undefined {
  const to = inputTo?.trim() || process.env.CONTACT_EMAIL_TO?.trim();
  return to || undefined;
}

export async function sendNotificationEmail(
  input: SendNotificationEmailInput,
): Promise<SendNotificationEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "onboarding@resend.dev";
  const to = resolveTo(input.to);

  if (!apiKey || !to) {
    console.log(
      "[email] missing config —",
      !apiKey ? "RESEND_API_KEY" : "CONTACT_EMAIL_TO",
      "— subject:",
      input.subject,
    );
    if (process.env.NODE_ENV === "development") {
      return { ok: true };
    }
    return { ok: false, error: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
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
