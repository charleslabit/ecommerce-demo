import { fetchProducts } from "@/services";
import useCartStore from "@/store/cart";
import { Product } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const { cartItems, updateCartItems } = useCartStore();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await fetchProducts();
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
