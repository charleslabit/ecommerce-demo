import { ProductContainer } from "@/container";
import { fetchProduct } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: async () => await fetchProduct(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductContainer />
    </HydrationBoundary>
  );
};
export default page;
