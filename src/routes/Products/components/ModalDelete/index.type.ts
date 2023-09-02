import type { ModalProps } from "@/components/Modal/index.types";
import type { ProductData } from "../../index.types";

export interface ModalDeleteProps extends ModalProps {
  selectedData?: ProductData;
  getData: () => void;
}
