import { createContext, useContext } from "react";

import useFetchData from "@/hooks/useFetchData";
import {
  ProductResponse,
  type FilterOptionContextValue,
  type FilterOptionProviderProps,
} from "./index.types";

const FilterOptionContext = createContext<FilterOptionContextValue | undefined>(
  undefined
);

const FilterOptionProvider = ({ children }: FilterOptionProviderProps) => {
  const { data } = useFetchData<ProductResponse>({
    url: "products",
    // params: {
    //   limit: 100,
    // },
  });
  const { data: categoriesData } = useFetchData<string[]>({
    url: `products/categories`,
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

  return (
    <FilterOptionContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterOptionContext.Provider>
  );
};

const useFilterOptionContext = () => {
  const context = useContext(FilterOptionContext);

  if (!context) {
    throw new Error(
      `"useFilterOptionContext" must be used within "FilterOptionProvider"`
    );
  }

  return context;
};

export { FilterOptionProvider, useFilterOptionContext };
