import { CARTS_DETAILS_ROUTE, CARTS_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getPageName = () => {
    if (pathname === PRODUCTS_ROUTE) return "Products";
    else if (pathname === CARTS_ROUTE) return "Products";
    else if (pathname.includes(CARTS_DETAILS_ROUTE)) return "Cart Detail";
  };

  return (
    <div className="w-full">
      <div className="h-8 border-b"></div>
      <div className="h-8 capitalize flex items-center text-xs text-orange-400 font-semibold pl-7 md:pl-4 ">
        {getPageName()}
      </div>
    </div>
  );
};

export default Navbar;
