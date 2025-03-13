import { CategoryList, Loader } from "@/component";
import { useCategories } from "@/hooks/";
import { Alert } from "@mantine/core";
import { useQueryState } from "nuqs";

export const CategoriesContainer = () => {
  const [selectedCategory, setSelectedCategory] = useQueryState("categoryId", {
    defaultValue: "",
  });
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <Loader />;
  if (isError) return <Alert color="red">Failed to load categories.</Alert>;

  return (
    <CategoryList
      categories={categories || [{ id: "", name: "", imageUrl: "" }]}
      selectedCategory={selectedCategory}
      onSelect={setSelectedCategory}
    />
  );
};
