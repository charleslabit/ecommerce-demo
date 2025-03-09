import { Product } from "@/container";
import { fetchProduct } from "@/mocks";
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
      <Product />
    </HydrationBoundary>
  );
};
export default page;
