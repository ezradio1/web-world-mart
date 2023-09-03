import type { ModalProps } from "@/components/Modal/index.types";
import type { ProductData } from "../../index.types";

export interface ModalPriceRangeProps extends ModalProps {
  onSubmitFilter: (value: { min: number; max: number }) => void;
}
