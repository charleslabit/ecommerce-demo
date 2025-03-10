import { CartItem } from "@/mocks/";
import { create } from "zustand";

type Store = {
  cartItems: CartItem[];
  addCartItem: (value: CartItem) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeCartItem: (productId: string) => void;
};
const useProductStore = create<Store>()((set) => ({
  cartItems: [
    {
      quantity: 4,
      imageUrl:
        "https://img.freepik.com/free-vector/fresh-purple-eggplant_24877-82136.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
      name: "Eggplant",
      price: 35,
      productId: "1",
    },
  ],
  addCartItem: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItem) {
        // Update quantity if item already exists
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }

      // Add new item if it doesn't exist
      return { cartItems: [...state.cartItems, item] };
    }),

  updateCartItem: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),

  removeCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
}));

export default useProductStore;
