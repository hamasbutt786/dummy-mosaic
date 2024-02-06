// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, PointElement, LinearScale } from 'chart.js'
//
//
// ChartJS.register(
//   ArcElement, PointElement,
//   LinearScale
// )
//
//
// const PieChart = ({data,options}) => (
//
//   <div>
//     <Pie data={data} options={options} />
//   </div>
// );
//
// export default PieChart;

import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import React from "react";

const PieChart = ({ data, options }) => {
  const canvasRefBar = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (canvasRefBar.current === null) return;
    const ctx = canvasRefBar.current.getContext("2d");

    if (chart) {
      chart.destroy();
    }
      // Modify options to disable animation
      const modifiedOptions = {
        ...options,
        animation: {
          duration: 0 // general animation time
        },
        // hover: {
        //   animationDuration: 0 // duration of animations when hovering an item
        // },
        // responsiveAnimationDuration: 0, // animation duration after a resize
      };
    let newChart = new Chart(ctx, {
      type: "pie",
      data,
      options:modifiedOptions,
    });
    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, [canvasRefBar,data,options]);
  return <canvas className="max-w-[116px]" ref={canvasRefBar} />;
};

export default PieChart;
