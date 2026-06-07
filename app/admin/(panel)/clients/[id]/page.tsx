import { ClientDetailPageClient } from "@/app/admin/_components/client-detail-page-client";

type AdminClientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminClientDetailPage({
  params,
}: AdminClientDetailPageProps) {
  const { id } = await params;

  return <ClientDetailPageClient clientId={id} />;
}
