"use client";

import {
  ContactHoneypotField,
  useContactSpamGuard,
} from "@/app/components/contact-spam-fields";
import { PillButton } from "@/app/components/ui/pill-button";
import { PrivacyConsentField } from "@/app/components/privacy-consent-field";
import {
  RequestModalContext,
  type RequestModalProviderProps,
} from "@/app/components/request-modal/request-modal-context";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import { cn } from "@/lib/utils/cn";
import {
  createRequestModalSchema,
  type RequestModalValues,
} from "@/lib/validation/contact-form-schema";
import { submitContactRequest } from "@/lib/validation/submit-contact";
import { useIsClient } from "@/lib/utils/use-is-client";
import {
  formInputClass,
  formLabelClass,
  modalOverlayTopClass,
} from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, useWatch } from "react-hook-form";

export const requestModalContent = {
  title: "Оставить заявку",
  description: "Заполните короткую форму — мы свяжемся с вами и поможем с доставкой.",
  fields: {
    name: "Имя",
    namePlaceholder: "Как к вам обращаться",
    phone: "Телефон",
    district: "Район доставки",
    districtPlaceholder: "Выберите район",
    districtDefaultValue: "kargat",
    districtOptions: [
      {
        value: "kargat",
        label: "Каргатский район"
      },
      {
        value: "chulym",
        label: "Чулымский район"
      },
      {
        value: "kochenevo",
        label: "Коченёвский район"
      },
      {
        value: "ubinsk",
        label: "Убинский район"
      },
      {
        value: "novosibirsk",
        label: "Новосибирск и пригород"
      },
      {
        value: "other",
        label: "Другой район"
      }
    ],
    districtOtherValue: "other",
    districtCustom: "Уточните адрес",
    districtCustomPlaceholder: "Например, с. Каргат, ул. Ленина",
    comment: "Текст заявки",
    commentPlaceholder: "Что нужно привезти, объём, желаемые сроки — любая дополнительная информация"
  },
  submit: "Отправить заявку",
  sending: "Отправка…",
  success: "Заявка отправлена",
  successHint: "Мы свяжемся с вами в ближайшее время по указанному номеру телефона.",
  cancel: "Отмена",
  close: "Закрыть",
  errors: {
    nameRequired: "Укажите имя",
    nameMin: "Минимум 2 символа",
    nameMax: "Слишком длинное имя",
    phoneRequired: "Укажите телефон",
    phoneInvalid: "Введите корректный номер (Россия)",
    districtRequired: "Выберите район доставки",
    districtCustomRequired: "Уточните адрес или район",
    commentMax: "Комментарий слишком длинный",
    privacyConsentRequired:
      "Подтвердите согласие на обработку персональных данных",
    submitError: "Не удалось отправить. Попробуйте позже или позвоните нам."
  }
};

type RequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RequestModal({ open, onOpenChange }: RequestModalProps) {
  const m = requestModalContent;
  const phoneDisplay = siteHeaderContent.phoneDisplay;

  const otherValue = m.fields.districtOtherValue;
  const defaultDistrict = m.fields.districtDefaultValue;
  const [sent, setSent] = useState(false);
  const isClient = useIsClient();
  const { honeypotRef, getSpamFields } = useContactSpamGuard({ active: open });

  const schema = createRequestModalSchema(
    {
      nameRequired: m.errors.nameRequired,
      nameMin: m.errors.nameMin,
      nameMax: m.errors.nameMax,
      phoneRequired: m.errors.phoneRequired,
      phoneInvalid: m.errors.phoneInvalid,
      districtRequired: m.errors.districtRequired,
      districtCustomRequired: m.errors.districtCustomRequired,
      commentMax: m.errors.commentMax,
      privacyConsentRequired: m.errors.privacyConsentRequired,
    },
    otherValue,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    control,
  } = useForm<RequestModalValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      district: defaultDistrict,
      districtCustom: "",
      comment: "",
      privacyConsent: false,
    },
  });

  const watchedDistrict = useWatch({ control, name: "district", defaultValue: defaultDistrict });
  const isOther = watchedDistrict === otherValue;

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      reset();
      setSent(false);
    }, 200);
    return () => clearTimeout(t);
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  async function onValid(data: RequestModalValues) {
    const districtLabel =
      m.fields.districtOptions.find((o) => o.value === data.district)?.label ?? data.district;
    const districtPayload =
      data.district === otherValue
        ? `${districtLabel}: ${data.districtCustom.trim()}`
        : districtLabel;

    const result = await submitContactRequest({
      name: data.name.trim(),
      phone: data.phone.trim(),
      comment: data.comment.trim(),
      district: districtPayload,
      source: "request-modal",
      ...getSpamFields(),
    });

    if (!result.ok) {
      setError("root", { message: m.errors.submitError });
      return;
    }

    setSent(true);
  }

  if (!isClient || !open) return null;

  const modalContent = (
    <div className={modalOverlayTopClass}>
      <button
        type="button"
        aria-label={m.close}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
        aria-describedby="request-modal-description"
        className="absolute left-1/2 top-1/2 z-10 w-modal max-h-modal -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card-lg bg-white shadow-modal"
      >
        <div className="flex max-h-inherit flex-col">
          <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
            <div>
              <h2 id="request-modal-title" className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                {m.title}
              </h2>
              <p id="request-modal-description" className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {m.description}
              </p>
            </div>
            <button
              type="button"
              aria-label={m.close}
              onClick={() => onOpenChange(false)}
              className="-mr-2 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-black/5 hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto px-6 pb-6 sm:px-8 sm:pb-8">
            {sent ? (
              <div className="rounded-2xl bg-accent/10 px-5 py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-text">{m.success}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {m.successHint}
                </p>
                <PillButton
                  type="button"
                  variant="primary"
                  size="md"
                  className="mt-5"
                  onClick={() => onOpenChange(false)}
                >
                  {m.close}
                </PillButton>
              </div>
            ) : (
              <form className="relative grid gap-4" onSubmit={handleSubmit(onValid)} noValidate>
                <ContactHoneypotField inputRef={honeypotRef} id="rm-hp" />
                <div>
                  <label htmlFor="rm-name" className={formLabelClass}>
                    {m.fields.name}
                  </label>
                  <input
                    id="rm-name"
                    type="text"
                    autoComplete="name"
                    placeholder={m.fields.namePlaceholder}
                    className={formInputClass}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "rm-name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p id="rm-name-error" className="mt-1.5 text-sm text-red-700" role="alert">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="rm-phone" className={formLabelClass}>
                    {m.fields.phone}
                  </label>
                  <input
                    id="rm-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={phoneDisplay}
                    className={formInputClass}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? "rm-phone-error" : undefined}
                    {...register("phone")}
                  />
                  {errors.phone ? (
                    <p id="rm-phone-error" className="mt-1.5 text-sm text-red-700" role="alert">
                      {errors.phone.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="rm-district" className={formLabelClass}>
                    {m.fields.district}
                  </label>
                  <select
                    id="rm-district"
                    className={cn(formInputClass, "appearance-none bg-white pr-10")}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                    aria-invalid={errors.district ? true : undefined}
                    aria-describedby={errors.district ? "rm-district-error" : undefined}
                    {...register("district")}
                  >
                    <option value="" disabled>
                      {m.fields.districtPlaceholder}
                    </option>
                    {m.fields.districtOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.district ? (
                    <p id="rm-district-error" className="mt-1.5 text-sm text-red-700" role="alert">
                      {errors.district.message}
                    </p>
                  ) : null}
                </div>

                {isOther ? (
                  <div>
                    <label htmlFor="rm-district-custom" className={formLabelClass}>
                      {m.fields.districtCustom}
                    </label>
                    <input
                      id="rm-district-custom"
                      type="text"
                      placeholder={m.fields.districtCustomPlaceholder}
                      className={formInputClass}
                      aria-invalid={errors.districtCustom ? true : undefined}
                      aria-describedby={errors.districtCustom ? "rm-district-custom-error" : undefined}
                      {...register("districtCustom")}
                    />
                    {errors.districtCustom ? (
                      <p id="rm-district-custom-error" className="mt-1.5 text-sm text-red-700" role="alert">
                        {errors.districtCustom.message}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="rm-comment" className={formLabelClass}>
                    {m.fields.comment}
                  </label>
                  <textarea
                    id="rm-comment"
                    rows={4}
                    placeholder={m.fields.commentPlaceholder}
                    className={cn(formInputClass, "resize-y")}
                    aria-invalid={errors.comment ? true : undefined}
                    aria-describedby={errors.comment ? "rm-comment-error" : undefined}
                    {...register("comment")}
                  />
                  {errors.comment ? (
                    <p id="rm-comment-error" className="mt-1.5 text-sm text-red-700" role="alert">
                      {errors.comment.message}
                    </p>
                  ) : null}
                </div>

                {errors.root ? (
                  <p className="text-sm text-red-700" role="alert">
                    {errors.root.message}
                  </p>
                ) : null}

                <PrivacyConsentField
                  id="request-privacy-consent"
                  error={errors.privacyConsent}
                  inputProps={register("privacyConsent")}
                />

                <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                  <PillButton
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => onOpenChange(false)}
                  >
                    {m.cancel}
                  </PillButton>
                  <PillButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="min-w-45"
                  >
                    {isSubmitting ? m.sending : m.submit}
                  </PillButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export function RequestModalProvider({ children }: RequestModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <RequestModal open={isOpen} onOpenChange={setIsOpen} />
    </RequestModalContext.Provider>
  );
}