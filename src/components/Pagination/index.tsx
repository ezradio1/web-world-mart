import { GRAY, PRIMARY } from "@/constants/colors";
import { noop } from "@/utils/noop";
import clsx from "clsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ELLIPSIS } from "./index.constants";
import type { PaginationParams, PaginationProps } from "./index.types";

const Pagination = (props: PaginationProps) => {
  const {
    isPrevDisabled,
    isNextDisabled,
    currentPage,
    onChangePagination,
    paginationLength,
    rowsPerPage,
    skip,
  } = props;

  let pageNumbers = Array.from({ length: paginationLength }, (_, index) =>
    String(index + 1)
  );

  if (pageNumbers.length > 9) {
    let firstPart = pageNumbers.slice(0, 1);
    let middlePart = [
      ELLIPSIS,
      ...Array.from({ length: 5 }, (_, i) => String(currentPage - 2 + i)),
      ELLIPSIS,
    ];

    const firstElement = Number(pageNumbers[0]);
    const lastElement = Number(pageNumbers[pageNumbers.length - 1]);
    if (currentPage + 3 >= lastElement) {
      middlePart = [
        ELLIPSIS,
        ...Array.from({ length: 5 }, (_, i) =>
          String(lastElement - 1 - i)
        ).reverse(),
      ];
    } else if (currentPage - 3 <= firstElement) {
      firstPart = pageNumbers.slice(0, 5);
      middlePart = [ELLIPSIS];
    }

    const lastPart = pageNumbers.slice(-1);
    pageNumbers = [];
    pageNumbers.push(...firstPart, ...middlePart, ...lastPart);
  }

  const actionClassName = (isDisabled: boolean, page = "") =>
    clsx(
      "rounded transition-all md:w-8 md:h-8 h-7 w-7 text-xs md:text-sm flex justify-center items-center",
      {
        "cursor-not-allowed": isDisabled,
        "cursor-pointer hover:border-primary border-gray-400":
          !isDisabled && page !== ELLIPSIS,
        border: page !== ELLIPSIS,
        "cursor-default": page === ELLIPSIS,
      }
    );

  const onChangePaginate = (key: PaginationParams) => {
    const currentSkipValue =
      typeof key === "number"
        ? rowsPerPage * (key - 1)
        : eval(`${skip} ${key} ${rowsPerPage}`);

    onChangePagination(currentSkipValue);
  };

  return (
    <div className="flex gap-1 md:gap-2">
      <div
        className={actionClassName(isPrevDisabled)}
        onClick={isPrevDisabled ? noop : () => onChangePaginate("-")}
      >
        <FiChevronLeft color={isPrevDisabled ? GRAY["300"] : PRIMARY} />
      </div>
      {pageNumbers.map((page, key) => (
        <div
          className={clsx(actionClassName(false, page), {
            "bg-primary text-white": currentPage === Number(page),
          })}
          onClick={
            page === ELLIPSIS || currentPage === Number(page)
              ? noop
              : () => onChangePaginate(Number(page))
          }
          key={key}
        >
          <p>{page}</p>
        </div>
      ))}
      <div
        className={actionClassName(isNextDisabled)}
        onClick={isNextDisabled ? noop : () => onChangePaginate("+")}
      >
        <FiChevronRight color={isNextDisabled ? GRAY["300"] : PRIMARY} />
      </div>
    </div>
  );
};

export default Pagination;
