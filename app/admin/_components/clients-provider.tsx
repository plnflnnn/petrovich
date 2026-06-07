"use client";

import type { ClientFormValues, ClientRecord } from "@/lib/admin/types";
import type { ClientFormInput } from "@/lib/validation/client-form-schema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ClientsContextValue = {
  clients: ClientRecord[];
  isLoading: boolean;
  error: string | null;
  refreshClients: () => Promise<void>;
  getClient: (id: string) => ClientRecord | undefined;
  addClient: (values: ClientFormInput) => Promise<ClientRecord>;
  updateClient: (id: string, values: ClientFormInput) => Promise<ClientRecord>;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

async function readJson<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshClients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/clients", {
        credentials: "same-origin",
      });
      const data = await readJson<{ ok?: boolean; clients?: ClientRecord[]; error?: string }>(
        response,
      );

      if (!response.ok || !data.ok || !data.clients) {
        throw new Error(data.error ?? "Не удалось загрузить клиентов");
      }

      setClients(data.clients);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить клиентов",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshClients();
  }, [refreshClients]);

  const getClient = useCallback(
    (id: string) => clients.find((client) => client.id === id),
    [clients],
  );

  const addClient = useCallback(async (values: ClientFormInput) => {
    const response = await fetch("/api/admin/clients", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await readJson<{ ok?: boolean; client?: ClientRecord; error?: string }>(
      response,
    );

    if (!response.ok || !data.ok || !data.client) {
      throw new Error(data.error ?? "Не удалось создать клиента");
    }

    setClients((current) => [data.client!, ...current]);
    return data.client;
  }, []);

  const updateClient = useCallback(async (id: string, values: ClientFormInput) => {
    const response = await fetch(`/api/admin/clients/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await readJson<{ ok?: boolean; client?: ClientRecord; error?: string }>(
      response,
    );

    if (!response.ok || !data.ok || !data.client) {
      throw new Error(data.error ?? "Не удалось сохранить клиента");
    }

    setClients((current) =>
      current.map((client) => (client.id === id ? data.client! : client)),
    );

    return data.client;
  }, []);

  const value = useMemo(
    () => ({
      clients,
      isLoading,
      error,
      refreshClients,
      getClient,
      addClient,
      updateClient,
    }),
    [clients, isLoading, error, refreshClients, getClient, addClient, updateClient],
  );

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients must be used within ClientsProvider");
  }

  return context;
}

export function toClientFormValues(client: ClientRecord): ClientFormValues {
  return {
    name: client.name,
    phone: client.phone,
    address: client.address,
    memo: client.memo,
  };
}
