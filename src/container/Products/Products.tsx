import { Empty, HorizontalCounter, Loader } from "@/component";
import { fetchProducts, Product } from "@/mocks";
import useCartStore from "@/store/cart";
import { FormattedNumber } from "@/util";
import {
  Alert,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

const filterProducts = (
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

export const Products = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [categoryId] = useQueryState("categoryId", {
    defaultValue: "",
  });
  const [search] = useQueryState("search", {
    defaultValue: "",
  });
  const { cartItems, updateCartItems } = useCartStore();

  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await fetchProducts();
      return result?.map((product) => {
        return {
          ...product,
          isEnableCounter: !!cartItems?.find(
            (item) => item.productId === product?.id
          ),
        };
      });
    },
  });

  const filteredProducts = useMemo(
    () => filterProducts(products || [], search, categoryId),
    [products, search, categoryId]
  );

  const onClickAddToCart = (item: Product) => {
    queryClient.setQueryData(["products"], (products?: Product[]) => {
      return products?.map((product) => {
        if (product?.id === item?.id) {
          return {
            ...product,
            isEnableCounter: true,
          };
        }
        return product;
      });
    });
    updateCartItems(item);
  };

  const handleQuantityChange = (item: Product, quantity: number) => {
    updateCartItems(item, quantity);
  };

  const onClick = (id: string) => router.push(`/${id}`);

  if (isLoading) return <Loader />;
  if (!products || isError)
    return <Alert color="red">Failed to load products.</Alert>;

  return (
    <Stack align="center">
      <Text>Products</Text>
      <Flex wrap="wrap" gap={30} justify="center">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => (
            <Card
              className="fade-in hover-effect cursor-pointer"
              w={235}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={product?.id}
              onClick={() => onClick(product?.id)}
            >
              <Card.Section>
                <Image
                  mt={10}
                  src={product?.imageUrls[0]}
                  height={160}
                  alt={product?.name}
                  fit="contain"
                  loading="lazy"
                />
              </Card.Section>

              <Stack justify="space-between" mt="md" mb="xs">
                <Text fw={500} fz={16} lineClamp={2}>
                  {product?.name}
                </Text>
                <Text c="orange">₱{FormattedNumber(product?.price)}</Text>
                <Group
                  onClick={(e) => e.stopPropagation()}
                  justify="center"
                  grow
                >
                  {product?.isEnableCounter ? (
                    <HorizontalCounter
                      value={
                        cartItems?.find(
                          (item) => item.productId === product?.id
                        )?.quantity || 0
                      }
                      onChange={(value) => {
                        handleQuantityChange(product, value);
                      }}
                      numberInputProps={{
                        min: 0,
                        max: 99,
                      }}
                    />
                  ) : (
                    <Button
                      onClick={() => {
                        onClickAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Group>
              </Stack>
            </Card>
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    </Stack>
  );
};
