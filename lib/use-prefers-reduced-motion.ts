"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Lê `prefers-reduced-motion` do sistema. Retorna `false` no SSR e na
 * hidratação (para evitar mismatch) e passa a acompanhar a media query no
 * cliente.
 *
 * Usa `useSyncExternalStore` em vez de `useState` + `useEffect`: a media query
 * é uma fonte externa, e ler no efeito causaria um render em cascata a cada
 * montagem (regra react-hooks/set-state-in-effect).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
