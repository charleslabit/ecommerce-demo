import { Empty, Loader } from "@/component";
import { ProductCard } from "@/component/";
import { useProducts } from "@/hooks";
import useCartStore from "@/store/cart";
import { filterProducts } from "@/util";
import { Alert, Flex, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

export const ProductsContainer = () => {
  const { products, isLoading, isError, onClickAddToCart } = useProducts();
  const { cartItems, updateCartItems } = useCartStore();
  const router = useRouter();
  const [categoryId] = useQueryState("categoryId", { defaultValue: "" });
  const [search] = useQueryState("search", { defaultValue: "" });

  const filteredProducts = useMemo(
    () => filterProducts(products || [], search, categoryId),
    [products, search, categoryId]
  );

  if (isLoading) return <Loader />;
  if (!products || isError)
    return <Alert color="red">Failed to load products.</Alert>;

  return (
    <Stack align="center">
      <Text>Products</Text>
      <Flex wrap="wrap" gap={30} justify="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={
                cartItems.find((item) => item.productId === product.id)
                  ?.quantity || 0
              }
              onAddToCart={() => onClickAddToCart(product)}
              onQuantityChange={(value) => updateCartItems(product, value)}
              onClick={(id) => router.push(`/${id}`)}
            />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    </Stack>
  );
};
