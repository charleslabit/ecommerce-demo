import { CartItem, Product } from "@/types/";
import { create } from "zustand";

type Store = {
  cartItems: CartItem[];
  addCartItem: (value: CartItem) => void;
  updateCartItems: (product: Product, quantity?: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeCartItem: (productId: string) => void;
};
const useCartStore = create<Store>()((set) => ({
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

  updateCartItems: (product, quantity) =>
    set((state) => {
      const isExist = !!state.cartItems.find(
        (cartItem) => cartItem.productId === product?.id
      );
      if (isExist) {
        // Update quantity if item already exists
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === product?.id
              ? { ...cartItem, quantity: quantity || 0 }
              : cartItem
          ),
        };
      }

      // Freshly Add
      return {
        cartItems: [
          ...state.cartItems,
          {
            imageUrl: product?.imageUrls[0],
            name: product?.name,
            price: product?.price,
            productId: product?.id,
            quantity: 1,
          },
        ],
      };
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

export default useCartStore;
