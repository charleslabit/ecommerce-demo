import { Loader } from "@/component";
import { fetchProducts } from "@/mocks";
import { Alert, Card, Flex, Image, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export const Products = () => {
  const router = useRouter();
  const [categoryId] = useQueryState("categoryId", {
    defaultValue: "",
  });
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  if (isLoading) return <Loader />;
  if (isError) return <Alert color="red">Failed to load products.</Alert>;

  const onClick = (id: string) => router.push(`/${id}`);

  return (
    <Stack align="center">
      <Text>Products</Text>
      <Flex wrap="wrap" gap="md" justify="center">
        {products
          ?.filter(
            (product) => !categoryId || product?.categoryId === categoryId
          )
          ?.map((product) => (
            <Card key={product?.id} w={150} ta="center">
              <Image
                onClick={() => onClick(product?.id)}
                className="fade-in hover-effect cursor-pointer"
                radius="25%"
                height={150}
                src={product?.imageUrls[0]}
                alt={product?.id}
                loading="lazy"
              />
              <Text mt={10} fz={18}>
                {product?.name}
              </Text>
            </Card>
          ))}
      </Flex>
    </Stack>
  );
};
