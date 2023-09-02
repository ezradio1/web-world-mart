export interface PaginationProps {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onChangePagination: (key: number) => void;
  currentPage: number;
  paginationLength: number;
  rowsPerPage: number;
  skip: number;
}

export type PaginationParams = "+" | "-" | number;
