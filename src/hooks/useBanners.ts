import { fetchBanners } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useBanners = () => {
  return useQuery({
    queryKey: ["promo-banners"],
    queryFn: fetchBanners,
  });
};
