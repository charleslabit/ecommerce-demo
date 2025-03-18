import { Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories", { cache: "no-store" });
  return await res.json();
}
