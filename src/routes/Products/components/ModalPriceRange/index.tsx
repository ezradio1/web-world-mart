import Input from "@/components/Input";
import Modal from "@/components/Modal";
import useIndex from "./index.hook";
import type { ModalPriceRangeProps } from "./index.type";

const ModalPriceRange = (props: ModalPriceRangeProps) => {
  const { handleSubmit, form, handleChangeForm, error } =
    useIndex(props);

  return (
    <Modal {...props} onSubmit={handleSubmit}>
      <div>
        <Input
          prefix="$"
          label="Lowest Price"
          placeholder="Input lowest price"
          value={form.lowestPrice}
          onChange={handleChangeForm}
          name="lowestPrice"
          errorMsg={error.lowestPrice}
          type="number"
        />
        <Input
          prefix="$"
          label="Highest Price"
          placeholder="Input highest price"
          value={form.highestPrice}
          onChange={handleChangeForm}
          name="highestPrice"
          errorMsg={error.highestPrice}
          type="number"
        />
      </div>
    </Modal>
  );
};

export default ModalPriceRange;
