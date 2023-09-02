import { useToastContext } from "@/context/ToastContext";
import usePostData from "@/hooks/usePostData";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import type { FieldType, ModalFormProps, ProductForm } from "./index.type";
import usePutData from "@/hooks/usePutData";
import { MODAL_STATE } from "../../index.constants";
import { REQUIRED_MSG } from "@/constants/message";

const useIndex = ({
  title,
  selectedData,
  onClose,
  getData,
}: ModalFormProps) => {
  const postData = usePostData();
  const putData = usePutData();
  const { showToast } = useToastContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    price: 0,
  });
  const [error, setError] = useState({
    title: "",
    price: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isEnterOnce, setIsEnterOnce] = useState(false);

  useEffect(() => {
    setIsEdit(title === MODAL_STATE.EDIT);
  }, [title]);

  useEffect(() => {
    if (selectedData) {
      setForm({
        title: selectedData.title,
        price: selectedData.price,
      });
    }
  }, [selectedData]);

  const validateField = useCallback(() => {
    let isValid = true;
    Object.keys(form).forEach((el) => {
      const formField = form[el as unknown as FieldType];

      if (formField === "") isValid = false;
      setError((prevState) => ({
        ...prevState,
        [el]: formField === "" ? REQUIRED_MSG : "",
      }));
    });

    return isValid;
  }, [form]);

  useEffect(() => {
    if (isEnterOnce) validateField();
  }, [isEnterOnce, validateField]);

  const handleSubmitData = async () => {
    setIsEnterOnce(true);
    if (!validateField()) return;
    setLoading(true);
    const { error } = isEdit
      ? await putData<ProductForm>(`products/${selectedData?.id}`, form)
      : await postData<ProductForm>("products/add", form);
    setLoading(false);
    if (!error) {
      onClose();
      showToast({
        show: true,
        type: "success",
        message: `Successfully ${isEdit ? "edited" : "added"} product data`,
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

  const handleChangeForm = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  return { handleSubmitData, loading, form, handleChangeForm, error };
};

export default useIndex;
