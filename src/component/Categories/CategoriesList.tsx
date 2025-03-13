import { Category } from "@/types";
import { Alert, Flex, Stack, Text } from "@mantine/core";
import { CategoryCard } from "./CategoriesCard";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  if (!categories.length)
    return <Alert color="red">No categories found.</Alert>;

  return (
    <Stack align="center">
      <Text>Categories</Text>
      <Flex wrap="wrap" gap="md" justify="center">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={category.id === selectedCategory}
            onSelect={onSelect}
          />
        ))}
      </Flex>
    </Stack>
  );
};
