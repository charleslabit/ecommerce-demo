import { Category } from "@/types";
import { getImageSrc } from "@/util";
import { Card, Image, Text } from "@mantine/core";

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  selected,
  onSelect,
}) => {
  return (
    <Card w={150} ta="center" withBorder={selected}>
      <Image
        onClick={() => onSelect(category.id)}
        className="fade-in hover-effect cursor-pointer"
        radius="25%"
        height={118}
        src={getImageSrc(category?.imageUrl)}
        alt={category.name}
        loading="lazy"
        fit="contain"
      />
      <Text mt={10} fz={18}>
        {category.name}
      </Text>
    </Card>
  );
};
