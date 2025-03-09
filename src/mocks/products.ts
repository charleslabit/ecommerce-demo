import { Product } from "./types";

// { id: "1", name: "Vegetables", imageUrl: "/categories/vegetable.png" },
// { id: "2", name: "Fruits", imageUrl: "/categories/fruits.png" },
// { id: "3", name: "Meat", imageUrl: "/categories/meat.png" },
// { id: "4", name: "Seafood", imageUrl: "/categories/seafood.png" },
// { id: "5", name: "Frozen", imageUrl: "/categories/frozen.png" },
// { id: "6", name: "Dairy & Eggs", imageUrl: "/categories/dairy&eggs.png" },

export const mockProducts: Product[] = [
  {
    id: "1",
    categoryId: "1",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Talong",
    imageUrls: [
      "https://img.freepik.com/free-vector/fresh-purple-eggplant_24877-82136.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Eggplant",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "2",
    categoryId: "1",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Broccoli",
    imageUrls: [
      "https://img.freepik.com/free-photo/green-broccoli-levitating-white-background_485709-79.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Broccoli",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "3",
    categoryId: "1",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Pechay",
    imageUrls: [
      "https://img.freepik.com/free-psd/romaine-isolated-transparent-background_191095-31476.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Pechay",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  //Fruits
  {
    id: "4",
    categoryId: "2",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Apple",
    imageUrls: [
      "https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Apple",
    price: 35,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "5",
    categoryId: "2",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Mango",
    imageUrls: [
      "https://img.freepik.com/free-psd/juicy-mango-cubes-exploding-fresh-tropical-fruit-delight_84443-44312.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Mango",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "6",
    categoryId: "2",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Grapes",
    imageUrls: [
      "https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14707.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Grapes",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "7",
    categoryId: "3",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Baka Naman",
    imageUrls: [
      "https://img.freepik.com/free-psd/fresh-beef-cubes-with-rosemary-culinary-delight_191095-78514.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Beef",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "8",
    categoryId: "3",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Manok",
    imageUrls: [
      "https://img.freepik.com/free-psd/grilled-chicken-isolated-transparent-background_191095-39786.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Chicken",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "9",
    categoryId: "3",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Baboy",
    imageUrls: [
      "https://img.freepik.com/free-psd/assortment-raw-meat-cuts-wooden-board_632498-26287.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Pork",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },

  {
    id: "10",
    categoryId: "4",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Shrimp",
    imageUrls: [
      "https://img.freepik.com/free-psd/zhejiang-shrimp-isolated-transparent-background_191095-34709.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Shrimp",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },

  {
    id: "11",
    categoryId: "4",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Salmon",
    imageUrls: [
      "https://img.freepik.com/free-psd/wild-alaska-salmon-isolated-transparent-background_191095-27879.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Salmon",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },

  {
    id: "12",
    categoryId: "4",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Fresh Pusit",
    imageUrls: [
      "https://img.freepik.com/free-vector/hand-drawn-squid-illustration_23-2149560574.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Squid",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },

  //Dairy&Eggs
  {
    id: "13",
    categoryId: "5",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Butter",
    imageUrls: [
      "https://img.freepik.com/free-psd/margarine-isolated-transparent-background_191095-35018.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Butter",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "14",
    categoryId: "5",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Eggs",
    imageUrls: [
      "https://img.freepik.com/free-psd/single-brown-chicken-egg-isolated-transparent-background_632498-57862.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Eggs",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
  {
    id: "15",
    categoryId: "5",
    dateCreated: "2025-03-09",
    dateUpdated: "2025-03-09",
    description: "Yogurt",
    imageUrls: [
      "https://img.freepik.com/free-vector/set-yogurt-plastic-pots-with-splashes_1441-2086.jpg?ga=GA1.1.484030290.1741493567&semt=ais_hybrid",
    ],
    name: "Yogurt",
    price: 0,
    stock: 0,
    isFeatured: false,
    rating: 0,
    salePrice: 0,
    tags: [],
  },
];
