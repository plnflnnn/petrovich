import { z } from "zod";
import { isValidRuPhone } from "./phone";

export { isValidRuPhone, normalizePhoneDigits, normalizePhoneForStorage } from "./phone";

type NameMessages = {
  required: string;
  min: string;
  max: string;
};

type PhoneMessages = {
  required: string;
  invalid: string;
};

function nameField(messages?: NameMessages) {
  if (messages) {
    return z
      .string()
      .trim()
      .min(1, messages.required)
      .min(2, messages.min)
      .max(120, messages.max);
  }

  return z.string().trim().min(2).max(120);
}

function phoneField(messages?: PhoneMessages) {
  const base = z.string().trim();

  if (messages) {
    return base
      .min(1, messages.required)
      .refine(isValidRuPhone, messages.invalid);
  }

  return base.min(1).max(32).refine(isValidRuPhone, "Invalid phone");
}

function commentField(maxMessage?: string) {
  const base = z.string().trim();
  return maxMessage ? base.max(4000, maxMessage) : base.max(4000);
}

/** Shared API payload — used on the server and as the source of truth for field rules. */
export const contactPayloadSchema = z.object({
  name: nameField(),
  phone: phoneField(),
  comment: commentField().optional().default(""),
  district: z.string().trim().max(200).optional().default("Каргатский район"),
  source: z.string().trim().max(64).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export type ContactFormMessages = {
  nameRequired: string;
  nameMin: string;
  nameMax: string;
  phoneRequired: string;
  phoneInvalid: string;
  commentMax: string;
  privacyConsentRequired: string;
};

function privacyConsentField(message: string) {
  return z
    .boolean()
    .refine((value) => value, { message });
}

export function createContactFormSchema(messages: ContactFormMessages) {
  return z.object({
    name: nameField({
      required: messages.nameRequired,
      min: messages.nameMin,
      max: messages.nameMax,
    }),
    phone: phoneField({
      required: messages.phoneRequired,
      invalid: messages.phoneInvalid,
    }),
    comment: commentField(messages.commentMax),
    privacyConsent: privacyConsentField(messages.privacyConsentRequired),
  });
}

export type RequestModalMessages = {
  nameRequired: string;
  nameMin: string;
  nameMax: string;
  phoneRequired: string;
  phoneInvalid: string;
  districtRequired: string;
  districtCustomRequired: string;
  commentMax: string;
  privacyConsentRequired: string;
};

export function createRequestModalSchema(
  messages: RequestModalMessages,
  otherValue: string,
) {
  return z
    .object({
      name: nameField({
        required: messages.nameRequired,
        min: messages.nameMin,
        max: messages.nameMax,
      }),
      phone: phoneField({
        required: messages.phoneRequired,
        invalid: messages.phoneInvalid,
      }),
      district: z.string().trim().min(1, messages.districtRequired),
      districtCustom: z.string().trim().max(200),
      comment: commentField(messages.commentMax),
      privacyConsent: privacyConsentField(messages.privacyConsentRequired),
    })
    .superRefine((data, ctx) => {
      if (data.district === otherValue && data.districtCustom.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["districtCustom"],
          message: messages.districtCustomRequired,
        });
      }
    });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
export type RequestModalValues = z.infer<ReturnType<typeof createRequestModalSchema>>;
