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

export interface QueryParams
  extends Record<string, string | number | undefined> {}

export interface PriceFilter {
  min: number | undefined;
  max: number | undefined;
}
