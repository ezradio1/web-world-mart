import { PRODUCT_API_ENDPOINT } from "./../../index.constants";
import useFetchData from "@/hooks/useFetchData";
import { ProductResponse } from "../../index.types";

const useFilterOptions = () => {
  const { data, loading, error } = useFetchData<ProductResponse>({
    url: PRODUCT_API_ENDPOINT.ALL_PRODUCT,
    // params: {
    //   limit: 100,
    // },
  });
  const { data: categoriesData } = useFetchData<string[]>({
    url: `${PRODUCT_API_ENDPOINT.ALL_PRODUCT}/categories`,
  });

  const filterDuplicateObjectsByKey = (key: "brand" | "category") => {
    const seenKeys = new Set();
    return data?.products.filter((obj) => {
      const keyValue = obj[key];
      if (!seenKeys.has(keyValue)) {
        seenKeys.add(keyValue);
        return true;
      }
      return false;
    });
  };

  return {
    brandList:
      filterDuplicateObjectsByKey("brand")
        ?.map((el) => {
          return {
            label: el.brand,
            value: el.brand,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label)) || [],
    categoryList:
      categoriesData?.map((el) => {
        return {
          label: el,
          value: el,
        };
      }) || [],
  };
};

export default useFilterOptions;
