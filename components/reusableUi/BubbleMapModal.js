import React, { useRef, useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const BubbleMapModal = (props) => {
  const { mapInsider, theme, selectedData, setSelectedData, setModal, modal } = props;
  const newArr = [selectedData];
  const chartRef = useRef(null);

  useEffect(() => {
    if (selectedData === undefined) return;

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
            radius: 15,
            fillOpacity: 0.7,
            fill: am5.color(theme ? theme : "#047857"),
            cursorOverStyle: "pointer",
            // tooltipText: `{facilityNames}`,
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
          fontSize: 14,
          centerY: am5.p50,
        })
      );

      circle.events.on("click", function (event) {
        setModal(false)
        setSelectedData(null)

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

    bubbleSeries.data.setAll(newArr);

    return () => {
      root.dispose();
    };
  }, [mapInsider, selectedData, theme]);

  return (
    <div className=" h-[472px] w-full absolute top-0 z-[300] m-auto">
      <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className="">
        <div className="relative w-full min-h-[472px] max-h-[472px]">
          <div className="relative bg-summary-cards min-h-[472px] max-h-[472px] flex shadow ">
            <button
              onClick={() => {
                setModal(false);
                setSelectedData(null)
              }}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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

            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-card-heading whitespace-nowrap lg:text-xl ">
                {selectedData?.countryName}
              </h3>
            </div>
            <div id="chartdive12345" className="top-[20%]" ref={chartRef}></div>
            {
              <>
                {selectedData?.buyers?.length > 0 && (
                  <div className="p-6 ">
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Buyer Name & Address
                    </p>
                    <ul className="my-4 space-y-3 h-full  min-h-[380px] max-h-[380px] overflow-auto">
                      {selectedData?.buyers.map((item, index) => {
                        return (
                          <li>
                            <a
                              href="#"
                              className={`flex flex-col items-start gap-2 p-3 text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow `}
                            >
                              {item.split(',').map((item2, indexes) => {
                                return <div key={indexes} className="flex  ml-3 whitespace-nowrap">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-building-factory-2"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#000000"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M3 21h18" />
                                    <path d="M5 21v-12l5 4v-4l5 4h4" />
                                    <path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" />
                                    <path d="M9 17h1" />
                                    <path d="M14 17h1" />
                                  </svg>
                                  {item2}
                                </div>
                              })}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleMapModal;
