"use client";

import {
  toContactRequestFormValues,
  useContactRequests,
} from "@/app/admin/_components/contact-requests-provider";
import { ContactRequestForm } from "@/app/admin/_components/contact-request-form";
import { useAdminDeleteRedirect } from "@/lib/admin/use-admin-delete-redirect";
import { notFound } from "next/navigation";

type ContactRequestDetailPageClientProps = {
  requestId: string;
};

export function ContactRequestDetailPageClient({
  requestId,
}: ContactRequestDetailPageClientProps) {
  const { isRedirecting, deleteAndRedirect } = useAdminDeleteRedirect("/admin/requests");
  const { getRequest, updateRequest, deleteRequest, isLoading } = useContactRequests();
  const request = getRequest(requestId);

  if (isRedirecting) {
    return null;
  }

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
      onDelete={() =>
        deleteAndRedirect(() => deleteRequest(request.id))
      }
    />
  );
}
