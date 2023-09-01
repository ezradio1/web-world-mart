import { CARTS_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import { FiLayers, FiShoppingCart } from "react-icons/fi";

export const SIDEBAR_MENUS = [
  {
    label: "Products",
    route: PRODUCTS_ROUTE,
    icon: <FiLayers />,
  },
  {
    label: "Carts",
    route: CARTS_ROUTE,
    icon: <FiShoppingCart />,
  },
];
