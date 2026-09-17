import {
  assessContactSpam,
  getClientIp,
  recordContactSubmission,
} from "@/lib/spam/contact-protection";
import {
  contactPayloadSchema,
  normalizePhoneForStorage,
} from "@/lib/validation/contact-form-schema";
import { sendNotificationEmail } from "@/lib/email/send-notification-email";
import { insertRequest } from "@/lib/db/requests";
import { NextResponse } from "next/server";

const SOURCE_LABELS: Record<string, string> = {
  "request-modal": "Всплывающая форма «Оставить заявку»",
  "contact-form": "Форма в разделе «Контакты»",
};

type ContactPayload = {
  at: string;
  source: string;
  name: string;
  phone: string;
  district: string;
  comment: string;
};

function emailSubject(payload: ContactPayload): string {
  const label = SOURCE_LABELS[payload.source] ?? payload.source;
  return `Заявка с сайта «ИП Филина Л.В.» — ${payload.name} (${label})`;
}

function emailText(payload: ContactPayload): string {
  const sourceLine = SOURCE_LABELS[payload.source] ?? payload.source;

  return [
    "Новая заявка с сайта «ИП Филина Л.В.»",
    "",
    `Источник: ${sourceLine}`,
    `Дата: ${payload.at}`,
    "",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Район доставки: ${payload.district}`,
    "",
    "Текст заявки:",
    payload.comment || "—",
  ].join("\n");
}

function emailHtml(payload: ContactPayload): string {
  const escaped = emailText(payload)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap">${escaped}</pre>`;
}

async function sendContactEmail(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: "not_configured" | "send_failed" }> {
  const to = process.env.CONTACT_EMAIL_TO?.trim();
  if (!to) {
    console.log("[contact] CONTACT_EMAIL_TO missing — payload:", payload);
    return { ok: false, error: "not_configured" };
  }

  const sent = await sendNotificationEmail({
    to,
    subject: emailSubject(payload),
    text: emailText(payload),
    html: emailHtml(payload),
  });

  if (!sent.ok) {
    console.log("[contact] email not sent — payload:", payload);
  }

  return sent;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, phone, comment, district, source } = parsed.data;
  const raw = json as Record<string, unknown>;
  const honeypot = typeof raw._hp === "string" ? raw._hp : "";
  const timestamp =
    typeof raw._ts === "number"
      ? raw._ts
      : typeof raw._ts === "string"
        ? Number(raw._ts)
        : undefined;

  const clientIp = getClientIp(request);
  const spamVerdict = assessContactSpam(
    {
      honeypot,
      timestamp: Number.isFinite(timestamp) ? timestamp : undefined,
      name,
      comment: comment ?? "",
    },
    clientIp,
  );

  if (!spamVerdict.allowed) {
    if (spamVerdict.silent) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }
  const payload: ContactPayload = {
    at: new Date().toISOString(),
    source: source?.trim() || "contact-form",
    name: name.trim(),
    phone: normalizePhoneForStorage(phone),
    district: district?.trim() || "Каргатский район",
    comment: comment?.trim() ?? "",
  };

  const sent = await sendContactEmail(payload);
  if (!sent.ok) {
    const status = sent.error === "not_configured" ? 503 : 502;
    return NextResponse.json(
      {
        ok: false,
        error:
          sent.error === "not_configured"
            ? "Email is not configured on the server"
            : "Failed to send email",
      },
      { status },
    );
  }

  try {
    await insertRequest({
      name: payload.name,
      phone: payload.phone,
      district: payload.district,
      comment: payload.comment,
      source: payload.source,
    });
  } catch (error) {
    console.error("[contact] DB insert failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save request" },
      { status: 500 },
    );
  }

  recordContactSubmission(clientIp);

  return NextResponse.json({ ok: true });
}
