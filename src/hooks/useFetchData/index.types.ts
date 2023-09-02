import type { AxiosError } from "axios";

export interface UseFetchDataProps<T> {
  url: string;
  params?: Record<string, string | number | undefined>;
  initialData?: T | null;
  skip?: boolean;
}

export interface ReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}
