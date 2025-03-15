import { SortByOptions } from "@/types";

export const sortOptions = [
  { value: SortByOptions.NAME_ASC, label: "Name (A → Z)" },
  { value: SortByOptions.NAME_DESC, label: "Name (Z → A)" },
  { value: SortByOptions.PRICE_ASC, label: "Price (Low → High)" },
  { value: SortByOptions.PRICE_DESC, label: "Price (High → Low)" },
];
