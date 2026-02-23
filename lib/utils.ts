import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared content container for onboarding: same width as white form/cards block */
export const ONBOARDING_CONTENT_CONTAINER =
  "max-w-3xl mx-auto px-6";

/** Main header container — same as Navbar (main screen), for branding alignment */
export const MAIN_HEADER_CONTAINER =
  "max-w-7xl mx-auto px-4 sm:px-6";
