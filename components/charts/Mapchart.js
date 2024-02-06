import React, { useRef, useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import BubbleMapModal from "../reusableUi/BubbleMapModal";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
export const countryByAttribute = (att) => {
  if (att === undefined) return
  let country = am5geodata_data_countries2[att]
  return country?.country
}
function MapChart(props) {
  const { mapInsider, factoryMap, theme, compName, supplierDetailsDataTriggerFunction, rangeState } = props;
  const [modal, setModal] = useState(false);
  let newFactoryMap = factoryMap === undefined ? [] : factoryMap
  const newArr = Object.values(newFactoryMap)?.map((item) => {
    const { country_code, ...rest } = item;
    let countryName = countryByAttribute(country_code)
    if (country_code) {
      return {
        id: country_code,
        countryName,
        ...rest,
      };
    } else {
      return;
    }
  }).filter((kk) => kk !== undefined);
  const chartRef = useRef(null);
  const [selectedData, setSelectedData] = useState(null);

  function radiuss(dd) {
    if (dd.buyerCount >= 1 && dd.buyerCount <= 10) {
      return 14;
    } else if (dd.buyerCount >= 11 && dd.buyerCount <= 20) {
      return 16;
    } else if (dd.buyerCount >= 21 && dd.buyerCount <= 30) {
      return 18;
    } else if (dd.buyerCount >= 31 && dd.buyerCount <= 40) {
      return 20;
    } else if (dd.buyerCount >= 41 && dd.buyerCount <= 50) {
      return 30;
    } else if (dd.buyerCount >= 51 && dd.buyerCount <= 60) {
      return 35;
    } else if (dd.buyerCount >= 61 && dd.buyerCount <= 70) {
      return 45;
    } else if (dd.buyerCount >= 71 && dd.buyerCount <= 80) {
      return 55;
    }
  }

  // useEffect(() => {
  //   if (selectedData === null) {
  //     (supplierDetailsDataTriggerFunction && rangeState) && supplierDetailsDataTriggerFunction(0, rangeState, undefined, null)
  //     return
  //   }
  //   (supplierDetailsDataTriggerFunction && rangeState) && supplierDetailsDataTriggerFunction(0, rangeState, undefined, selectedData)
  // }, [selectedData])

  useEffect(() => {
    // if (factoryMap === undefined) return;

    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5map.MapChart.new(root, {}));

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color(mapInsider && mapInsider),
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    let bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        valueField: "buyerCount",
        calculateAggregates: true,
        polygonIdField: "id",
      })
    );

    let circleTemplate = am5.Template.new({});

    bubbleSeries.bullets.push(function (root, series, dataItem) {
      let container = am5.Container.new(root, {});

      let circle = container.children.push(
        am5.Circle.new(
          root,
          {
            radius: radiuss(dataItem.dataContext),
            fillOpacity: 0.7,
            fill: am5.color(theme ? theme : "#047857"),
            cursorOverStyle: "pointer",
            tooltipText: `{countryName}`,
            maxHeight: 120,
            maxWidth: 120,
            wrap: true,
          },
          circleTemplate
        )
      );

      let countryLabel = container.children.push(
        am5.Label.new(root, {
          text: "{countryName}",
          paddingLeft: 20,
          populateText: true,
          fontWeight: "bold",
          fontSize: 12,
          centerY: am5.p50,
        })
      );

      circle.events.on("click", function (event) {
        setSelectedData(event.target.dataItem.dataContext);
        setModal(true);
      });

      circle.on("radius", function (radius) {
        countryLabel.set("x", radius);
      });

      return am5.Bullet.new(root, {
        sprite: container,
        dynamic: true,
      });
    });

    bubbleSeries.bullets.push(function (root, series, dataItem) {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: "{buyerCount.formatNumber('#.')}",
          fill: am5.color("#d9d9d9"),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          textAlign: "center",
        }),
        dynamic: true,
      });
    });

    bubbleSeries.set("heatRules", [
      {
        target: circleTemplate,
        dataField: "buyerCount",
        min: 10,
        max: 50,
        minValue: 0,
        maxValue: 100,
        key: "radius",
      },
    ]);

    bubbleSeries?.data?.setAll(newArr);

    polygonSeries.events.on("datavalidated", function () {
      chart.zoomToGeoPoint({ longitude: 80.1262, latitude: 10.5002 }, 1.5);
    });
    return () => {
      root.dispose();
    };
  }, [mapInsider, factoryMap, theme]);

  return (
    <div className="relative">
      <div id="chartdiv" ref={chartRef}></div>
      {modal && (
        <BubbleMapModal
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          theme={theme}
          setModal={setModal}
          modal={modal}
          mapInsider={mapInsider}
        />
      )}
    </div>
  );
}

export default MapChart;
