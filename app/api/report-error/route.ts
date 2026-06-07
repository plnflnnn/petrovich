import { shouldSkipErrorReport } from "@/lib/errors/error-report-rate-limit";
import { errorReportSchema } from "@/lib/errors/error-report-schema";
import { sendErrorAlert } from "@/lib/errors/send-error-alert";
import { getClientIp } from "@/lib/spam/contact-protection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ok: true });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = errorReportSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);
  if (shouldSkipErrorReport(parsed.data, clientIp)) {
    return NextResponse.json({ ok: true });
  }

  await sendErrorAlert(parsed.data);

  return NextResponse.json({ ok: true });
}
