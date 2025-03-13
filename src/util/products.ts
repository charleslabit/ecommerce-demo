import { Product } from "@/types";

export const filterProducts = (
  products: Product[],
  search: string,
  categoryId: string
) => {
  const searchTerm = search?.toUpperCase();
  return products?.filter(
    (product) =>
      ((product?.name?.toUpperCase()?.includes(searchTerm) ||
        product?.description?.toUpperCase()?.includes(searchTerm)) &&
        !categoryId) ||
      product?.categoryId === categoryId
  );
};
