export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "credit_card" | "gcash" | "paypal"; // Customize based on your preferred methods
  shippingAddress: Address;
  billingAddress?: Address; // Optional if billing matches shipping
  dateCreated: string;
  dateUpdated?: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrls: string[]; // Array for multiple images (e.g., galleries)
  dateCreated: string;
  dateUpdated: string;
  rating?: number;
  stock: number;
  tags?: string[]; // For improved search and filtering
  price: number;
  salePrice?: number; // Optional for discounts
  isEnableCounter?: boolean; // Used for displaying the HorizontalCounter when additing to cart in products page
  isFeatured?: boolean;
  quantity?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number; // Price per item
  name: string; // Useful for displaying product info in cart
  imageUrl: string; // To show product preview in the cart
}

export interface ProductsProps {
  categoryId?: string;
}
