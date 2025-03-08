import { Categories, PromoBanner } from "@/container";
import { fetchBanners } from "@/mocks";
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
      <Categories />
    </HydrationBoundary>
  );
}
