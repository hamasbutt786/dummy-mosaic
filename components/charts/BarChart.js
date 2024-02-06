import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
// ChartJS.register(BarElement, CategoryScale, PointElement, LinearScale);
const BarChart = ({
  transectioMaterialData,
  filtration,
  choseDate,
  handlePageChange,
  rangeState,
  showSection,
}) => {
  const canvasRefBar = useRef(null);
  const [chart, setChart] = useState(null);
  const [val, setVal] = useState([]);
  function formatterTohundreds(arr) {
    let totalValueCalculated = arr?.reduce((acc, ite) => acc + ite, 0);
    let arrayOfPercentagesInHundreds = arr?.map((ite) =>
      ite === 0 ? 10 : Math.round((ite / totalValueCalculated) * 100)
    );
    return arrayOfPercentagesInHundreds;
  }
  const transectioMaterialDataUpdated =
    transectioMaterialData?.monthlyBreakdown === undefined
      ? []
      : Object.values(transectioMaterialData?.monthlyBreakdown);
  useEffect(() => {
    // if (transectioMaterialData === undefined) return;
    // if (choseDate === undefined) return;
    if (canvasRefBar.current === null) return;
    const fullyReceivedArr = transectioMaterialDataUpdated?.map((ite) => {
      return ite["Fully_Received"];
    });

    const partiallyReceivedArr = transectioMaterialDataUpdated?.map((ite) => {
      return ite["Partially_Received"];
    });

    const AwaitingEvidenceArr = transectioMaterialDataUpdated?.map((ite) => {
      return ite["Awaiting_Evidence"];
    });
    let datasets = [
      {
        label: "Fully Received",
        backgroundColor: "#34D399",
        data: formatterTohundreds(fullyReceivedArr),
      },
      {
        label: "Partially Received",
        backgroundColor: "#FCD34D",
        data: formatterTohundreds(partiallyReceivedArr),
      },
      {
        label: "Awaiting Evidence",
        backgroundColor: "#F87171",
        data: formatterTohundreds(AwaitingEvidenceArr),
      },
    ];
    let newDataSets = datasets.map((it) => {
      if (filtration.includes(it.label)) {
        return it;
      } else {
        switch (it.label) {
          case "Awaiting Evidence":
            return { ...it, backgroundColor: "#fee2e2" };
          case "Partially Received":
            return { ...it, backgroundColor: "#fef3c7" };
          case "Fully Received":
            return { ...it, backgroundColor: "#d1fae5" };
        }
      }
    });

    // let newMappedDataSet = filtration.length === 0 ? datasets : datasets.filter(dataset => filtration.includes(dataset.label));
    // setVal(newMappedDataSet)
    const ctx = canvasRefBar.current.getContext("2d");
    const data = {
      // labels: Keys,
      datasets: filtration.length === 0 ? datasets : newDataSets,
      // datasets: datasets
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    };
    let options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      tooltips: {
        enabled: true,
        displayColors: true,
        // callbacks: {
        //   mode: "x",
        // },
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const label = context.chart.data.labels[dataIndex];
            const datasets = context.chart.data.datasets;
            let totalPercentage = 0;

            const tooltipLabel = datasets.map((dataset) => {
              const percentage = dataset.data[dataIndex];
              totalPercentage += percentage;
              return `${dataset.label}: ${percentage}%`;
            });

            tooltipLabel.push(`Total: ${totalPercentage}%`);

            return tooltipLabel;
            // const percentage = data.datasets?.map((item) => {
            //   if (item?.data !== undefined) {
            //     return item.data[dataIndex];
            //   }
            // });
            // const percentageString = percentage + "%";
            // return `${label}: ${percentageString}`;
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          gridLines: {
            display: false,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 100, // Set the maximum value of the y-axis to 100
          ticks: {
            callback: function (value) {
              return value.toString() + "%";
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    if (chart) {
      chart.destroy();
    }
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
    setChart(newChart);
    let partiallyReceivedDataset = null; // Variable to store the "Partially Received" dataset

    newChart.canvas.onclick = function (event) {
      const elements = newChart.getElementsAtEventForMode(event, "point", {
        intersect: true,
      });
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const datasets = data.datasets;

        // Access the label of the clicked dataset
        const clickedDataset = datasets[elements[0].datasetIndex]; // datasetIndex is the index of the clicked dataset
        const label = clickedDataset.label;
        // let filterdVal = val.filter(dataset => label === dataset.label)
        // setVal(filterdVal)
        handlePageChange(0, rangeState, label);
      }
    };
    return () => {
      newChart.destroy();
    };
  }, [
    transectioMaterialData?.monthlyBreakdown,
    choseDate,
    val.length,
    showSection,
    filtration?.length,
  ]);
  ////

  // return (
  //   <>
  //     <Bar data={data} options={options} />
  //   </>
  // );
  return <canvas ref={canvasRefBar} />;
};

export default BarChart;
