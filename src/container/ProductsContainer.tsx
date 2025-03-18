import { Empty, Loader } from "@/component";
import { ProductCard } from "@/component/";
import { sortOptions } from "@/constants";
import { useProducts } from "@/hooks";
import useCartStore from "@/store/cart";
import { SortByOptions } from "@/types";
import { Alert, Flex, Group, Select, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

export const ProductsContainer = () => {
  const router = useRouter();
  const categoryId = useSearchParams().get("categoryId") as string;
  const [search] = useQueryState("search", {
    defaultValue: "",
  });
  const [sortBy, setSortBy] = useQueryState<SortByOptions>("sortBy", {
    defaultValue: SortByOptions.NONE,
    parse: (value) => value as SortByOptions, // ✅ Ensures correct type
  });
  const { products, isLoading, isError, onClickAddToCart } = useProducts({
    categoryId,
    search,
    sortBy,
  });
  const { cartItems, updateCartItems } = useCartStore();

  if (isLoading) return <Loader />;
  if (!products || isError)
    return <Alert color="red">Failed to load products.</Alert>;

  return (
    <Stack align="center">
      <Text>Products</Text>
      <Group justify="space-between" w="100%">
        {search && <Text>Search results for "{search}"</Text>}
        {(search || categoryId) && (
          <Group ml="auto">
            <Text>Filter & Sort:</Text>
            <Select
              data={sortOptions}
              placeholder="Sort By"
              clearable
              onChange={(value) => {
                setSortBy(value as SortByOptions);
              }}
            />
          </Group>
        )}
      </Group>
      <Flex wrap="wrap" gap={30} justify="center">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                cartQuantity={
                  cartItems.find((item) => item.productId === product.id)
                    ?.quantity || 0
                }
                onAddToCart={() => onClickAddToCart(product)}
                onQuantityChange={(value) => updateCartItems(product, value)}
              />
            );
          })
        ) : (
          <Empty />
        )}
      </Flex>
    </Stack>
  );
};
