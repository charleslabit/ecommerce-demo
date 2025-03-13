import { mockCategories } from "@/mocks";
import { Category } from "@/types";

export function fetchCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 0);
  });
}
