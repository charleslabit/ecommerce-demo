import { fetchProducts } from "@/lib/products";
import useCartStore from "@/store/cart";
import { Product, ProductInput, ProductsProps, SortByOptions } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = ({
  categoryId = "",
  search = "",
  sortBy = SortByOptions.NONE,
}: ProductsProps) => {
  const queryClient = useQueryClient();
  const { cartItems, updateCartItems } = useCartStore();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", categoryId, search, sortBy],
    queryFn: async () => {
      const result = await fetchProducts({ categoryId, search, sortBy });
      return result?.map((product) => ({
        ...product,
        isEnableCounter: !!cartItems?.find(
          (item) => item.productId === product?.id
        ),
      }));
    },
  });

  const onClickAddToCart = (item: Product) => {
    queryClient.setQueryData(["products"], (oldProducts?: Product[]) =>
      oldProducts?.map((product) =>
        product.id === item.id ? { ...product, isEnableCounter: true } : product
      )
    );
    updateCartItems(item);
  };

  return { products, isLoading, isError, onClickAddToCart };
};

// Create a new product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductInput) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: (newProduct) => {
      queryClient
        .getQueriesData<Product[]>({ queryKey: ["products"] })
        .forEach(([queryKey, oldProducts]) => {
          //Get the dynamic keys
          if (Array.isArray(oldProducts)) {
            queryClient.setQueryData(queryKey, [newProduct, ...oldProducts]);
          }
        });
    },
  });
}

// Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: ProductInput) => {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: (updatedProduct) => {
      queryClient
        .getQueriesData<Product[]>({ queryKey: ["products"] })
        .forEach(([queryKey, oldProducts]) => {
          //Get the dynamic keys
          if (Array.isArray(oldProducts)) {
            queryClient.setQueryData(
              queryKey,
              oldProducts?.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
          }
        });
    },
  });
}

// Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData(["products"], (oldProducts?: Product[]) =>
        oldProducts?.filter((product) => product.id !== deletedProduct.id)
      );
    },
  });
}
