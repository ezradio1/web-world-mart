import Loader from "@/assets/SVG/Loader";
import EmptyState from "@/components/EmptyState";
import clsx from "clsx";
import type { TableProps } from "../../index.types";

const DesktopTable = <T extends unknown>(props: TableProps<T>) => {
  const {
    columns,
    data,
    loading,
    currentPage,
    rowsPerPage = 5,
  } = props;

  const getAlignment = (value: "left" | "center" | "right") => {
    const alignment = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return alignment[value];
  };

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-xs border bg-white">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    "py-3 px-4 text-left font-bold uppercase text-gray-600 border-b border-gray-300",
                    getAlignment(column.align || "left"),
                    column.width
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {!loading && data.length === 0 ? (
              <tr className="border">
                <td colSpan={columns.length} className="py-8">
                  <EmptyState size={125} />
                </td>
              </tr>
            ) : loading ? (
              <tr className="border h-[calc(100vh-370px)]">
                <td colSpan={columns.length} className="py-8">
                  <Loader />
                  <p className="text-center">Loading...</p>
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {columns.map((column, colIndex) => {
                      const normalizedItem = item as unknown as Record<
                        string,
                        string | number
                      >;
                      return (
                        <td
                          key={colIndex}
                          className={clsx(
                            "py-3 px-4",
                            getAlignment(column.align || "left"),
                            column.width
                          )}
                        >
                          {column.key === "no"
                            ? `${Number(
                                rowIndex + 1 + (currentPage - 1) * rowsPerPage
                              )}.`
                            : column.render
                            ? column.render(item)
                            : normalizedItem[column.key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesktopTable;
