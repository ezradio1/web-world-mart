import useIsMobile from "@/hooks/useIsMobile";
import { noop } from "@/utils/noop";
import Pagination from "../Pagination";
import Select from "../Select";
import DesktopTable from "./components/DesktopTable";
import { PER_PAGE_OPTIONS } from "./index.constants";
import type { TableColumn, TableProps } from "./index.types";
import MobileTable from "./components/MobileTable";

const Table = <T extends unknown>(props: TableProps<T>) => {
  const {
    columns,
    data,
    onChangePagination,
    skip,
    rowsPerPage = 5,
    onChangeRowPerPage = noop,
    totalData,
  } = props;
  const { isMobile } = useIsMobile();

  const columnsWithNumber: TableColumn<T>[] = [
    { key: "no", header: "no", width: "w-8", align: "center" },
    ...columns,
  ];

  const currentPage = skip / rowsPerPage + 1;
  return (
    <div>
      <div className="w-full overflow-x-auto">
        {isMobile ? (
          <MobileTable {...props} columns={columnsWithNumber} />
        ) : (
          <DesktopTable {...props} columns={columnsWithNumber} />
        )}
      </div>
      <div className="flex flex-col bg-white p-3 md:flex-row justify-between gap-3 md:gap-4 items-end md:items-center mt-2">
        <div className="flex gap-2 items-center">
          <p className="text-xs">Rows per page: </p>
          <Select
            optionPosition="top"
            options={PER_PAGE_OPTIONS}
            value={rowsPerPage}
            className="w-16 h-7 md:h-10"
            onChange={(evt) =>
              onChangeRowPerPage(Number(evt.target.value || 5))
            }
          />
        </div>
        <Pagination
          isPrevDisabled={data.length === 0 || currentPage === 1}
          isNextDisabled={data.length * currentPage === totalData}
          onChangePagination={onChangePagination}
          currentPage={currentPage}
          paginationLength={Math.ceil(totalData / rowsPerPage)}
          rowsPerPage={rowsPerPage}
          skip={skip}
        />
      </div>
    </div>
  );
};

export default Table;
