import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reducedMotionSafe<T>(motionValue: T, staticValue: T, prefersReduced: boolean): T {
  return prefersReduced ? staticValue : motionValue;
}
