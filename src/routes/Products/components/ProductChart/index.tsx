import React, { useEffect, useRef } from "react";
import type { ProductChartProps } from "./index.types";
import Chart from "chart.js/auto";

const ProductChart = (props: ProductChartProps) => {
  const { products } = props;
  const chartRef = useRef<HTMLCanvasElement | null>(null);

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

  return <canvas ref={chartRef} />;
};

export default ProductChart;
