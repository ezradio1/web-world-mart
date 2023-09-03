import {
  CARTS_DETAILS_ROUTE,
  CARTS_ROUTE,
  PRODUCTS_ROUTE,
} from "@/constants/routes";
import { usePathname } from "next/navigation";
import { AiFillBell } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const pathname = usePathname();

  const getPageName = () => {
    if (pathname === PRODUCTS_ROUTE) return "Products";
    else if (pathname === CARTS_ROUTE) return "Products";
    else if (pathname.includes(CARTS_DETAILS_ROUTE)) return "Cart Detail";
  };

  return (
    <div className="w-full">
      <div className="h-8 border-b flex justify-end gap-3 items-center px-4">
        <div className="relative cursor-pointer">
          <AiFillBell color="#ACACAC" />
          <p className="absolute border border-white top-0 -right-[5px] text-[6px] bg-red-500 text-white rounded-full h-[11px] w-[11px] flex items-center justify-center">
            2
          </p>
        </div>
        <div className="cursor-pointer">
          <BiUserCircle color="#ACACAC" />
        </div>
      </div>
      <div className="h-8 capitalize flex items-center text-xs text-orange-400 font-semibold pl-7 md:pl-4 ">
        {getPageName()}
      </div>
    </div>
  );
};

export default Navbar;
