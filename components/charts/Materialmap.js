import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { useState } from "react";
import MaterialMapModal from "../reusableUi/MaterialMapModal";
import LinearGradientBar from "../reusableUi/LinearGradientBar";

const AmChartsMap = (props) => {
  let {
    mapInsider,
    materialsMap,
    factoryMap,
    activeTab,
    fills,
    colorMaterialMap,
    compName,
    theme,
    rangeState,
    supplierDetailsDataTriggerFunction,
  } = props;
  const [modal, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(null);
  let updatedMaterialsMap =
    materialsMap == undefined ? [] : Object.values(materialsMap);
  useEffect(() => {
    const newArr = updatedMaterialsMap
      ?.map((item) => {
        return {
          ...item,
          abbreviation: item["abbreviation"] || item["avvreviation"] || item['country_code'],
        };
      })
      .filter((kk) => kk !== undefined && kk !== null);
    // console.log({ newArr, updatedMaterialsMap });

    // Set theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create(
      compName === "raw-material"
        ? "chartdive22"
        : compName === "BCCUs"
          ? "chartdive23"
          : "chartdiv",
      am4maps.MapChart
    );

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Create polygon series for countries
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Exclude Antarctica from polygon series
    polygonSeries.exclude = ["AQ"];

    // Configure appearance for non-highlighted countries
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    // polygonTemplate.fill = am4core.color("#E6E9EB");
    const highlightCountries = [...newArr];
    polygonSeries.events.on("ready", () => {
      polygonSeries.mapPolygons.each((mapPolygon) => {
        mapPolygon.events.on("hit", (event) => {
          const dataItem = event.target.dataItem.dataContext;
          const materialData = newArr?.find(
            (item) => item["abbreviation"] === dataItem.id
          );
          if (materialData) {
            setModal(true);
            setDetailsModal(materialData);
          }
        });

        const id = mapPolygon.dataItem.dataContext.id;
        const materialData = highlightCountries?.find(
          (it) => it["abbreviation"] === id
        );
        console.log({ materialData });
        // if (highlightCountries.includes(id)) {
        if (materialData) {
          const totalWeight =
            materialData?.total_weight ||
            // materialData?.totalWeight ||
            materialData?.sumMaterialWeight;

          const gradient = new am4core.LinearGradient();
          if (totalWeight < 100) {
            gradient.addColor(
              am4core.color(colorMaterialMap.extralightcolor),
              1
            );
          } else if (totalWeight > 100 && totalWeight <= 300) {
            gradient.addColor(am4core.color(colorMaterialMap.ligthcolor), 1);
          } else if (totalWeight > 300 && totalWeight <= 500) {
            gradient.addColor(am4core.color(colorMaterialMap.mediumcolor), 1);
          } else if (totalWeight > 500 && totalWeight < 900) {
            gradient.addColor(am4core.color(colorMaterialMap.darkcolor), 1);
          } else if (totalWeight > 900) {
            // gradient.addColor(am4core.color("#BDC3C7"), 0);
            gradient.addColor(
              am4core.color(colorMaterialMap.extradarkcolor),
              1
            );
          }
          mapPolygon.fill = gradient;
        }
        // }
      });
    });
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color("#7F8FA4");
    chart.invalidateData();

    // Cleanup when component unmounts
    return () => {
      chart.dispose();
    };
  }, [
    mapInsider,
    fills,
    theme,
    factoryMap?.length,
    materialsMap?.length,
    colorMaterialMap,
  ]);
  useEffect(() => {
    setModal(pre => !pre)
  }, [activeTab])

  return (
    <>
      <div className="relative">
        {compName === "raw-material" ? (
          <>
            <div id={"chartdive22"}></div>
            <div className="absolute -bottom-14 right-5">
              <LinearGradientBar theme={theme} width={"w-12"} />
            </div>
          </>
        ) : compName === "BCCUs" ? (
          <>
            <div id={"chartdive23"}></div>
            <div className="absolute bottom-0 right-5">
              <LinearGradientBar theme={theme} width={"w-12"} />
            </div>
          </>
        ) : (
          <>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            <div className="absolute bottom-8 right-5">
              <LinearGradientBar theme={theme} />
            </div>
          </>
        )}
        {modal && (
          <MaterialMapModal
            className=""
            compName={compName}
            colorMaterialMap={colorMaterialMap}
            modal={modal}
            theme={theme}
            detailsModal={detailsModal}
            setDetailsModal={setDetailsModal}
            setModal={setModal}
          />
        )}
      </div>
    </>
  );
};

export default AmChartsMap;
