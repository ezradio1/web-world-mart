import Button from "@/components/Button";
import ContentLayout from "@/components/ContentLayout";
import Input from "@/components/Input";
import { PaginationParams } from "@/components/Pagination/index.types";
import Table from "@/components/Table";
import React, { useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import useIndex from "./index.hook";
import useFilterOptions from "./hooks/useFilterOptions";
import Select from "@/components/Select";

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
  } = useIndex();
  const { brandList, categoryList } = useFilterOptions();

  return (
    <div>
      <ContentLayout title="Product List">
        <div className="p-3 rounded-sm bg-white flex flex-col md:flex-row gap-2 justify-between border">
          <div className="flex gap-2">
            <Input
              withError={false}
              placeholder="Search product here..."
              icon={<FiSearch color="gray" />}
              className="min-w-[260px]"
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
          </div>
          <Button>Add Product</Button>
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
            totalData={data?.total || 0}
          />
        </div>
      </ContentLayout>
    </div>
  );
};

export default Products;
