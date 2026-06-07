"use client";

import { ClientOnly } from "@/app/components/client-only";
import {
  ContactHoneypotField,
  useContactSpamGuard,
} from "@/app/components/contact-spam-fields";
import { PillButton } from "@/app/components/ui/pill-button";
import { siteHeaderContent } from "@/app/home/_components/site-header-content";
import {
  createContactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contact-form-schema";
import { submitContactRequest } from "@/lib/validation/submit-contact";
import { formInputShadowClass, formLabelClass } from "@/lib/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ContactFormPlaceholder() {
  return (
    <div className="grid gap-4" aria-hidden>
      <div>
        <div className={formLabelClass}>Имя</div>
        <div className={`${formInputShadowClass} h-11`} />
      </div>
      <div>
        <div className={formLabelClass}>Телефон</div>
        <div className={`${formInputShadowClass} h-11`} />
      </div>
      <div>
        <div className={formLabelClass}>Комментарий</div>
        <div className={`${formInputShadowClass} h-24 resize-y`} />
      </div>
      <div className="h-12 w-full rounded-full bg-accent/20 sm:w-36" />
    </div>
  );
}

function ContactFormFields() {
  const [sent, setSent] = useState(false);
  const { honeypotRef, getSpamFields } = useContactSpamGuard();

  const schema = createContactFormSchema({
    nameRequired: "Укажите имя",
    nameMin: "Минимум 2 символа",
    nameMax: "Слишком длинное имя",
    phoneRequired: "Укажите телефон",
    phoneInvalid: "Введите корректный номер (Россия)",
    commentMax: "Комментарий слишком длинный",
  });

  const {
    register,
    handleSubmit,
    formState: { errors: fieldErrors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
    },
  });

  async function onValid(data: ContactFormValues) {
    const result = await submitContactRequest({
      name: data.name.trim(),
      phone: data.phone.trim(),
      comment: data.comment.trim(),
      district: "Каргатский район",
      source: "contact-form",
      ...getSpamFields(),
    });

    if (!result.ok) {
      setError("root", {
        message: "Не удалось отправить. Попробуйте позже или позвоните нам.",
      });
      return;
    }

    setSent(true);
    reset();
  }

  return (
    <form className="relative grid gap-4" onSubmit={handleSubmit(onValid)} noValidate>
      <ContactHoneypotField inputRef={honeypotRef} id="contact-hp" />
      <div>
        <label htmlFor="contact-name" className={formLabelClass}>
          Имя
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={formInputShadowClass}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {fieldErrors.name ? (
          <p id="contact-name-error" className="mt-1.5 text-sm text-red-700" role="alert">
            {fieldErrors.name.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="contact-phone" className={formLabelClass}>
          Телефон
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder={siteHeaderContent.phoneDisplay}
          className={formInputShadowClass}
          aria-invalid={fieldErrors.phone ? true : undefined}
          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
          {...register("phone")}
        />
        {fieldErrors.phone ? (
          <p id="contact-phone-error" className="mt-1.5 text-sm text-red-700" role="alert">
            {fieldErrors.phone.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="contact-comment" className={formLabelClass}>
          Комментарий
        </label>
        <textarea
          id="contact-comment"
          rows={4}
          className={`${formInputShadowClass} resize-y`}
          aria-invalid={fieldErrors.comment ? true : undefined}
          aria-describedby={fieldErrors.comment ? "contact-comment-error" : undefined}
          {...register("comment")}
        />
        {fieldErrors.comment ? (
          <p id="contact-comment-error" className="mt-1.5 text-sm text-red-700" role="alert">
            {fieldErrors.comment.message}
          </p>
        ) : null}
      </div>
      {fieldErrors.root ? (
        <p className="text-sm text-red-700" role="alert">
          {fieldErrors.root.message}
        </p>
      ) : null}
      <PillButton
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправка…" : "Отправить"}
      </PillButton>
      {sent ? (
        <p
          className="rounded-xl bg-accent/10 px-4 py-3 text-sm-tight leading-relaxed text-accent"
          role="status"
        >
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </p>
      ) : null}
    </form>
  );
}

export function ContactForm() {
  return (
    <ClientOnly fallback={<ContactFormPlaceholder />}>
      <ContactFormFields />
    </ClientOnly>
  );
}
