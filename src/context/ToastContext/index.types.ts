import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ToastData {
  show: boolean;
  message: string;
  type: "success" | "error";
  align?: "left" | "center" | "right";
}
export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastContextValue {
  toast: ToastData;
  setToast: Dispatch<SetStateAction<ToastData>>;
  showToast: (toastData: ToastData) => void;
}
