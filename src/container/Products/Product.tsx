import { Loader } from "@/component";
import { HorizontalCounter } from "@/component/";
import { fetchProduct, Product } from "@/mocks";
import useCartStore from "@/store/cart";
import {
  Alert,
  Card,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AddToCart } from "./Action/AddToCart";

export const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const { cartItems, updateCartItems } = useCartStore();

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await fetchProduct(id),
  });

  const handleQuantityChange = (item: Product, quantity: number) => {
    updateCartItems(item, quantity);
  };
  if (isLoading) return <Loader />;
  if (!product || isError)
    return <Alert color="red">Failed to load products.</Alert>;

  return (
    <Center>
      <Group align="start">
        <Flex wrap="wrap" gap="md" justify="center">
          <Card key={product?.id} w={300} ta="center">
            <Image
              className="fade-in hover-effect cursor-pointer"
              radius="25%"
              height={300}
              src={product?.imageUrls[0]}
              alt={product?.id}
              loading="lazy"
            />
          </Card>
        </Flex>
        <Stack m="auto">
          <Text fw="bold">{product?.name}</Text>
          <Text c="orange">₱{product?.price?.toFixed(2)}</Text>
          <Text mt={10} fz={18}>
            {product?.description}
          </Text>

          <Group>
            {!!cartItems?.find((item) => item.productId === product?.id) ? (
              <HorizontalCounter
                value={
                  cartItems?.find((item) => item.productId === product?.id)
                    ?.quantity || 0
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
              <AddToCart product={product} />
            )}
          </Group>
        </Stack>
      </Group>
    </Center>
  );
};
