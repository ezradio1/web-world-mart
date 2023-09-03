import ContentLayout from "@/components/ContentLayout";
import Table from "@/components/Table";
import React from "react";
import useIndex from "./index.hook";
import { noop } from "@/utils/noop";

const CartDetail = () => {
  const {
    columns,
    data,
    loading,
    error,
    productList,
    cartDetail,
    userData,
  } = useIndex();

  return (
    <div>
      <ContentLayout title="Cart Detail">
        <div className="border bg-white p-3 grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
          <div className="flex flex-col gap-1">
            <p>
              User:
              <span className="ml-1 font-semibold">
                {userData?.firstName} {userData?.lastName}
              </span>
            </p>
            <p>
              Phone:
              <span className="ml-1 font-semibold">{userData?.phone}</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p>
              # of item:
              <span className="ml-1 font-semibold">
                {cartDetail?.totalProducts.toLocaleString()}
              </span>
            </p>
            <p>
              Total Amount:
              <span className="ml-1 font-semibold">
                {cartDetail?.total.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <Table
            columns={columns}
            data={productList || []}
            loading={loading}
            totalData={data?.total || 0}
          />
        </div>
      </ContentLayout>
    </div>
  );
};

export default CartDetail;
