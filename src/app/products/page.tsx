import { Metadata } from "next";
import ProductsView from "./";

export const metadata: Metadata = {
  title: "WebWorldMart | Product List",
};

const Products = () => {
  return <ProductsView />;
};

export default Products;
