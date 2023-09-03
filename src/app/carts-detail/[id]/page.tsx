import { Metadata } from "next";
import CartDetailView from ".";

export const metadata: Metadata = {
  title: "WebWorldMart | Cart Detail",
};

const CartDetail = () => {
  return <CartDetailView />;
};

export default CartDetail;
