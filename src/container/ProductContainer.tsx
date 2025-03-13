import { Loader, ProductDetails } from "@/component";
import { useProduct } from "@/hooks";
import { Alert, Center } from "@mantine/core";
import { useParams } from "next/navigation";

export const ProductContainer = () => {
  const { id } = useParams() as { id: string };
  const { data: product, isError, isLoading } = useProduct({ id });

  if (isLoading) return <Loader />;
  if (!product || isError)
    return <Alert color="red">Failed to load product.</Alert>;

  return (
    <Center>
      <ProductDetails product={product} />
    </Center>
  );
};
