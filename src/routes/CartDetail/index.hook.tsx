import { TableColumn } from "@/components/Table/index.types";
import useCustomRouter from "@/hooks/useCustomRouter";
import useFetchData from "@/hooks/useFetchData";
import useGetAllQueryParams from "@/hooks/useGetAllQueryParams";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type {
  CartDetailResponse,
  ProductData,
  QueryParams,
  UserResponse,
} from "./index.types";

const useIndex = () => {
  const routers = useRouter();
  const { id } = useParams();
  const { data, loading, error } = useFetchData<CartDetailResponse>({
    url: `carts/${id}`,
  });
  const { data: userData } = useFetchData<UserResponse>({
    url: `user/${data?.userId}`,
  });

  const router = useCustomRouter();
  const pathname = usePathname();

  const columns: TableColumn<ProductData>[] = [
    {
      key: "title",
      header: "Name",
    },
    {
      key: "price",
      header: "Price",
      render: (data) => <>{data.price.toLocaleString()}</>,
    },
    {
      key: "quantity",
      header: "quantity",
      render: (data) => <>{data.quantity.toLocaleString()}</>,
    },
    {
      key: "total",
      header: "total",
      render: (data) => <>{data.total.toLocaleString()}</>,
    },
    {
      key: "discountPercentage",
      header: "Discount (%)",
      render: (data) => <>{data.discountPercentage.toLocaleString()}</>,
    },
    {
      key: "discountedPrice",
      header: "Discount (Price)",
      render: (data) => <>{data.discountedPrice.toLocaleString()}</>,
    },
  ];

  return {
    columns,
    data,
    loading,
    error,
    productList: data?.products,
    cartDetail: data,
    userData,
  };
};

export default useIndex;
