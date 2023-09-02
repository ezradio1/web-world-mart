import Modal from "@/components/Modal";
import type { ModalDeleteProps } from "./index.type";
import useIndex from "./index.hook";

const ModalDelete = (props: ModalDeleteProps) => {
  const { selectedData } = props;
  const { handleDeleteData, loading } = useIndex(props);
  
  return (
    <Modal {...props} onSubmit={handleDeleteData} loading={loading}>
      <div className="text-center">
        Are you sure want to delete{" "}
        <span className="italice font-semibold">{selectedData?.title}</span> ?
      </div>
    </Modal>
  );
};

export default ModalDelete;
