import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import type { PriceFilterProps } from "./index.types";

const PriceFilterInput = (props: PriceFilterProps) => {
  const { value, onClick, onClear } = props;
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="min-w-[220px] h-[40px] text-sm flex items-center px-4 cursor-pointer hover:bg-gray-300 transition-all group border border-gray-400 rounded"
      >
        <div>
          {value ? (
            <span className="font-semibold">{value}</span>
          ) : (
            <span className="text-gray-400 group-hover:text-black font-medium">
              Filter Price Range
            </span>
          )}
        </div>
      </div>
      {value ? (
        <div
          onClick={onClear}
          className="absolute top-1/2 -translate-y-1/2 transform right-2 cursor-pointer"
        >
          <AiFillCloseCircle />
        </div>
      ) : null}
    </div>
  );
};

export default PriceFilterInput;
