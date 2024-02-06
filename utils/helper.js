export const getOrCreateTooltip = (chart) => {
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

// export const externalTooltipHandler = (context) => {
//   // Tooltip Element
//   const { chart, tooltip } = context;
//   const tooltipEl = getOrCreateTooltip(chart);
//
//   // Hide if no tooltip
//   if (tooltip.opacity === 0) {
//     tooltipEl.style.opacity = 0;
//     return;
//   }
//
//   // Set Text
// if (tooltip.body) {
//   const titleLines = tooltip.title || [];
//   const bodyLines = tooltip.body.map((b) => b.lines);

//   const tableHead = document.createElement("thead");

//   titleLines.forEach((title) => {
//     const tr = document.createElement("tr");
//     tr.style.borderWidth = 0;

//     const th = document.createElement("th");
//     th.style.borderWidth = 0;
//     const text = document.createTextNode(title);

//     th.appendChild(text);
//     tr.appendChild(th);
//     tableHead.appendChild(tr);
//   });

//   const tableBody = document.createElement("tbody");
//   bodyLines.forEach((body, i) => {
//     const colors = tooltip.labelColors[i];

//     const span = document.createElement("span");
//     span.style.background = colors.backgroundColor;
//     span.style.borderColor = "#34D399";
//     span.style.borderWidth = "2px";
//     span.style.marginRight = "10px";
//     span.style.height = "50px";
//     span.style.width = "0px";
//     span.style.display = "inline-block";

//     const tr = document.createElement("tr");
//     tr.style.backgroundColor = "inherit";
//     tr.style.borderWidth = 0;

//     const td = document.createElement("td");
//     td.style.borderWidth = 0;

//     const text = document.createTextNode(body);

//     td.appendChild(span);
//     tr.appendChild(td);
//     td.appendChild(text);
//     tableBody.appendChild(tr);
//   });

//   const tableRoot = tooltipEl.querySelector("table");

//   // Remove old children
//   while (tableRoot.firstChild) {
//     tableRoot.firstChild.remove();
//   }

//   // Add new children
//   tableRoot.appendChild(tableHead);
//   tableRoot.appendChild(tableBody);
// }
//
//   const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
//
//   // Display, position, and set styles for font
//   tooltipEl.style.opacity = 1;
//   tooltipEl.style.left = positionX + tooltip.caretX + "px";
//   tooltipEl.style.top = positionY + tooltip.caretY + "px";
//   tooltipEl.style.font = tooltip.options.bodyFont.string;
//   tooltipEl.style.padding =
//     tooltip.options.padding + "px " + tooltip.options.padding + "px";
// };

// export const externalTooltipHandler = (context) => {
//   const { chart, tooltip } = context;
//   const tooltipEl = getOrCreateTooltip(chart);

//   if (tooltip.opacity === 0) {
//     tooltipEl.style.opacity = 0;
//     return;
//   }

//   // Creating the main container div
//   const mainContainer = document.createElement("div");
//   mainContainer.style.width = "160px";
//   mainContainer.style.height = "66px";
//   mainContainer.style.padding = "8px";
//   mainContainer.style.background = "#475569";
//   mainContainer.style.borderRadius = "4px";
//   mainContainer.style.gap = "8px";
//   mainContainer.style.display = "flex"; // Add flex display
//   mainContainer.style.alignItems = "center"; // Center the content vertically

//   // Creating the green line (moved inside the mainContainer)
//   const greenLineDiv = document.createElement("div");
//   greenLineDiv.style.width = "2px";
//   greenLineDiv.style.height = "100%"; // Added height to fill the container vertically
//   greenLineDiv.style.background = "#34D399";

//   // Creating the second inner div for the content
//   const contentDiv = document.createElement("div");
//   contentDiv.style.flex = "1"; // Expand to take all available space
//   contentDiv.style.flexDirection = "column";
//   contentDiv.style.justifyContent = "flex-start";
//   contentDiv.style.alignItems = "flex-start";
//   contentDiv.style.gap = "8px";
//   contentDiv.style.display = "inline-flex";

//   // Helper function to create value pairs (e.g., "Total: 65%")
//   const createValuePair = (label, value) => {
//     const pairDiv = document.createElement("div");
//     pairDiv.style.alignSelf = "stretch";
//     pairDiv.style.justifyContent = "space-between";
//     pairDiv.style.alignItems = "flex-start";
//     pairDiv.style.gap = "4px";
//     pairDiv.style.display = "inline-flex";

//     const labelDiv = document.createElement("div");
//     labelDiv.style.color = "white";
//     labelDiv.style.fontSize = "12px";
//     labelDiv.style.fontFamily = "Inter";
//     labelDiv.style.fontWeight = "400";
//     labelDiv.style.lineHeight = "12px";
//     labelDiv.style.wordWrap = "break-word";
//     labelDiv.textContent = label + ":";

//     const valueDiv = document.createElement("div");
//     valueDiv.style.color = "white";
//     valueDiv.style.fontSize = "12px";
//     valueDiv.style.fontFamily = "Inter";
//     valueDiv.style.fontWeight = "600";
//     valueDiv.style.lineHeight = "12px";
//     valueDiv.style.wordWrap = "break-word";
//     valueDiv.textContent = value;

//     pairDiv.appendChild(labelDiv);
//     pairDiv.appendChild(valueDiv);
//     return pairDiv;
//   };
//   const datasetIndex = tooltip.dataPoints[0].datasetIndex;
//   const dataIndex = tooltip.dataPoints[0].index;
//   const dataset = chart.data.datasets[datasetIndex];
//   const dataValue = dataset.data[dataIndex];

//   // Creating the 'Certified' text (added this part)
//   const certifiedTextDiv = document.createElement("div");
//   certifiedTextDiv.style.color = "white";
//   certifiedTextDiv.style.fontSize = "14px";
//   certifiedTextDiv.style.fontFamily = "Inter";
//   certifiedTextDiv.style.fontWeight = "600";
//   certifiedTextDiv.style.lineHeight = "14px";
//   certifiedTextDiv.style.wordWrap = "break-word";
//   certifiedTextDiv.textContent = "Certified";

//   // Creating the container for the two pairs of values
//   const valuesContainer = document.createElement("div");
//   valuesContainer.style.alignSelf = "stretch";
//   valuesContainer.style.height = "28px";
//   valuesContainer.style.flexDirection = "column";
//   valuesContainer.style.justifyContent = "flex-start";
//   valuesContainer.style.alignItems = "flex-start";
//   valuesContainer.style.gap = "4px";
//   valuesContainer.style.display = "flex";

//   // Creating the value pairs
//   // const totalValueDiv = createValuePair("Value");
//   // const facilitiesValueDiv = createValuePair("No. of Facilities", "374");
//   const dataValueDiv = createValuePair("Total", dataValue + "%");
//   const dataValueDiv2 = createValuePair("No. of Facilities:", dataValue );
//   // ...

//   // Appending elements to the DOM
//   valuesContainer.appendChild(dataValueDiv);
//   valuesContainer.appendChild(dataValueDiv2);
//   contentDiv.appendChild(certifiedTextDiv);
//   contentDiv.appendChild(valuesContainer);
//   mainContainer.appendChild(greenLineDiv); // Add the green line to the mainContainer
//   mainContainer.appendChild(contentDiv);

//   // ...

//   // Clear the existing content of the tooltip element and add the new structure
//   tooltipEl.innerHTML = "";
//   tooltipEl.appendChild(mainContainer);

//   // ...

//   // Get the canvas position and display the tooltip
//   // ...
// };
// Helper function to create or retrieve the tooltip element
export const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  if (!tooltip.body) return;
  if (chart._metasets.length < 1) return;
  const titleLines = tooltip.title || [];
  const bodyLines = tooltip.body.map((b) => b.lines);
  // const facilities = chart._metasets[0]._dataset.facilities.map((b) => b)
  // let facilities;
  // if (titleLines[0] === "Certification Expired") {
  //   facilities = chart._metasets[0]._dataset.facilities[2];
  // } else if (titleLines[0] === "Awaiting Certification") {
  //   facilities = chart._metasets[0]._dataset.facilities[1];
  // }
  //  else if (titleLines[0] === "Certified") {
  //   facilities = chart._metasets[0]._dataset.facilities[0];
  // }
  // Get the canvas position relative to the page
  const canvasRect = chart.canvas.getBoundingClientRect();

  // Calculate the position of the tooltip
  const positionX = canvasRect.left + window.pageXOffset + tooltip.caretX;
  const positionY = canvasRect.top + window.pageYOffset + tooltip.caretY;

  // Update the position and show the tooltip
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + "px";
  tooltipEl.style.top = positionY + "px";

  // Creating the main container div
  const mainContainer = document.createElement("div");
  mainContainer.style.width = "160px";
  mainContainer.style.height = "66px";
  mainContainer.style.padding = "8px";
  mainContainer.style.background = "#475569";
  mainContainer.style.borderRadius = "4px";
  mainContainer.style.gap = "8px";
  mainContainer.style.display = "flex"; // Add flex display
  mainContainer.style.alignItems = "center"; // Center the content vertically

  // Creating the green line (moved inside the mainContainer)
  const greenLineDiv = document.createElement("div");
  greenLineDiv.style.width = "2px";
  greenLineDiv.style.height = "100%"; // Added height to fill the container vertically
  greenLineDiv.style.background = "#34D399";

  // Creating the second inner div for the content
  const contentDiv = document.createElement("div");
  contentDiv.style.flex = "1"; // Expand to take all available space
  contentDiv.style.flexDirection = "column";
  contentDiv.style.justifyContent = "flex-start";
  contentDiv.style.alignItems = "flex-start";
  contentDiv.style.gap = "8px";
  contentDiv.style.display = "inline-flex";

  // Helper function to create value pairs (e.g., "Total: 65%")
  const createValuePair = (label, value) => {
    const pairDiv = document.createElement("div");
    pairDiv.style.alignSelf = "stretch";
    pairDiv.style.justifyContent = "space-between";
    pairDiv.style.alignItems = "flex-start";
    pairDiv.style.gap = "4px";
    pairDiv.style.display = "inline-flex";

    const labelDiv = document.createElement("div");
    labelDiv.style.color = "white";
    labelDiv.style.fontSize = "12px";
    labelDiv.style.fontFamily = "Inter";
    labelDiv.style.fontWeight = "400";
    labelDiv.style.lineHeight = "12px";
    labelDiv.style.wordWrap = "break-word";
    labelDiv.textContent = label + ":";

    const valueDiv = document.createElement("div");
    valueDiv.style.color = "white";
    valueDiv.style.fontSize = "12px";
    valueDiv.style.fontFamily = "Inter";
    valueDiv.style.fontWeight = "600";
    valueDiv.style.lineHeight = "12px";
    valueDiv.style.wordWrap = "break-word";
    valueDiv.textContent = value;

    pairDiv.appendChild(labelDiv);
    pairDiv.appendChild(valueDiv);
    return pairDiv;
  };

  // Creating the 'Certified' text (added this part)
  const certifiedTextDiv = document.createElement("div");
  certifiedTextDiv.style.color = "white";
  certifiedTextDiv.style.fontSize = "12px";
  certifiedTextDiv.style.fontFamily = "Inter";
  certifiedTextDiv.style.fontWeight = "600";
  certifiedTextDiv.style.lineHeight = "14px";
  certifiedTextDiv.style.wordWrap = "break-word";
  certifiedTextDiv.textContent = titleLines[0];

  // Creating the container for the value pair
  const valuesContainer = document.createElement("div");
  valuesContainer.style.alignSelf = "stretch";
  valuesContainer.style.height = "28px";
  valuesContainer.style.flexDirection = "column";
  valuesContainer.style.justifyContent = "flex-start";
  valuesContainer.style.alignItems = "flex-start";
  valuesContainer.style.gap = "4px";
  valuesContainer.style.display = "flex";

  // ...

  // Creating the value pair with the actual data value and "No. of Facilities" value
  const dataValueDiv = createValuePair("Total", bodyLines[0] + "%");
  // const dataValueDiv2 = createValuePair("No. of Facilities", facilities); // Replace "374" with the actual value

  // ...

  // Appending elements to the DOM
  valuesContainer.appendChild(dataValueDiv);
  // valuesContainer.appendChild(dataValueDiv2);
  contentDiv.appendChild(certifiedTextDiv);
  contentDiv.appendChild(valuesContainer);
  mainContainer.appendChild(greenLineDiv); // Add the green line to the mainContainer
  mainContainer.appendChild(contentDiv);

  // ...

  // Clear the existing content of the tooltip element and add the new structure
  tooltipEl.innerHTML = "";
  tooltipEl.appendChild(mainContainer);

  // ...

  // Get the canvas position and display the tooltip
  // ...
};

export function formattedForDate(date) {
  const originalDate = date;
  const parts = originalDate?.split("/");
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const convertedDate = new Date(formattedDate);
  return convertedDate;
}

export function formatPercentage(percentage) {
  if (percentage === 100) {
    return percentage;
  } else if (percentage.toFixed(1) % 1 === 0) {
    return Math.floor(percentage); // Round down to a whole number
  } else {
    return percentage.toFixed(1);
  }
}
export function handleSearch(e, filterFrom, setterArr) {
  let value = e.target.value.toLowerCase();
  if (filterFrom?.combinedData === undefined) return;
  let keys = Object.keys(Object.assign({}, filterFrom?.combinedData[0]));
  let fiteredArr = filterFrom?.combinedData
    ?.map((item, i) => {
      // if(item["facility"].toLowerCase().includes(value)||item["certifiedMaterial"].toLowerCase().includes(value)||item["scopeCertified"].toLowerCase().includes(value)||item["expiryDate"].toLowerCase().includes(value)||item["certificationType"].toLowerCase().includes(value)||item["supplier"].toLowerCase().includes(value)){
      //   return item
      // }
      return keys.map((it) => {
        if (`${item[it]}`?.toLowerCase().includes(value)) {
          return item;
        }
      });
    })
    .flat()
    .filter((it) => it != undefined);
  if (value.length === 0) {
    setterArr(filterFrom);
  } else {
    setterArr((pre) => ({ ...pre, combinedData: fiteredArr }));
  }
}

export function commonUniqueArraySplitter(arr) {
  const uniqueArr = arr?.reduce((unique, item) => {
    const found = unique.find((obj) => obj.title === item.title);
    if (!found) {
      unique.push(item);
    }
    return unique;
  }, []);
  return uniqueArr;
}

function formatPercentagesFinest(percentage) {
  let newPercentage = parseInt(percentage);
  if (isNaN(newPercentage)) return;
  if (newPercentage === 100) {
    return `${newPercentage}`;
  } else if (newPercentage.toFixed(1) % 1 === 0) {
    return `${Math.floor(newPercentage)}`; // Round down to a whole number
  } else {
    return `${newPercentage.toFixed(1)}`;
  }
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}