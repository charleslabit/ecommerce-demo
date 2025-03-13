import { HorizontalCounter } from "@/component";
import { Product } from "@/types";
import { FormattedNumber } from "@/util";
import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: () => void;
  onQuantityChange: (quantity: number) => void;
  onClick: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onAddToCart,
  onQuantityChange,
  onClick,
}) => (
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
      <Group onClick={(e) => e.stopPropagation()} justify="center" grow>
        {cartQuantity > 0 ? (
          <HorizontalCounter
            value={cartQuantity}
            onChange={onQuantityChange}
            numberInputProps={{ min: 0, max: 99 }}
          />
        ) : (
          <Button onClick={onAddToCart}>Add to Cart</Button>
        )}
      </Group>
    </Stack>
  </Card>
);
