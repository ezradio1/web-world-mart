import { createContext, useContext, useState } from "react";

import {
  ToastData,
  type ToastContextValue,
  type ToastProviderProps,
} from "./index.types";

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastData>({
    show: false,
    message: "",
    type: "success",
    align: "center",
  });

  const showToast = (toastData: ToastData) => {
    const { show, message, type, align = "center" } = toastData;
    setToast({ show, message, type, align });
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
        showToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(`"useToastContext" must be used within "ToastProvider"`);
  }

  return context;
};

export { ToastProvider, useToastContext };
