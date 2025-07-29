import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges a list of class names intelligently. The combination of `clsx`
 * and `tailwind-merge` from the original project removes duplicate
 * utilities and resolves conflicts (e.g. `px-2` vs `px-4`). Use this
 * helper whenever you need to conditionally apply Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}