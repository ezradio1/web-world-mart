import { REQUIRED_MSG } from "@/constants/message";
import { useToastContext } from "@/context/ToastContext";
import { ChangeEvent, useEffect, useState } from "react";
import type { ModalPriceRangeProps } from "./index.type";

const useIndex = ({ onClose, onSubmitFilter }: ModalPriceRangeProps) => {
  const { showToast } = useToastContext();
  const [form, setForm] = useState({ lowestPrice: 1, highestPrice: 100 });
  const [error, setError] = useState({ lowestPrice: "", highestPrice: "" });

  const validate = () => {
    const lowestPrice = !form.lowestPrice ? REQUIRED_MSG : "";
    const highestPrice = !form.highestPrice
      ? REQUIRED_MSG
      : Number(form.highestPrice) <= Number(form.lowestPrice)
      ? "Highest price cannot be lower than the lowest price"
      : "";
    console.log({ form });

    setError({
      lowestPrice,
      highestPrice,
    });

    return lowestPrice === "" && highestPrice === "";
  };

  useEffect(() => {
    validate();
  }, [form.highestPrice, form.lowestPrice]);

  const handleSubmit = async () => {
    if (!validate()) return;
    onSubmitFilter({ min: form.lowestPrice, max: form.highestPrice });
    onClose();
    showToast({
      show: true,
      type: "success",
      message: "Successfully implemented a price filter",
    });
  };

  const handleChangeForm = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  return { handleSubmit, form, handleChangeForm, error };
};

export default useIndex;
