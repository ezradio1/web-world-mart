import Button from "@/components/Button";
import ContentLayout from "@/components/ContentLayout";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { useFilterOptionContext } from "@/context/FilterOptionsContext";
import { FiSearch } from "react-icons/fi";
import ModalDelete from "./components/ModalDelete";
import ModalForm from "./components/ModalForm";
import { MODAL_STATE } from "./index.constants";
import useIndex from "./index.hook";
import ModalPriceRange from "./components/ModalPriceRange";
import { AiFillCloseCircle } from "react-icons/ai";
import PriceFilterInput from "./components/PriceFilterInput";
import ErrorState from "@/components/ErrorState";

const Products = () => {
  const {
    columns,
    searchValue,
    brandValue,
    handleChangeSearch,
    data,
    loading,
    error,
    queryParams,
    handleChangePagination,
    handleChangeRowPerPage,
    handleChangeCategory,
    handleChangeBrand,
    productList,
    modal,
    setModal,
    selectedData,
    refetch,
    handleSubmitPriceFilter,
    handleClearPriceFilter,
    totalData,
  } = useIndex();
  const { brandList, categoryList } = useFilterOptionContext();

  if (error) return <ErrorState />;

  return (
    <div>
      <ModalDelete
        title={modal}
        isOpen={modal === MODAL_STATE.DELETE}
        onClose={() => setModal("")}
        selectedData={selectedData}
        getData={refetch}
      />
      <ModalForm
        title={modal}
        isOpen={modal === MODAL_STATE.ADD || modal === MODAL_STATE.EDIT}
        onClose={() => setModal("")}
        selectedData={selectedData}
        getData={refetch}
      />
      <ModalPriceRange
        title={modal}
        isOpen={modal === MODAL_STATE.PRICE_RANGE}
        onClose={() => setModal("")}
        onSubmitFilter={handleSubmitPriceFilter}
      />
      <ContentLayout title="Product List">
        <div className="p-3 rounded-sm bg-white flex flex-col md:flex-row flex-wrap gap-2 justify-between  border">
          <div className="flex gap-2 flex-wrap flex-col md:flex-row">
            <Input
              withError={false}
              placeholder="Search product here..."
              icon={<FiSearch color="gray" />}
              className="min-w-[220px]"
              value={searchValue}
              onChange={handleChangeSearch}
            />
            <Select
              options={brandList}
              withError={false}
              placeholder="Chose Brand here...."
              className="min-w-[220px]"
              value={brandValue}
              onChange={handleChangeBrand}
              clearIcon
              additionalValueText="Brand: "
            />
            <Select
              options={categoryList}
              withError={false}
              placeholder="Chose Category here...."
              className="min-w-[220px]"
              value={queryParams.category}
              onChange={handleChangeCategory}
              clearIcon
              additionalValueText="Category: "
            />

            <PriceFilterInput
              onClick={() => setModal(MODAL_STATE.PRICE_RANGE)}
              value={
                queryParams.min && queryParams.max
                  ? `$${queryParams.min} - $${queryParams.max}`
                  : ""
              }
              onClear={handleClearPriceFilter}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setModal(MODAL_STATE.ADD)}
              className="w-full md:w-fit"
            >
              Add Product
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <Table
            columns={columns}
            data={productList || []}
            loading={loading}
            onChangePagination={handleChangePagination}
            skip={Number(queryParams.skip || 0)}
            rowsPerPage={Number(queryParams.limit || 10)}
            onChangeRowPerPage={handleChangeRowPerPage}
            totalData={totalData}
          />
        </div>
      </ContentLayout>
    </div>
  );
};

export default Products;
