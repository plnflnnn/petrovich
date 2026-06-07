import { sendNotificationEmail } from "@/lib/email/send-notification-email";
import type { ErrorReportPayload } from "@/lib/errors/error-report-schema";

const KIND_LABELS: Record<ErrorReportPayload["kind"], string> = {
  "react-boundary": "React Error Boundary",
  "global-boundary": "Global Error Boundary",
  "window-error": "Ошибка в браузере",
  "unhandled-rejection": "Необработанный Promise",
  api: "Ошибка API",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatErrorEmail(payload: ErrorReportPayload): string {
  const occurredAt = payload.occurredAt || new Date().toISOString();

  return [
    "Ошибка на сайте «У Петровича»",
    "",
    `Время: ${occurredAt}`,
    `Тип: ${KIND_LABELS[payload.kind]}`,
    `Страница: ${payload.page || "—"}`,
    `Компонент: ${payload.component || "—"}`,
    `Digest: ${payload.digest || "—"}`,
    `User-Agent: ${payload.userAgent || "—"}`,
    "",
    "Сообщение:",
    payload.message,
    "",
    "Stack:",
    payload.stack || "—",
  ].join("\n");
}

export async function sendErrorAlert(
  payload: ErrorReportPayload,
): Promise<{ ok: true } | { ok: false }> {
  if (process.env.NODE_ENV !== "production") {
    console.error("[error-report]", payload);
    return { ok: true };
  }

  const text = formatErrorEmail(payload);
  const html = `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(text)}</pre>`;

  const sent = await sendNotificationEmail({
    subject: `Ошибка на сайте — ${payload.page || payload.kind}`,
    text,
    html,
  });

  return sent.ok ? { ok: true } : { ok: false };
}
