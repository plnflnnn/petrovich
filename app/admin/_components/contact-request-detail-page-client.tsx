"use client";

import {
  toContactRequestFormValues,
  useContactRequests,
} from "@/app/admin/_components/contact-requests-provider";
import { ContactRequestForm } from "@/app/admin/_components/contact-request-form";
import { notFound } from "next/navigation";

type ContactRequestDetailPageClientProps = {
  requestId: string;
};

export function ContactRequestDetailPageClient({
  requestId,
}: ContactRequestDetailPageClientProps) {
  const { getRequest, updateRequest, isLoading } = useContactRequests();
  const request = getRequest(requestId);

  if (isLoading) {
    return <p className="text-sm text-text-muted">Загружаем карточку заявки…</p>;
  }

  if (!request) {
    notFound();
  }

  return (
    <ContactRequestForm
      defaultValues={toContactRequestFormValues(request)}
      createdAt={request.createdAt}
      source={request.source}
      onSubmit={async (values) => {
        await updateRequest(request.id, values);
      }}
    />
  );
}
