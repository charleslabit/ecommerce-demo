import { fetchProducts } from "@/lib/products";
import useCartStore from "@/store/cart";
import { Product, ProductInput, ProductsProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = ({ categoryId, search, sortBy }: ProductsProps) => {
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
  const productsQueries = queryClient.getQueriesData<Product[]>({
    queryKey: ["products"],
  });
  const allProducts = productsQueries
    .map(([_, products]) => products) // Extract product lists
    .flat() // Merge them into a single array
    .filter(Boolean); // Remove undefined values

  return useMutation({
    mutationFn: async (product: ProductInput) => {
      const clonedProducts = [...allProducts];
      const highestValue = Math.max(
        0,
        ...clonedProducts.map((p) => Number(p?.id))
      );
      const newProduct = { ...product, id: highestValue + 1 };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
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
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
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
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
