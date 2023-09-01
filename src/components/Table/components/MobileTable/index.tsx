import Loader from "@/assets/SVG/Loader";
import EmptyState from "@/components/EmptyState";
import clsx from "clsx";
import type { TableProps } from "../../index.types";

const MobileTable = <T extends unknown>(props: TableProps<T>) => {
  const { columns, data, loading, currentPage, rowsPerPage = 5 } = props;

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="text-gray-600">
          {!loading && data.length === 0 ? (
            <div className="border h-[calc(100vh-400px)] bg-white flex justify-center items-center">
              <EmptyState size={125} />
            </div>
          ) : loading ? (
            <div className="border h-[calc(100vh-400px)] bg-white flex justify-center items-center">
              <div className="py-8">
                <Loader />
                <p className="text-center">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {data.map((item, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-b border-gray-200 bg-white p-3 flex flex-col gap-1"
                >
                  {columns.map((column, colIndex) => {
                    const normalizedItem = item as unknown as Record<
                      string,
                      string | number
                    >;
                    return (
                      <div
                        key={colIndex}
                        className="flex justify-between text-sm"
                      >
                        <p className="text-gray-400 capitalize">
                          {column.header}
                        </p>
                        <p className="font-semibold truncate pl-4">
                          {column.key === "no"
                            ? `${Number(
                                rowIndex + 1 + (currentPage - 1) * rowsPerPage
                              )}`
                            : column.render
                            ? column.render(item)
                            : normalizedItem[column.key]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileTable;
