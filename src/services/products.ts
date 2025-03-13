import { mockProducts } from "@/mocks";
import { Product } from "@/types";

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 0);
  });
}

export function fetchProduct(id: string): Promise<Product> {
  return new Promise((resolve, reject) => {
    const product = mockProducts?.find((product) => product?.id === id);
    if (!product)
      return reject(new Error(`Product with ID "${id}" not found.`));
    setTimeout(() => resolve(product), 0);
  });
}
