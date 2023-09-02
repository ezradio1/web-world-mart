import { useRouter } from "next/navigation";
import type { PushParams } from "./index.types";

const useCustomRouter = () => {
  const router = useRouter();

  const objectToQueryParams = (obj: PushParams["params"]) => {
    const queryParams = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== undefined) {
          queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          );
        }
      }
    }

    return queryParams.join("&");
  };

  const push = ({ pathname, params }: PushParams) => {
    const queryParams = objectToQueryParams(params)
      ? `?${objectToQueryParams(params)}`
      : "";
    return router.push(`${pathname}${queryParams}`);
  };

  return { push };
};

export default useCustomRouter;
