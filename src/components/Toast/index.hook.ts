import { useToastContext } from "@/context/ToastContext";
import { useEffect } from "react";

const useIndex = () => {
  const { toast, setToast } = useToastContext();
  const { show } = toast;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setToast((prevState) => ({ ...prevState, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return { toast };
};

export default useIndex;
