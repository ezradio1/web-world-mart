import { usePathname } from "next/navigation";

const useIndex = () => {
  const pathname = usePathname();
  const isActiveMenu = (key: string) => pathname.includes(key);

  return { isActiveMenu };
};

export default useIndex;
