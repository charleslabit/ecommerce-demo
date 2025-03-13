import { mockBanners } from "@/mocks";
import { Banner } from "@/types";

export function fetchBanners(): Promise<Banner[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBanners);
    }, 0);
  });
}
