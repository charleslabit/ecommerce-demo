import { Product } from "@/mocks";
import useCartStore from "@/store/cart";
import { Button } from "@mantine/core";

interface AddToCartProps {
  product: Product | undefined;
  quantity: number;
}

export const AddToCart = ({ product, quantity }: AddToCartProps) => {
  const { addCartItem } = useCartStore();
  const handleAddToCart = () => {
    if (!product) return;
    addCartItem({
      quantity,
      imageUrl: product.imageUrls[0],
      name: product.name,
      price: product.price,
      productId: product.id,
    });
  };

  return (
    <Button onClick={handleAddToCart} disabled={!product || quantity < 1}>
      Add To Cart
    </Button>
  );
};
