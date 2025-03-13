import {
  CategoriesContainer,
  ProductsContainer,
  PromoBanner,
} from "@/container";
import { fetchBanners } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["promo-banners"],
    queryFn: fetchBanners,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PromoBanner />
      <CategoriesContainer />
      <ProductsContainer />
    </HydrationBoundary>
  );
}
