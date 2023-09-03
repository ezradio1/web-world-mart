import { Metadata } from "next";
import CartsView from ".";

export const metadata: Metadata = {
  title: "WebWorldMart | Carts List",
};

const Carts = () => {
  return <CartsView />;
};

export default Carts;
