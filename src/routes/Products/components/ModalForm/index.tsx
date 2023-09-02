import Modal from "@/components/Modal";
import type { ModalFormProps } from "./index.type";
import useIndex from "./index.hook";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useFilterOptionContext } from "@/context/FilterOptionsContext";

const ModalForm = (props: ModalFormProps) => {
  const { handleSubmitData, loading, form, handleChangeForm, error } =
    useIndex(props);
  const { brandList, categoryList } = useFilterOptionContext();

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
        <Select
          options={brandList}
          label="Brand"
          placeholder="Enter product brand"
          value={form.brand}
          name="brand"
          onChange={handleChangeForm}
          errorMsg={error.brand}
        />
        <Select
          options={categoryList}
          label="Category"
          placeholder="Enter product category"
          value={form.category}
          name="category"
          onChange={handleChangeForm}
          errorMsg={error.category}
        />
        <Input
          label="Price"
          placeholder="Enter product price"
          value={form.price}
          name="price"
          onChange={handleChangeForm}
          errorMsg={error.price}
          type="number"
          min={0}
        />
        <Input
          label="Discount"
          placeholder="Enter product discount"
          value={form.discountPercentage}
          name="discountPercentage"
          onChange={handleChangeForm}
          errorMsg={error.discountPercentage}
          type="number"
          min={0}
        />
        <Input
          label="Stock"
          placeholder="Enter product stock"
          value={form.stock || ""}
          name="stock"
          onChange={handleChangeForm}
          errorMsg={error.stock}
          type="number"
          min={0}
        />
      </div>
    </Modal>
  );
};

export default ModalForm;
