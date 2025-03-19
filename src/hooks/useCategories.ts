import { fetchCategories } from "@/lib/categories";
import { Category, CategoryInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryInput) => {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!res.ok) throw new Error("Failed to create category");
      return res.json();
    },
    onSuccess: (newCategory) =>
      queryClient.setQueryData(["categories"], (oldData: Category[]) => [
        newCategory,
        ...(oldData || []),
      ]),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Category) => {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!res.ok) throw new Error("Failed to update category");
      return res.json();
    },
    onSuccess: (updatedCategory) =>
      queryClient.setQueryData(["categories"], (oldData: Category[]) =>
        oldData?.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      ),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: (deletedCategory) =>
      queryClient.setQueryData(["categories"], (oldData: Category[]) =>
        oldData?.filter((cat) => cat.id !== deletedCategory.id)
      ),
  });
}
