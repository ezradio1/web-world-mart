import ContentLayout from "@/components/ContentLayout";
import Table from "@/components/Table";
import React from "react";
import useIndex from "./index.hook";

const Carts = () => {
  const {
    columns,
    data,
    loading,
    error,
    queryParams,
    handleChangePagination,
    handleChangeRowPerPage,
    productList,
  } = useIndex();
  return (
    <div>
      <ContentLayout title="Cart List">
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

export default Carts;
