import { fetchProduct } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";

interface ProductParams {
  id: string;
}

export const useProduct = ({ id }: ProductParams) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only fetch when id is available
  });
};
