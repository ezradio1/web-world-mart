export interface ProductData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
export interface CartDetailResponse {
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  products: ProductData[];
}

export interface QueryParams
  extends Record<string, string | number | undefined> {}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}
