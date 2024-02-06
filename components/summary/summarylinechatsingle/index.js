import { useEffect, useRef, useState } from "react";
import Chart, { scales } from "chart.js/auto";

const LineChart = ({ theme, yearValue, year }) => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "#475569";
      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  console.log({ yearValue, year })

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement("span");
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = "2px";
        span.style.marginRight = "10px";
        span.style.height = "10px";
        span.style.width = "0px";
        span.style.display = "inline-block";

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;

        const text = document.createTextNode(body);

        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
  };
  useEffect(() => {
    // if (year === undefined) return;
    // if (yearValue[0] === undefined) return;

    // let newVal;
    // if (Array.isArray(yearValue)) {
    //     newVal = yearValue?.map((value) => Math.round(value));
    // }
    const ctx = canvasRef.current.getContext("2d");
    const data = {
      labels: year,
      datasets: [
        {
          label: "Current Year",
          data: yearValue,
          borderColor: theme.border,
          tension: 0.4,
          backgroundColor: theme.rgba,
          fill: true,
          usePointStyle: true
        }
      ]
    };
    const options = {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "#94A3B8"
          },
          generateLabels: {
            fillStyle: "#000"
          }
        },
        title: {
          // display: true,
          // text: 'Chart.js Line Chart - External Tooltips'
        },
        tooltip: {
          enabled: false,
          position: "nearest",
          external: externalTooltipHandler,
          callbacks: {
            label: (context) => {
              const dataIndex = context.dataIndex;
              const label = data.labels[dataIndex];
              const percentage = data.datasets[0].data[dataIndex];
              const percentageString = percentage + "%";
              return `${label}: ${percentageString}`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            display: true,
            callback: function (value) {
              return value.toString() + "%";
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 10
            }
          }
        }
      },
      responsive: true
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
  }, [theme.border, yearValue, year]);

  return <canvas id="canvas-line" ref={canvasRef} height={"240"} />;
};

export default LineChart;
