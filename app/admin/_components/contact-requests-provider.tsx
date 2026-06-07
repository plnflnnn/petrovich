"use client";

import type {
  ContactRequestEditableInput,
  ContactRequestRecord,
} from "@/lib/admin/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactRequestsContextValue = {
  requests: ContactRequestRecord[];
  isLoading: boolean;
  error: string | null;
  refreshRequests: () => Promise<void>;
  getRequest: (id: string) => ContactRequestRecord | undefined;
  updateRequest: (
    id: string,
    values: ContactRequestEditableInput,
  ) => Promise<ContactRequestRecord>;
};

const ContactRequestsContext =
  createContext<ContactRequestsContextValue | null>(null);

async function readJson<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}

export function ContactRequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ContactRequestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/requests");
      const data = await readJson<{
        ok?: boolean;
        requests?: ContactRequestRecord[];
        error?: string;
      }>(response);

      if (!response.ok || !data.ok || !data.requests) {
        throw new Error(data.error ?? "Не удалось загрузить заявки");
      }

      setRequests(data.requests);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить заявки",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshRequests();
  }, [refreshRequests]);

  const getRequest = useCallback(
    (id: string) => requests.find((request) => request.id === id),
    [requests],
  );

  const updateRequest = useCallback(
    async (id: string, values: ContactRequestEditableInput) => {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await readJson<{
        ok?: boolean;
        request?: ContactRequestRecord;
        error?: string;
      }>(response);

      if (!response.ok || !data.ok || !data.request) {
        throw new Error(data.error ?? "Не удалось сохранить заявку");
      }

      setRequests((current) =>
        current.map((request) => (request.id === id ? data.request! : request)),
      );

      return data.request;
    },
    [],
  );

  const value = useMemo(
    () => ({
      requests,
      isLoading,
      error,
      refreshRequests,
      getRequest,
      updateRequest,
    }),
    [requests, isLoading, error, refreshRequests, getRequest, updateRequest],
  );

  return (
    <ContactRequestsContext.Provider value={value}>
      {children}
    </ContactRequestsContext.Provider>
  );
}

export function useContactRequests() {
  const context = useContext(ContactRequestsContext);

  if (!context) {
    throw new Error(
      "useContactRequests must be used within ContactRequestsProvider",
    );
  }

  return context;
}

export function toContactRequestFormValues(
  request: ContactRequestRecord,
): ContactRequestEditableInput {
  return {
    name: request.name,
    phone: request.phone,
    district: request.district,
    comment: request.comment,
  };
}
