"use client";

import {
  toClientFormValues,
  useClients,
} from "@/app/admin/_components/clients-provider";
import { ClientForm } from "@/app/admin/_components/client-form";
import { notFound, useRouter } from "next/navigation";

type ClientDetailPageClientProps = {
  clientId: string;
};

export function ClientDetailPageClient({ clientId }: ClientDetailPageClientProps) {
  const router = useRouter();
  const { getClient, addClient, updateClient, deleteClient, isLoading } = useClients();
  const isCreateMode = clientId === "new";

  if (isCreateMode) {
    return (
      <ClientForm
        mode="create"
        defaultValues={{
          name: "",
          phone: "",
          address: "",
          memo: "",
        }}
        submitLabel="Добавить клиента"
        onSubmit={async (values) => {
          const created = await addClient(values);
          router.push(`/admin/clients/${created.id}`);
          router.refresh();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <p className="text-sm text-text-muted">Загружаем карточку клиента…</p>
    );
  }

  const client = getClient(clientId);

  if (!client) {
    notFound();
  }

  return (
    <ClientForm
      mode="edit"
      client={client}
      defaultValues={toClientFormValues(client)}
      submitLabel="Сохранить изменения"
      onSubmit={async (values) => {
        await updateClient(client.id, values);
      }}
      onDelete={async () => {
        await deleteClient(client.id);
        router.push("/admin/clients");
        router.refresh();
      }}
    />
  );
}
