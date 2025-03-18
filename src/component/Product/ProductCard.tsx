import { HorizontalCounter } from "@/component";
import { Product } from "@/types";
import { FormattedNumber } from "@/util";
import {
  Button,
  Card,
  Group,
  Image,
  Overlay,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: () => void;
  onQuantityChange: (quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onAddToCart,
  onQuantityChange,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Handler to prefetch the product page when hovering over a product card
  const handlePrefetch = () => {
    router.prefetch(`/${product?.id}`);
  };

  const handleClick = () => {
    router.push(`/${product?.id}`);
  };

  return (
    <Card
      style={{ zIndex: 0 }}
      className="fade-in hover-effect cursor-pointer"
      w={235}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={product?.id}
      onClick={handleClick}
      onMouseEnter={handlePrefetch}
    >
      {/* Image Wrapper with Hover Effect */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Image
          mt={10}
          src={product?.imageUrls[0]}
          height={210}
          alt={product?.name}
          fit="cover"
          loading="lazy"
          style={{
            transition: "opacity 0.3s ease-in-out",
            opacity: isHovered ? 0.3 : 1,
          }}
        />

        <Overlay
          backgroundOpacity={0.7}
          p={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <Text fz={14} c="white">
            {product?.description || "No description available"}
          </Text>
        </Overlay>
      </div>

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
};
