import type { ModalProps } from "@/components/Modal/index.types";
import type { ProductData } from "../../index.types";

export interface ModalFormProps extends ModalProps {
  selectedData?: ProductData;
  getData: () => void;
}

export interface ProductForm {
  title: string;
  price: number | '';
  brand: string;
  category: string;
  stock: number | '';
  discountPercentage: number | '';
}

export type FieldType = "title" | "price";
