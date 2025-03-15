import { mockProducts } from "@/mocks";
import { Product, ProductsProps } from "@/types";

export function fetchProducts({
  categoryId,
  search,
}: ProductsProps): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockProducts?.filter((product) => {
          const matchesCategory = categoryId
            ? product?.categoryId === categoryId
            : true;
          const matchesSearch = search
            ? product.name.toLowerCase().includes(search.toLowerCase())
            : true;
          return matchesCategory && matchesSearch;
        })
      );
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
