import type { ReactNode } from "react";

export interface ItemMenuProps {
  label: string;
  route: string;
  icon: ReactNode;
  isActive: boolean;
}
