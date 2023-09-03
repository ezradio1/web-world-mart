export interface CartData {
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: CartData[];
  total: number;
}

export interface QueryParams
  extends Record<string, string | number | undefined> {}
