import { useEffect, useState } from "react";
import { UseIsMobileProps } from "./index.types";

const useIsMobile = (props?: UseIsMobileProps) => {
  const { maxWidth = "768px" } = props || {};
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

    setIsMobile(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [maxWidth]);

  return { isMobile };
};

export default useIsMobile;
