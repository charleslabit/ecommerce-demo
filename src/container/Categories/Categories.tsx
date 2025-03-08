import { fetchCategories } from "@/mocks";
import { Card, Flex, Group, Image, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export const Categories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  return (
    <Group justify="center">
      <Text>Categories</Text>
      <Flex wrap="wrap" gap="md" justify="center">
        {categories?.map((category) => (
          <Card key={category?.id} w={150} ta="center">
            <Image
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
    </Group>
  );
};
