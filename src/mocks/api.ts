import { mockBanners } from "./banners";
import { mockCategories } from "./categories";
import { mockOrders } from "./orders";
import { mockProducts } from "./products";
import { Banner, Category } from "./types";

export function fetchBanners(): Promise<Banner[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBanners);
    }, 0);
  });
}

export function fetchCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 0);
  });
}

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
}

export function fetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });
}
