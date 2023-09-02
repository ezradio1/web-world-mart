import type { ReactNode } from "react";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export interface ProductResponse {
  products: ProductData[];
  total: number;
}


export interface FilterOptionProviderProps {
  children: ReactNode;
}

export interface Option {
  label: string;
  value: string;
}
export interface FilterOptionContextValue {
  brandList: Option[];
  categoryList: Option[];
}
