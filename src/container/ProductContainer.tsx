import { Loader, ProductDetails } from "@/component";
import { fetchProduct } from "@/services/";
import { Alert, Center } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const ProductContainer = () => {
  const { id } = useParams() as { id: string };

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <Loader />;
  if (!product || isError)
    return <Alert color="red">Failed to load product.</Alert>;

  return (
    <Center>
      <ProductDetails product={product} />
    </Center>
  );
};
