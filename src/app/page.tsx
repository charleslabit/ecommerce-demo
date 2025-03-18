import {
  CategoriesContainer,
  ProductsContainer,
  PromoBannerContainer,
} from "@/container";
import { fetchBanners } from "@/lib/banners";
import { fetchCategories } from "@/lib/categories";
import { fetchProducts } from "@/lib/products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["promo-banners"],
    queryFn: fetchBanners,
  });
  queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  queryClient.prefetchQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProducts({ categoryId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PromoBannerContainer />
      <CategoriesContainer />
      <ProductsContainer />
    </HydrationBoundary>
  );
}
