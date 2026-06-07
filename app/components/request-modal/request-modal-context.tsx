"use client";

import { createContext, useContext, type ReactNode } from "react";

type RequestModalContextValue = {
  open: () => void;
  close: () => void;
};

export const RequestModalContext = createContext<RequestModalContextValue | null>(
  null,
);

export function useRequestModal(): RequestModalContextValue {
  const ctx = useContext(RequestModalContext);
  if (!ctx) {
    throw new Error("useRequestModal must be used within a RequestModalProvider");
  }
  return ctx;
}

export type RequestModalProviderProps = {
  children: ReactNode;
};
