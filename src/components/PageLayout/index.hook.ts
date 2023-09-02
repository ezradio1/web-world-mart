import useClickOutside from "@/hooks/useClickOutside";
import useIsMobile from "@/hooks/useIsMobile";
import { useEffect, useRef, useState } from "react";

const useIndex = () => {
  const { isMobile } = useIsMobile();
  const [isCollapse, setIsCollapse] = useState(isMobile);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsCollapse(isMobile);
  }, [isMobile]);

  useClickOutside(sidebarRef, () => {
    if (isMobile) setIsCollapse(true);
  });

  return { isCollapse, setIsCollapse, sidebarRef };
};

export default useIndex;
