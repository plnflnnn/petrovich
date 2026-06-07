"use client";

import type {
  ContactRequestEditableInput,
  ContactRequestRecord,
} from "@/lib/admin/types";
import { adminFetch, readAdminJson } from "@/lib/admin/admin-fetch";
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
  deleteRequest: (id: string) => Promise<void>;
};

const ContactRequestsContext =
  createContext<ContactRequestsContextValue | null>(null);

export function ContactRequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ContactRequestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await adminFetch("/api/admin/requests");
      const data = await readAdminJson<{
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
      const response = await adminFetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await readAdminJson<{
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

  const deleteRequest = useCallback(async (id: string) => {
    const response = await adminFetch(`/api/admin/requests/${id}`, {
      method: "DELETE",
    });

    const data = await readAdminJson<{ ok?: boolean; error?: string }>(response);

    if (!response.ok || !data.ok) {
      throw new Error(data.error ?? "Не удалось удалить заявку");
    }

    setRequests((current) => current.filter((request) => request.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      requests,
      isLoading,
      error,
      refreshRequests,
      getRequest,
      updateRequest,
      deleteRequest,
    }),
    [requests, isLoading, error, refreshRequests, getRequest, updateRequest, deleteRequest],
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
