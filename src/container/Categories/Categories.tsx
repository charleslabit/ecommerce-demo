import { Loader } from "@/component";
import { fetchCategories } from "@/mocks";
import { Alert, Card, Flex, Image, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const Categories = () => {
  const [categoryId, setCategoryId] = useQueryState("categoryId", {
    defaultValue: "",
  });
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  if (isLoading) return <Loader />;
  if (isError) return <Alert color="red">Failed to load products.</Alert>;

  return (
    <Stack align="center">
      <Text>Categories</Text>
      <Flex wrap="wrap" gap="md" justify="center">
        {categories?.map((category) => (
          <Card
            key={category?.id}
            w={150}
            ta="center"
            withBorder={category?.id === categoryId}
          >
            <Image
              onClick={() => setCategoryId(category?.id)}
              className="fade-in hover-effect cursor-pointer"
              radius="25%"
              height={150}
              src={category?.imageUrl}
              alt={category?.id}
              loading="lazy"
            />
            <Text mt={10} fz={18}>
              {category?.name}
            </Text>
          </Card>
        ))}
      </Flex>
    </Stack>
  );
};
