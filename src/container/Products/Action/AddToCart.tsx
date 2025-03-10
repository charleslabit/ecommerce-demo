import { Product } from "@/mocks";
import useCartStore from "@/store/cart";
import { Button } from "@mantine/core";

interface AddToCartProps {
  product: Product | undefined;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { addCartItem } = useCartStore();
  const handleAddToCart = () => {
    if (!product) return;
    addCartItem({
      quantity: 1,
      imageUrl: product.imageUrls[0],
      name: product.name,
      price: product.price,
      productId: product.id,
    });
  };

  return <Button onClick={handleAddToCart}>Add To Cart</Button>;
};
