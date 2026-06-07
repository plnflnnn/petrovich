import { ContactRequestDetailPageClient } from "@/app/admin/_components/contact-request-detail-page-client";

type AdminRequestDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRequestDetailPage({
  params,
}: AdminRequestDetailPageProps) {
  const { id } = await params;

  return <ContactRequestDetailPageClient requestId={id} />;
}
