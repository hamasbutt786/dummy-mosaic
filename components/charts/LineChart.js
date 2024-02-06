import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
const LineChart = ({ filterData2023, filterData2022 }) => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // if (filterData2023 === undefined) return;
    // if (filterData2022 === undefined) return;
    let newFilteredData2023 =
      filterData2023 === undefined ? [] : filterData2023;
    let newFilteredData2022 =
      filterData2022 === undefined ? [] : filterData2022;
    let newfilterArra2023 =
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ].length - newFilteredData2023.length;
    const remainingArray = Array(newfilterArra2023).fill(0);
    const newArray = [...newFilteredData2023, ...remainingArray];
    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Current Year",
          // data: [65, 59, 80, 81, 56, 55, 40],
          // data: newArray?.map((it) => Math.round(it)),
          data: [...newFilteredData2023]?.map((it) => Math.round(it)),
          fill: false,
          borderColor: "#38BDF8",
          tension: 0.1,
          pointRadius: 0, // Set point radius to 0
          pointHoverRadius: 0
        },
        {
          label: "Last Year",
          // data: [65, 11, 22, 81, 56, 32, 40],
          data: newFilteredData2022.map((it) => Math.round(it)),
          fill: false,
          borderColor: "#F87171",
          tension: 0.1,
          pointRadius: 0, // Set point radius to 0
          pointHoverRadius: 0
        }
      ]
    };
    const options = {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "#475569"
          },
          generateLabels: {
            fillStyle: "#000"
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              const label = data.datasets[datasetIndex].label;
              const value = data.datasets[datasetIndex].data[dataIndex];
              const percentageString = value + "%";
              return `${label}: ${percentageString}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12 //this change the font size
            },
            
          }
        },
        y: {
          ticks: {
            font: {
              size: 10 //this change the font size
            },
            callback: function (value) {
              return value.toString() + "%";
            }
          }
        }
      }
    };
    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });
    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, [filterData2023?.length, filterData2022?.length]);

  return <canvas ref={canvasRef} />;
};

export default LineChart;
