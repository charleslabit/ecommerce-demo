import useCartStore from "@/store/cart";
import { Product } from "@/types";
import { Button } from "@mantine/core";

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { addCartItem } = useCartStore();

  const handleAddToCart = () => {
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
