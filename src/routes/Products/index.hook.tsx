import { TableColumn } from "@/components/Table/index.types";
import Tag from "@/components/Tag";
import useCustomRouter from "@/hooks/useCustomRouter";
import useFetchData from "@/hooks/useFetchData";
import useGetAllQueryParams from "@/hooks/useGetAllQueryParams";
import { usePathname } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MODAL_STATE, PRODUCT_API_ENDPOINT } from "./index.constants";
import type {
  PriceFilter,
  ProductData,
  ProductResponse,
  QueryParams,
} from "./index.types";

const useIndex = () => {
  const { q, skip, limit, category, brand, min, max } = useGetAllQueryParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: Number(limit || 10),
    skip: Number(skip || 0),
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
    q,
    category: category || "",
    brand: brand || "",
  });
  const [modal, setModal] = useState("");
  const [selectedData, setSelectedData] = useState<ProductData | undefined>();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(q);
  const [brandValue, setBrandValue] = useState(brand);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
  });
  const [url, setUrl] = useState(
    category
      ? `${PRODUCT_API_ENDPOINT.FILTER_PRODUCT_BY_CATEGORY}/${category}`
      : q
      ? PRODUCT_API_ENDPOINT.SEARCH_PRODUCT
      : PRODUCT_API_ENDPOINT.ALL_PRODUCT
  );
  const { data, loading, error, refetch } = useFetchData<ProductResponse>({
    url,
    params: queryParams,
  });

  const router = useCustomRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!category) {
      const currentQueryParams = {
        ...queryParams,
        q: searchValue || undefined,
        skip: searchValue ? skip : 0,
        brand: queryParams.brand || undefined,
        category: queryParams.category || undefined,
        min: queryParams.min || undefined,
        max: queryParams.max || undefined,
      };
      if (searchValue) {
        setLoadingSearch(true);
        const timeoutId = setTimeout(() => {
          setUrl(PRODUCT_API_ENDPOINT.SEARCH_PRODUCT);
          handleSetQueryParams(currentQueryParams);
          setLoadingSearch(false);
        }, 800);
        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        setUrl(PRODUCT_API_ENDPOINT.ALL_PRODUCT);
        router.push({ pathname, params: currentQueryParams });
      }
    }
  }, [searchValue, category, queryParams.brand]);

  const columns: TableColumn<ProductData>[] = [
    {
      key: "title",
      header: "Name",
    },
    {
      key: "brand",
      header: "brand",
    },
    {
      key: "category",
      header: "category",
      render: (data) => <Tag color="blue">{data.category}</Tag>,
    },
    {
      key: "price",
      header: "Price",
      render: (data) => <>{data.price.toLocaleString()}</>,
    },
    {
      key: "discountPercentage",
      header: "Discount (%)",
    },
    {
      key: "stock",
      header: "stock",
    },
    {
      key: "action",
      header: "",
      render: (data) => (
        <div className="flex gap-3">
          <p
            className="text-blue-500 hover:font-semibold cursor-pointer transition-all"
            onClick={() => handleEditProduct(data)}
          >
            Edit
          </p>
          <p
            className="text-red-500 hover:font-semibold cursor-pointer transition-all"
            onClick={() => handleDeleteProduct(data)}
          >
            Delete
          </p>
        </div>
      ),
    },
  ];

  const handleEditProduct = (data: ProductData) => {
    setModal(MODAL_STATE.EDIT);
    setSelectedData(data);
  };

  const handleDeleteProduct = (data: ProductData) => {
    setModal(MODAL_STATE.DELETE);
    setSelectedData(data);
  };

  const handleChangeSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
    if (evt.target.value === "") {
      setQueryParams((prevState) => ({
        ...prevState,
        q: undefined,
        skip: 0,
      }));
      return;
    }
  };

  const handleChangeCategory = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setUrl(
      value
        ? `${PRODUCT_API_ENDPOINT.FILTER_PRODUCT_BY_CATEGORY}/${value}`
        : PRODUCT_API_ENDPOINT.ALL_PRODUCT
    );
    handleSetQueryParams({
      ...queryParams,
      q: undefined,
      skip: 0,
      category: value || undefined,
    });
  };

  const handleChangeBrand = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setUrl(PRODUCT_API_ENDPOINT.ALL_PRODUCT);
    setBrandValue(value);
    handleSetQueryParams({ ...queryParams, brand: value || undefined });
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

  const productList = useCallback(() => {
    if (searchValue) {
      return data?.products.filter((el) =>
        el.title.toLowerCase().includes(String(searchValue).toLowerCase())
      );
    } else if (brandValue) {
      return data?.products.filter((el) => el.brand === brandValue);
    } else if (priceFilter.max && priceFilter.min) {
      return data?.products.filter(
        (el) =>
          el.price >= Number(priceFilter.min) &&
          el.price <= Number(priceFilter.max)
      );
    } else {
      return data?.products;
    }
  }, [data?.products, searchValue, brandValue]);

  const handleSubmitPriceFilter = (value: { min: number; max: number }) => {
    setPriceFilter(value);
    handleSetQueryParams({ ...queryParams, min: value.min, max: value.max });
  };

  const handleClearPriceFilter = () => {
    setPriceFilter({ min: 0, max: 0 });
    handleSetQueryParams({ ...queryParams, min: undefined, max: undefined });
  };

  return {
    columns,
    searchValue,
    brandValue,
    handleChangeSearch,
    data,
    loading: loading || loadingSearch,
    error,
    queryParams,
    handleChangePagination,
    handleChangeRowPerPage,
    handleChangeCategory,
    handleChangeBrand,
    productList: productList(),
    modal,
    setModal,
    selectedData,
    refetch,
    handleSubmitPriceFilter,
    handleClearPriceFilter,
  };
};

export default useIndex;
