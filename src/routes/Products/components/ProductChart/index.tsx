import React, { useEffect, useRef, useState } from "react";
import type { ProductChartProps } from "./index.types";
import Chart from "chart.js/auto";
import clsx from "clsx";
import { FiChevronDown } from "react-icons/fi";

const ProductChart = (props: ProductChartProps) => {
  const { products } = props;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext("2d");

      if (myChartRef) {
        var chart = new Chart(myChartRef, {
          type: "bar",
          data: {
            labels: products.map((el) => el.title),
            datasets: [
              {
                label: "Stock",
                data: products.map((el) => el.stock),
              },
            ],
          },
        });

        return () => {
          chart.destroy();
        };
      }
    }
  }, [products]);

  return (
    <div className="bg-white border p-3 cursor-pointer">
      <div
        className="flex justify-between items-center"
        onClick={() => setShowChart((prevState) => !prevState)}
      >
        <p className="font-semibold">Show Chart</p>
        <div
          className={clsx("transition-all", {
            "rotate-180": showChart,
          })}
        >
          <FiChevronDown />
        </div>
      </div>
      <div
        style={{
          height: showChart
            ? `${canvasContainerRef?.current?.clientHeight}px`
            : 0,
        }}
        className="overflow-y-hidden w-full transition-all duration-500 ease-out"
      >
        {products && (
          <div ref={canvasContainerRef}>
            <canvas ref={chartRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductChart;
