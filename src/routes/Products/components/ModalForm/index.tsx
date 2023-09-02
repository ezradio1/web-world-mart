import Modal from "@/components/Modal";
import type { ModalFormProps } from "./index.type";
import useIndex from "./index.hook";
import Input from "@/components/Input";

const ModalForm = (props: ModalFormProps) => {
  const { handleSubmitData, loading, form, handleChangeForm, error } =
    useIndex(props);

  return (
    <Modal {...props} onSubmit={handleSubmitData} loading={loading}>
      <div className="flex flex-col gap-2">
        <Input
          label="Title"
          placeholder="Enter product title"
          value={form.title}
          name="title"
          onChange={handleChangeForm}
          errorMsg={error.title}
          />
        <Input
          label="Price"
          placeholder="Enter product price"
          value={form.price}
          name="price"
          onChange={handleChangeForm}
          errorMsg={error.price}
        />
      </div>
    </Modal>
  );
};

export default ModalForm;
