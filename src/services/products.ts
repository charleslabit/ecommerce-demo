import { mockProducts } from "@/mocks";
import { Product, ProductsProps } from "@/types";

export function fetchProducts({
  categoryId,
  search,
  sortBy,
}: ProductsProps): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = mockProducts?.filter((product) => {
        const matchesCategory = categoryId
          ? product?.categoryId === categoryId
          : true;
        const matchesSearch = search
          ? product.name.toLowerCase().includes(search.toLowerCase())
          : true;
        return matchesCategory && matchesSearch;
      });

      // Sorting logic
      if (sortBy) {
        filteredProducts.sort((a, b) => {
          if (sortBy === "name-asc") return a?.name?.localeCompare(b?.name);
          if (sortBy === "name-desc") return b?.name.localeCompare(a?.name);
          if (sortBy === "price-asc") return a?.price - b?.price;
          if (sortBy === "price-desc") return b?.price - a?.price;
          return 0;
        });
      }

      resolve(filteredProducts);
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
