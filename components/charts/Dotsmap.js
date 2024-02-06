import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MapModalScopeCert from "../reusableUi/MapModalScopeCert";
import MapModal from "../reusableUi/MapModal";

// const MapModal = dynamic(() => import("../reusableUi/MapModal"), {
//   ssr: false,
// });
const MapChart = ({
  compName,
  theme,
  mapInsider,
  dataFacilityCountry1,
  DotsmapData,
  facilityTable1,
  supplierCountryMap,
}) => {
  const [modal, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState("");
  useEffect(() => {
    const cities = DotsmapData?.map((item) => {
      return {
        latitude: item?.lat,
        longitude: item?.lng,
        title: item?.country,
        cName: item?.country,
        facilityName: item?.name,
        facilityAddress: item?.address,
        evidenceMaterial: item?.materials,
      };
    });
    const cities1 = dataFacilityCountry1?.map((item) => {
      return {
        latitude: item?.facilityLatitude,
        longitude: item?.facilityLongitude,
        title: item?.facilityCountry,
      };
    });
    const cities2 = facilityTable1?.map((item) => {
      return {
        latitude: item?.sellerAddress?.lat,
        longitude: item?.sellerAddress?.lng,
        title: item?.facilityCountry,
        cName: item?.country,
        facilityName: item?.buyerName,
        facilityAddress: `${item?.buyerAddress.address_line_1} ${item?.buyerAddress.address_line_2}`,
        expiryDate: item?.expiryDate,
        evidenceMaterial: item?.evidenceMaterial,
      };
    });
    const cities3 = supplierCountryMap
      ?.map((item, id) => {
        return {
          id: item?.countryAttribute, // latitude: item?.facilityLatitude,
          longitude: item?.longitude,
          latitude: item?.latitude,
          title: `${item?.countryName}`,
          cName: item?.countryName,
          totalWeight: item?.totalWeight,
        };
      })
      .filter((it) => it?.id !== undefined);
    // Create a map instance
    const chart = am4core.create(
      compName === "scope"
        ? "chartdive1"
        : compName === "raw-material"
          ? "chartdive2"
          : "chartdive",
      am4maps.MapChart
    );

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antarctica from the map
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Create a series for dots/markers
    const series = chart.series.push(new am4maps.MapImageSeries());

    // Create template for a dot
    const imageTemplate = series.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;

    // Create a circle shape for the dot
    const circle = imageTemplate.createChild(am4core.Circle);
    circle.radius = 8;
    circle.fill = am4core.color(theme ? theme : "#047857");
    circle.stroke = am4core.color("#FFFFFF");
    circle.strokeWidth = 6;
    circle.tooltipText =
      compName === "scope" || `raw-material` || "summary"
        ? "{facilityName}"
        : "{title}";

    // Add data to the series
    // series.data = cities
    if (dataFacilityCountry1) {
      series.data = cities1;
    } else if (DotsmapData) {
      series.data = cities;
    } else if (compName === "scope") {
      series.data = cities2;
    } else {
      series.data = cities3;
    }
    // else {
    //   citySeries?.data?.setAll(cities3);
    // }
    // Add click event listener to display details
    imageTemplate.events.on("hit", (event) => {
      const dataItem = event.target.dataItem.dataContext;
      setModal(true);
      setDetailsModal(dataItem);
      // Add your code to display the details based on the clicked data item
    });

    chart.applyTheme(am4themes_animated);

    // Cleanup on component unmount
    return () => {
      chart.dispose();
    };
  }, [
    theme,
    compName,
    mapInsider,
    DotsmapData?.length,
    dataFacilityCountry1?.length,
    facilityTable1?.length,
    supplierCountryMap?.length,
  ]);
  return (
    <div className={`relative`}>
      <div
        id={
          compName && compName.includes("scope")
            ? "chartdive1"
            : compName && compName.includes("raw-material")
              ? "chartdive2"
              : "chartdive"
        }
      />

      {modal && compName === "summary" && (
        <MapModal
          className=""
          compName={compName}
          modal={modal}
          theme={theme}
          detailsModal={detailsModal}
          setModal={setModal}
        />
      )}
      {modal && compName != "summary" && (
        <MapModalScopeCert
          className=""
          compName={compName}
          modal={modal}
          theme={theme}
          detailsModal={detailsModal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default MapChart;
