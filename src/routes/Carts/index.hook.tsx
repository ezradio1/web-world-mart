import { TableColumn } from "@/components/Table/index.types";
import useCustomRouter from "@/hooks/useCustomRouter";
import useFetchData from "@/hooks/useFetchData";
import useGetAllQueryParams from "@/hooks/useGetAllQueryParams";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CartData, CartResponse, QueryParams } from "./index.types";
import { CARTS_DETAILS_ROUTE } from "@/constants/routes";

const useIndex = () => {
  const { skip, limit } = useGetAllQueryParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: Number(limit || 10),
    skip: Number(skip || 0),
  });
  const { data, loading, error } = useFetchData<CartResponse>({
    url: "carts",
    params: queryParams,
  });

  const router = useCustomRouter();
  const pathname = usePathname();

  const columns: TableColumn<CartData>[] = [
    {
      key: "id",
      header: "cart id",
    },
    {
      key: "total",
      header: "total",
      render: (data) => <>{data.total.toLocaleString()}</>,
    },
    {
      key: "discountedTotal",
      header: "Total Discount (%)",
      render: (data) => <>{data.discountedTotal.toLocaleString()}</>,
    },
    {
      key: "totalProducts",
      header: "Total Product",
      render: (data) => <>{data.totalProducts.toLocaleString()}</>,
    },
    {
      key: "totalQuantity",
      header: "Total Quantity",
      render: (data) => <>{data.totalQuantity.toLocaleString()}</>,
    },
    {
      key: "action",
      header: "",
      render: (data) => (
        <div className="flex gap-3">
          <p
            className="text-blue-500 hover:font-semibold cursor-pointer transition-all"
            onClick={() => handleDetailCart(data)}
          >
            Detail
          </p>
        </div>
      ),
    },
  ];

  const handleDetailCart = (data: CartData) => {
    router.push({ pathname: `${CARTS_DETAILS_ROUTE}/${data.id}` });
  };

  const handleSetQueryParams = (currentQueryParams: QueryParams) => {
    setQueryParams(currentQueryParams);
    router.push({ pathname, params: currentQueryParams });
  };

  const handleChangePagination = (currentSkipValue: number) => {
    handleSetQueryParams({ ...queryParams, skip: currentSkipValue });
  };

  const handleChangeRowPerPage = (limit: number) => {
    handleSetQueryParams({
      ...queryParams,
      limit,
    });
  };

  return {
    columns,
    data,
    loading,
    error,
    queryParams,
    handleChangePagination,
    handleChangeRowPerPage,
    productList: data?.carts,
  };
};

export default useIndex;
