import { z } from "zod";

export const errorReportKinds = [
  "react-boundary",
  "global-boundary",
  "window-error",
  "unhandled-rejection",
  "api",
] as const;

export type ErrorReportKind = (typeof errorReportKinds)[number];

export const errorReportSchema = z.object({
  kind: z.enum(errorReportKinds),
  message: z.string().trim().min(1).max(2_000),
  page: z.string().trim().max(2_000).optional().default(""),
  component: z.string().trim().max(500).optional().default(""),
  stack: z.string().trim().max(8_000).optional().default(""),
  digest: z.string().trim().max(200).optional().default(""),
  userAgent: z.string().trim().max(500).optional().default(""),
  occurredAt: z.string().trim().max(64).optional().default(""),
});

export type ErrorReportPayload = z.infer<typeof errorReportSchema>;
