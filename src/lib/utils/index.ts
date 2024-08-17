import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *  Capitalizes the first character and should be used to convert an option
 *  before adding to options list in Select and Radio block, also use when trying
 *  delete an option.
 */
export function optionFormat(opt: string): string {
  return opt.charAt(0).toUpperCase() + opt.slice(1);
}
