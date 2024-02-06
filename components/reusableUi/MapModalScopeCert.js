import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const MapModalScopeCert = ({ setModal, detailsModal, theme, compName }) => {
    useEffect(() => {
        // Create a map instance
        const chart = am4core.create(
            "scope-and-summary-side-modal",
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
        circle.strokeWidth = 2;
        circle.tooltipText = "{title}";

        // Add data to the series
        // series.data = cities

        series.data = [detailsModal];

        // Apply theme
        chart.applyTheme(am4themes_animated);

        // Cleanup on component unmount
        return () => {
            chart.dispose();
        };
    }, [detailsModal.latitude, detailsModal.longitude, detailsModal.title]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // Add leading zeros for day and month when necessary
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }
    return (
        <div
            className={`${compName === "scope" ? "h-[337px]" : "h-[237px]"
                }  w-full absolute top-0 z-[10] m-auto`}
        >
            <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className="">
                <div className="relative w-full h-full ">
                    <div className="relative  bg-summary-cards  flex flex-col shadow min-h-[340px] max-h-[340px]">
                        <button
                            onClick={() => {
                                setModal(false);
                            }}
                            type="button"
                            className="absolute top-0 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                            data-modal-hide="crypto-modal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 z-30"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div
                            className={`px-6 ${compName === "scope" ? "py-4" : "py-1"
                                } border-b rounded-t `}
                        >
                            <h3 className="text-base font-semibold text-card-heading lg:text-xl ">
                                {detailsModal?.cName}
                            </h3>
                        </div>
                        <div className="flex justify-between  h-full">
                            <div
                                id={"scope-and-summary-side-modal"}
                            // id={
                            //  ` chartdive123`
                            // }
                            ></div>
                            {
                                <>
                                    {detailsModal && (
                                        <div
                                            className={`p-6 pr-0 w-[300px] ${compName === "scope"
                                                ? "xl:h-[272px] h-[278px] "
                                                : "h-[222px]"
                                                }`}
                                        >
                                            <p className="text-sm font-bold md:min-w-[130px] text-card-subheading ">
                                                Country Details:
                                            </p>
                                            <ul className="my-1 bg-summary-cards space-y-3  h-full overflow-auto">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="flex  flex-col items-start py-3 pl-1 text-sm font-bold text-card-heading rounded-lg bg-summary-cards group"
                                                    >
                                                        Facility Name
                                                        <span className="flex flex-col font-normal text-xs ">
                                                            {detailsModal?.facilityName}
                                                        </span>
                                                    </a>
                                                </li>
                                                {/* <li>
                                                    <a
                                                        href="#"
                                                        className="flex  flex-col items-start py-3 pl-1 text-sm font-bold text-card-heading rounded-lg bg-summary-cards group "
                                                    >
                                                        Certified Materials List
                                                        {detailsModal?.evidenceMaterial?.map((item, id) => {
                                                            return (
                                                                <span
                                                                    key={id}
                                                                    class="flex flex-col font-normal text-xs "
                                                                >
                                                                    {item}
                                                                </span>
                                                            );
                                                        })}
                                                    </a>
                                                </li> */}
                                                {/* <li>
                                                    <a
                                                        href="#"
                                                        className="flex  flex-col items-start py-3 pl-1 text-sm font-bold text-card-heading rounded-lg bg-summary-cards group "
                                                    >
                                                        <div className="w-full">
                                                            <span
                                                                class="flex flex-col font-normal text-xs "
                                                            >
                                                                <span className="font-bold">Expiry Date:</span>{formatDate(new Date(detailsModal.expiryDate))}
                                                            </span>
                                                        </div>


                                                    </a>
                                                </li> */}
                                                {/* <li>
                          <a
                            href="#"
                            className="flex  flex-col items-start py-3 pl-1 text-sm font-bold text-card-heading rounded-lg bg-summary-cards  group  "
                          >
                            Facility Name
                            <span class="flex flex-col font-normal text-xs ">
                              {detailsModal?.facilityName}
                            </span>
                          </a>
                        </li> */}
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="flex  flex-col items-start py-3 pl-1 text-sm font-bold text-card-heading rounded-lg bg-summary-cards  group "
                                                    >
                                                        Facility Address
                                                        <span className="flex flex-col font-normal text-xs ">
                                                            {detailsModal?.facilityAddress.includes('null')?'-':detailsModal?.facilityAddress}
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapModalScopeCert;
