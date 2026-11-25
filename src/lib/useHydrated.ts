"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

// false during SSR and until React has hydrated; true afterwards.
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
