import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function that combines clsx and tailwind-merge for handling class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
