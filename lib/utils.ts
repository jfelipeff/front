import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns an array of years parsed to fit in the select component
export function yearsRange() {
  return Array.from({ length: 2023 - 1980 }, (v, k) => k + 1980).map((x) => ({
    value: x,
    label: x,
  }));
}
