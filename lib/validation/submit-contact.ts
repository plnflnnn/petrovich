export type ContactRequestBody = {
  name: string;
  phone: string;
  comment?: string;
  district?: string;
  source?: string;
  _hp?: string;
  _ts?: number;
};

type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: "network" | "server" };

export async function submitContactRequest(
  body: ContactRequestBody,
): Promise<SubmitContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });

    const json: unknown = await res.json().catch(() => null);
    const success =
      res.ok &&
      typeof json === "object" &&
      json !== null &&
      "ok" in json &&
      (json as { ok: boolean }).ok === true;

    return success ? { ok: true } : { ok: false, error: "server" };
  } catch {
    return { ok: false, error: "network" };
  }
}
