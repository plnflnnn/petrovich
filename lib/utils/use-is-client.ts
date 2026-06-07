import { useSyncExternalStore } from "react";

/** True after hydration — safe gate before rendering portals. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
