import { AddToCart, HorizontalCounter } from "@/component";
import useCartStore from "@/store/cart";
import { Product } from "@/types";
import { Card, Group, Image, Stack, Text } from "@mantine/core";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { cartItems, updateCartItems } = useCartStore();

  const handleQuantityChange = (quantity: number) => {
    updateCartItems(product, quantity);
  };

  const cartItem = cartItems.find((item) => item.productId === product.id);

  return (
    <Group align="start">
      <Card w={300} ta="center">
        <Image
          className="fade-in hover-effect cursor-pointer"
          radius="25%"
          height={300}
          src={product.imageUrls[0]}
          alt={product.id}
          loading="lazy"
        />
      </Card>

      <Stack>
        <Text fw="bold">{product.name}</Text>
        <Text c="orange">₱{product.price.toFixed(2)}</Text>
        <Text mt={10} fz={18}>
          {product.description}
        </Text>

        <Group>
          {cartItem ? (
            <HorizontalCounter
              value={cartItem.quantity}
              onChange={handleQuantityChange}
              numberInputProps={{ min: 0, max: 99 }}
            />
          ) : (
            <AddToCart product={product} />
          )}
        </Group>
      </Stack>
    </Group>
  );
};
