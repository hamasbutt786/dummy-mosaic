import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import RawMaterialMapModal from "@/components/modals/RawMaterialMapModal";
const MaterialMapModal = (props) => {
  let {
    detailsModal,
    setModal,
    compName,
    theme,
    colorMaterialMap,
    setDetailsModal,
  } = props;
  console.log(detailsModal);
  const [showDepartment, setShowDepartment] = React.useState(null);
  useEffect(() => {
    // Set theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create(
      compName === "raw-material" || compName === "BCCUs"
        ? "chartdive123"
        : "chartdiv223",
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
    polygonSeries.include = [
      detailsModal?.abbreviation
        ? detailsModal?.abbreviation
        : detailsModal?.avvreviation
          ? detailsModal?.avvreviation
          : detailsModal?.country_code,
    ];
    // Configure appearance for non-highlighted countries
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    // polygonTemplate.fill = am4core.color("#E6E9EB");
    const highlightCountries = [
      detailsModal?.abbreviation
        ? detailsModal?.abbreviation
        : detailsModal?.avvreviation
          ? detailsModal?.avvreviation
          : detailsModal?.country_code,
    ];
    // Apply the same gradient color to the specified countries
    polygonSeries.events.on("ready", () => {
      polygonSeries.mapPolygons.each((mapPolygon) => {
        const id = mapPolygon.dataItem.dataContext.id;
        if (highlightCountries.includes(id)) {
          if (
            detailsModal.totalWeight ||
            detailsModal.total_weight ||
            detailsModal?.sumMaterialWeight
          ) {
            const totalWeight =
              detailsModal.totalWeight ||
              detailsModal.total_weight ||
              detailsModal?.sumMaterialWeight;
            const gradient = new am4core.LinearGradient();
            if (totalWeight < 100) {
              // gradient.addColor(am4core.color("#BDC3C7"), 0);

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
            } else {
              // gradient.addColor(am4core.color("#BDC3C7"), 0);
              gradient.addColor(
                am4core.color(colorMaterialMap.extradarkcolor),
                1
              );
            }
            mapPolygon.fill = gradient;
          }
        }
      });
    });
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color("#7F8FA4");
    polygonSeries.tooltip.fontSize = "12px";

    // Load the map chart
    chart.invalidateData();
    // Cleanup when component unmounts
    return () => {
      chart.dispose();
    };
  }, [
    detailsModal?.total_weight,
    detailsModal?.sumMaterialWeight,
    compName,
  ]);
  return (
    <>
      {compName === "raw-material" || compName === "BCCUs" ? (
        <RawMaterialMapModal
          setModal={setModal}
          detailsModal={detailsModal}
          compName={compName}
          colorMaterialMap={colorMaterialMap}
        />
      ) : (
        <div
          className={`${compName === "raw-material" || compName === "BCCUs"
            ? "hidden"
            : "block"
            } h-full max-h-[472px] w-full absolute top-0 z-[300] m-auto`}
        >
          <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className="">
            <div className="relative w-full min-h-[492px]">
              <div className="relative flex shadow bg-summary-cards dark:bg-summary-cards">
                <button
                  onClick={() => {
                    setModal(false);
                    setDetailsModal(null);
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
                  <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    {detailsModal?.countryName}
                  </h3>
                </div>
                <div
                  id={
                    compName === "raw-material" || compName === "BCCUs"
                      ? "chartdive123"
                      : "chartdiv223"
                  }
                  className="top-[20%]"
                ></div>
                {
                  <>
                    {detailsModal && (
                      <div className="p-6 ">
                        <p className="text-sm font-normal md:min-w-[320px] text-gray-500 dark:text-gray-400">
                          Facility Name,Facilities & Units
                        </p>
                        <ul className="my-4 space-y-3 h-full  min-h-[400px] max-h-[400px] overflow-auto">
                          <li>
                            <a
                              className={`flex flex-col items-start p-3 md:text-xl font-bold text-card-heading rounded-lg bg-summary-cards  group hover:shadow `}
                            >
                              Total Weight (t)
                              <span className="flex-1 md:text-base font-normal whitespace-nowrap">
                                {Math.round(detailsModal?.totalWeight)}
                              </span>
                            </a>
                            {/* {detailsModal?.departments && <a
                              className={`flex flex-col items-start p-3 md:text-xl font-bold text-card-heading rounded-lg bg-summary-cards  group hover:shadow  `}
                            >
                              Departments
                              {detailsModal?.departments
                                ?.slice(0, 10)
                                ?.map((item, id) => {
                                  return (
                                    <span
                                      key={id}
                                      className="flex-1 md:text-base font-normal whitespace-nowrap"
                                    >
                                      {`${id + 1 < 10 ? "0" + (id + 1) : id + 1
                                        } : ${item}`}
                                    </span>
                                  );
                                })}
                            </a>} */}
                            <a
                              className={`flex flex-col items-start p-3 md:text-xl font-bold text-card-heading rounded-lg bg-summary-cards  group hover:shadow `}
                            >
                              Supplier Names
                              {detailsModal?.suppliers?.map((item, id) => {
                                return (
                                  <>
                                    <span
                                      onClick={() => setShowDepartment(id)}
                                      key={id}
                                      className="flex-1 cursor-pointer md:text-base font-medium whitespace-nowrap"
                                    >
                                      {`${id + 1 < 10 ? "0" + (id + 1) : id + 1
                                        } : ${item}`}
                                      <span
                                        className={`cursor-pointer ${id == showDepartment
                                          ? "flex"
                                          : "hidden"
                                          } pl-2 w-full cursor-pointer md:text-base font-medium whitespace-nowrap`}
                                      >
                                        {`- Total weight: ${Math?.round(
                                          item.totalWeight
                                        )}`}
                                      </span>
                                      {/* <div>
                                          <span className={` cursor-pointer ${id == showDepartment ? "flex" : "hidden"} pl-2 flex-col md:text-base font-medium whitespace-nowrap`}
                                          >
                                            Departments:
                                          </span>
                                          {
                                            item?.supplierDepartments?.map((ite, idx) => {
                                              return <span
                                                key={idx}
                                                className={` cursor-pointer ${id == showDepartment ? "flex" : "hidden"} pl-2 flex-col md:text-base font-normal whitespace-nowrap`}
                                              >
                                                {`- ${ite}`}
                                              </span>
                                            })
                                          }
                                        </div> */}
                                    </span>
                                  </>
                                );
                              })}
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
      )}
    </>
  );
};

export default MaterialMapModal;
