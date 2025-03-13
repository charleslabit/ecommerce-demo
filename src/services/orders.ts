import { mockOrders } from "@/mocks";

export function fetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });
}
