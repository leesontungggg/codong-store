import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (value: any) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
