import { TableColumn } from "@/components/Table/index.types";
import useFetchData from "@/hooks/useFetchData";
import { useParams } from "next/navigation";
import type {
  CartDetailResponse,
  ProductData,
  UserResponse
} from "./index.types";

const useIndex = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData<CartDetailResponse>({
    url: `carts/${id}`,
  });
  const { data: userData, loading: loadingUserData } = useFetchData<UserResponse>({
    url: `user/${data?.userId}`,
  });

  const columns: TableColumn<ProductData>[] = [
    {
      key: "title",
      header: "product name",
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
    loadingUserData,
  };
};

export default useIndex;
