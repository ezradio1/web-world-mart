import useDeleteData from "@/hooks/useDeleteData";
import type { ModalDeleteProps } from "./index.type";
import { useToastContext } from "@/context/ToastContext";
import { useState } from "react";

const useIndex = ({ selectedData, onClose, getData }: ModalDeleteProps) => {
  const deleteData = useDeleteData();
  const { showToast } = useToastContext();
  const [loading, setLoading] = useState(false);

  const handleDeleteData = async () => {
    setLoading(true);
    const { error } = await deleteData(`products/${selectedData?.id}`);
    setLoading(false);
    if (!error) {
      onClose();
      showToast({
        show: true,
        type: "success",
        message: "Successfully deleted product data",
      });
      getData();
    } else {
      showToast({
        show: true,
        type: "error",
        message: `${error}`,
      });
    }
  };

  return { handleDeleteData, loading };
};

export default useIndex;
