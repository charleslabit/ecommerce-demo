import { Product, ProductsProps } from "@/types";

export async function fetchProducts({
  categoryId,
  search,
  sortBy,
}: ProductsProps): Promise<Product[]> {
  const res = await fetch("/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  const filteredProducts = products?.filter((product) => {
    const matchesCategory = categoryId
      ? product?.categoryId === categoryId
      : true;
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // // Sorting logic
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (sortBy === "name-asc") return a?.name?.localeCompare(b?.name);
      if (sortBy === "name-desc") return b?.name.localeCompare(a?.name);
      if (sortBy === "price-asc") return a?.price - b?.price;
      if (sortBy === "price-desc") return b?.price - a?.price;
      return 0;
    });
  }
  return filteredProducts;
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
  return await res.json();
}
