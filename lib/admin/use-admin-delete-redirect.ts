"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useAdminDeleteRedirect(listHref: string) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const deleteAndRedirect = useCallback(
    async (deleteFn: () => Promise<void>) => {
      setIsRedirecting(true);

      try {
        await deleteFn();
        router.replace(listHref);
        router.refresh();
      } catch (error) {
        setIsRedirecting(false);
        throw error;
      }
    },
    [listHref, router],
  );

  return { isRedirecting, deleteAndRedirect };
}
