import { mockBanners } from "./banners";
import { mockCategories } from "./categories";
import { mockOrders } from "./orders";
import { mockProducts } from "./products";
import { Banner, Category, Product } from "./types";

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

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 0);
  });
}

export function fetchProduct(id: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    mockProducts?.find((product) => product?.id === id);
    setTimeout(() => {
      resolve(mockProducts?.find((product) => product?.id === id));
    }, 0);
  });
}

export function fetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });
}
