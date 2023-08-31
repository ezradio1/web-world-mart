import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

const useIndex = () => {
  const [isCollapse, setIsCollapse] = useState(() => {
    return window.matchMedia(`(max-width: 768px)`).matches;
  });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useClickOutside(sidebarRef, () => {
    setIsCollapse(true);
  });

  return { isCollapse, setIsCollapse, sidebarRef };
};

export default useIndex;
