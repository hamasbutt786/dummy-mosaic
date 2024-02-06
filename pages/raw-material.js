import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";
import PieChart from "@/components/charts/PieChart";
import BlackSpinner from "@/components/reusableUi/BlackSpinner";
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import DatePickerComponent from "@/components/reusableUi/CustomDateRange";
import MaterialFootprintTable from "@/components/reusableUi/MaterialFootprintTable";
import ReactSelectDropDown from "@/components/reusableUi/ReactSelectDropDown";
import NoDataToShow from "@/components/reusableUi/noDataToShow";
import {
  sortedMaterialArray,
  sortedSuppliersData
} from "@/data/suppliersandcountries/data";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import { useLazyGetRawMaterialDataQuery } from "@/redux-setup/api/data";
import { getTitle } from "@/utils/functions";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Materialmap = dynamic(() => import("../components/charts/Materialmap"), {
  ssr: false
});

const rawmaterial = () => {
  const [showSection, setSection] = useState(false);
  const { theme } = useTheme();
  const businessId = useBusinessEntity();
  const [rawTrigger, { isLoading: rawDataLoader }] =
    useLazyGetRawMaterialDataQuery();
  const [startDate, setStartDate] = useState(new Date("2021-01-11"));
  const [endDate, setEndDate] = useState(new Date());
  const [fills, setFills] = useState("#047857");
  const [colorMaterialMap, setColorMaterialMap] = useState({
    extradarkcolor: "",
    darkcolor: "",
    mediumcolor: "",
    ligthcolor: "",
    extralightcolor: ""
  });
  const [totalData, setTotalData] = useState({});
  const [onChangeValue, setOnChangeValue] = useState({});
  const [fills2, setFills2] = useState({
    border: "#059669",
    rgba: "rgba(5, 150, 105, 0.1)",
    trail: "#E2E8F0",
    mapInsider: "#d9d9d9",
    text: "#1E293B"
  });
  const [supplierLoader1, setSupplierLoader1] = useState(false);
  const [supplierLoaderClicked, setSupplierLoaderClicked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [supplierRawLoader, setSupplierRawLoader] = useState(false);
  const data1 = [
    {
      id: 2,
      label: "Material Name",
      options: sortedMaterialArray,
    },
  ];
  function commonUniqueArraySplitter1(arr) {
    const uniqueArr = arr?.reduce((unique, item) => {
      const found = unique.find((obj) => obj.value === item.value);
      if (!found) {
        unique.push(item);
      }
      return unique;
    }, []);
    return uniqueArr;
  }
  const advanceData = [
    ...data1,
    {
      id: 6,
      label: "Seller",
      options: commonUniqueArraySplitter1(sortedSuppliersData),
    },
  ];
  useEffect(() => {
    switch (theme) {
      case "emerald":
        setColorMaterialMap({
          extradarkcolor: "#166534",
          darkcolor: "#047857",
          mediumcolor: "#10b981",
          ligthcolor: "#6ee7b7",
          extralightcolor: "#a7f3d0"
        });
        setFills("#047857");
        setFills2({
          border: "#059669",
          rgba: "rgba(5, 150, 105, 0.1)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B"
        });
        break;
      case "orange":
        setColorMaterialMap({
          extradarkcolor: "#D26952",
          darkcolor: "#FF8E6C",
          mediumcolor: "#FFA690",
          ligthcolor: "#FFD0C9",
          extralightcolor: "#FFE6E2"
        });
        setFills("#FF8E6C");
        setFills2({
          border: "#FF8E6C",
          rgba: "rgba(255, 142, 108, .2)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B"
        });
        break;
      case "blue":
        setColorMaterialMap({
          extradarkcolor: "#0D237A",
          darkcolor: "#1E40AF",
          mediumcolor: "#425BCA",
          ligthcolor: "#6B7ED9",
          extralightcolor: "#B0C2FF"
        });
        setFills("#1E40AF");
        setFills2({
          border: "#1E40AF",
          rgba: "rgba(48, 63, 159, .2)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B"
        });
        break;
      case "purple":
        setColorMaterialMap({
          extradarkcolor: "#6b21a8",
          darkcolor: "#7E22CE",
          mediumcolor: "#c084fc",
          ligthcolor: "#d8b4fe",
          extralightcolor: "#f3e8ff"
        });
        setFills("#7E22CE");
        setFills2({
          border: "#7E22CE",
          rgba: "rgba(126, 34, 206,.2 )",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B"
        });
        break;
      case "dark":
        setColorMaterialMap({
          darkcolor: "#047857",
          mediumcolor: "#10b981",
          ligthcolor: "#6ee7b7",
          extralightcolor: "#a7f3d0"
        });
        setFills("#047857");
        setFills2({
          trail: "#525252",
          mapInsider: "#454545",
          border: "#059669",
          rgba: "rgba(5, 150, 105, 0.1)",
          text: "white"
        });
        break;
    }
  }, [theme]);

  let keysForMaterial =
    totalData?.materialBreakdown === undefined
      ? []
      : Object?.keys(totalData?.materialBreakdown);
  let ValuesForMaterial =
    totalData?.materialBreakdown === undefined
      ? []
      : Object?.values(totalData?.materialBreakdown);

  let colorMap = {
    Cotton: "#F87171",
    Viscose: "#f472b6",
    Other: "#22d3ee",
    Polyester: "#38BDF8",
    Acrylic: "#818cf8",
    Nylon: "#C084FC",
    Wool: "#FBBF24",
    PVC: "#fb923c",
    Leather: "#34D399",
    Cashmere: "#a3e635",
    Linen: "#2dd4bf",
  }
  const data = {
    labels: keysForMaterial,
    datasets: [
      {
        data: ValuesForMaterial.map((datas) => Math.round(datas)),
        backgroundColor: colorMapped('chart'),
        borderWidth: 0,
      },
    ],
  };

  function colorMapped(value) {
    if (value == undefined) return
    let newObj = keysForMaterial.reduce((obj, it) => {
      switch (it) {
        case it:
          obj[it] = colorMap[it]
      }
      return obj
    }, {})
    let newArr = keysForMaterial.reduce((obj, it) => {
      return [...obj, colorMap[it]]
    }, [])
    if (value === 'chart') {
      return newArr
    }
    return newObj[value]
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top"
      },
      tooltip: {
        enabled: true,
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
    }
  };
  useEffect(() => {
    if (businessId === null) return;
    rawMaterialDataTriggerFunction();
  }, [businessId]);
  const rawMaterialDataTriggerFunction = () => {
    setSupplierLoader1(true);
    setSupplierRawLoader(true);
    let params = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      material: onChangeValue["Material Name"]?.join(","),
    };
    let payload1 = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      seller: onChangeValue["Seller"]?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
    };

    rawTrigger(
      !showSection ? { params, businessId } : { params: payload1, businessId }
    )
      .unwrap()
      .then((res) => {
        setSupplierRawLoader(false);
        setSupplierLoader1(false);
        setTotalData(res);
      })
      .catch((err) => {
        setSupplierRawLoader(false);
        setSupplierLoader1(false);
      }).finally(() => {
        setSupplierLoaderClicked(false)
      })
  };
  const handlechange = (e, label) => {
    let newwArr = e.reduce((acc, item) => {
      return [...acc, item.value];
    }, []);
    setOnChangeValue({ ...onChangeValue, [label]: newwArr });
  };
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle(
        "Raw Materials | Mosaica -  Business Intelligence for Corporate Responsibility"
      )}
      <div className="flex justify-center m-7 ">
        <div className=" w-full flex flex-col gap-7 max-w-[1124px] md:z-[0]">
          <div className="flex flex-col gap-5">
            <div className="!leading-none text-2xl text-card-heading inter-font w-full font-semibold">
              <h1>Raw Materials</h1>
            </div>
            <div
              className={`flex flex-col gap-7 ${!showSection ? "advancefilter" : "advancefilter1"
                } w-full pt-5 pb-3  border border-navborder bg-summary-cards rounded-lg items-center `}
            >
              <div
                className={` flex items-center md:gap-4 lg:gap-7 px-6  w-full `}
              >
                {!showSection ? (
                  <div className="grid grid-cols-3  md:gap-4 lg:gap-7 px-6  w-full ">
                    <DatePickerComponent
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      compname={"true"}
                    />
                    {data1.map((item, i) => (
                      <span key={i}>
                        <ReactSelectDropDown
                          id={i}
                          isMulti={true}
                          options={item.options}
                          placeholder={item.label}
                          changehandler={(e) => handlechange(e, item.label)}
                        />
                      </span>
                    ))}
                    <ButtonPrimary
                      extendclass={"self-end"}
                      label={"Search"}
                      disabled={rawDataLoader || supplierLoader1}
                      loader={supplierLoaderClicked}
                      handleClick={() => {
                        setSupplierLoaderClicked(true);
                        rawMaterialDataTriggerFunction();
                      }}
                      padding={"md:px-5 lg:px-12 py-4"}
                    />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-4 lg:grid-cols-3 items-center gap-7 px-6  w-full ">
                    <DatePickerComponent
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      compname={"true"}
                    />
                    {advanceData.map((item, i) => (
                      <span key={i}>
                        <ReactSelectDropDown
                          id={i}
                          isMulti={true}
                          isDisabled={item.disabled}
                          options={item.options}
                          placeholder={item.label}
                          changehandler={(e) => handlechange(e, item.label)}
                        />
                      </span>
                    ))}
                    <ButtonPrimary
                      extendclass={"self-end"}
                      label={"Search"}
                      disabled={rawDataLoader || supplierLoader1}
                      loader={supplierLoaderClicked}
                      handleClick={() => {
                        setSupplierLoaderClicked(true);
                        rawMaterialDataTriggerFunction();
                      }}
                      padding={"md:px-5 lg:px-12 py-4"}
                      loaderClasses={`w-full `}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 w-full px-6">
                <hr className="w-full border-navborder"></hr>
                <div
                  onClick={() => setSection(!showSection)}
                  className="gap-[10px] w-full max-w-[135px] min-w-[135px] cursor-pointer flex items-center text-sm !leading-none inter-font text-card-subheading"
                >
                  Advanced Filters
                  <svg
                    className={`${showSection && "rotate-180"
                      } transition-all ease-in-out duration-300`}
                    width={9}
                    height={6}
                    viewBox="0 0 9 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.50048 3.78145L7.80048 0.481445L8.74315 1.42411L4.50048 5.66678L0.257812 1.42411L1.20048 0.481445L4.50048 3.78145Z"
                      fill="#475569"
                    />
                  </svg>
                </div>
                <hr className="w-full border-navborder"></hr>
              </div>
            </div>
          </div>
          <div className=" flex lg:flex-row md:flex-col gap-7 w-full h-full lg:max-h-[1112px]">
            <div className="bg-summary-cards lg:overflow-y-auto secondry-btn-border py-5 px-6 w-full lg:max-w-[548px] lg:min-w-[548px] rounded-lg">
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-lg leading-[18px]  font-semibold text-card-heading inter-font">
                    Material Footprint
                  </h1>
                  <p className="mt-2 text-sm !leading-none inter-font text-card-subheading">
                    Weight
                  </p>
                </div>
                {rawDataLoader ? (
                  <div className="w-full h-[624px] flex flex-col justify-center items-center ">
                    <BlackSpinner width={"60px"} height={"60px"} />
                  </div>
                ) : (
                  <React.Fragment>
                    <MaterialFootprintTable
                      totalData={totalData?.materialFootPrint}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className=" w-full  space-y-7 lg:max-w-[548px] lg:min-w-[548px]">
              <div className="flex w-full gap-7 lg:max-h-[276px] ">
                <div className="bg-summary-cards  border w-full  border-navborder rounded-lg p-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium text-card-heading leading-[18px] inter-font">
                      Material Breakdown
                    </p>
                    <p className="font-normal text-card-subheading leading-none text-sm">
                      % Sourced By Weight
                    </p>
                  </div>
                  <div className="flex gap-2 p-5 ">
                    <div className="max-w-[166px]   mx-auto">
                      {totalData === undefined ||
                        keysForMaterial?.length === 0 ? (
                        <div
                          className={`w-full text-lg h-full flex  justify-center items-center`}
                        >
                          No Data To Show
                        </div>
                      ) : (
                        <PieChart  data={data} options={options} />
                      )}
                    </div>
                    <div style={{
                      display: keysForMaterial?.length === 0 && 'none'
                    }} className="grid grid-cols-4 justify-center w-full max-w-[350px] ">
                      {keysForMaterial.map((ite, idx) => {
                        return (
                          <div key={idx} className="flex max-w-[200px] w-full">
                            <div className="flex items-center w-full  text-sm text-card-subheading !leading-none font-normal  gap-1">
                              <hr
                                style={{ background: colorMapped(ite) }}
                                className={` rounded-full w-3 h-3 `}
                              ></hr>
                              {ite}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-summary-cards flex flex-col    border border-navborder rounded-lg">
                <div className=" md:w-full md:max-h-[428px]  py-5 px-6">
                  <div className="flex flex-col gap-2 mb-7">
                    <div className="flex gap-4   border-navborder cursor-pointer h-full max-h-[58px] border-b">
                      {["Seller Country", "Buyer Country"].map((item, i) => {
                        return (
                          <div
                            onClick={() => setActiveTab(i)}
                            key={i}
                            className={`${i === activeTab
                              ? "border-emerald-700 font-semibold relative   text-emerald-700 border-b-2"
                              : ""
                              } px-4 py-3 text-sm transition-all ease-in-out`}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    {totalData?.supplierCountryMap?.length === 0 ? (
                      <div
                        className={`w-full text-base p-4 h-full flex justify-center items-center`}
                      >
                        No Data To Show
                      </div>
                    ) : (
                      <>
                        {activeTab == 0 ? (
                          <div>
                            <Materialmap
                              fills={fills}
                              activeTab={activeTab}
                              colorMaterialMap={colorMaterialMap}
                              materialsMap={totalData?.supplierMap}
                              compName={"raw-material"}
                            />
                          </div>
                        ) : (
                          <div>

                            <Materialmap
                              fills={fills}
                              activeTab={activeTab}
                              materialsMap={totalData?.facilityMap}
                              colorMaterialMap={colorMaterialMap}
                              compName={"raw-material"}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-summary-cards w-full py-5 px-6 rounded-lg">
                  <div className="flex flex-col gap-2 w-full mb-5 ">
                    <p className="text-lg font-semibold h-full max-h-[18px] leading-[18px] text-card-heading inter-font">
                      Sourcing Regions
                    </p>
                    <p className="font-normal text-card-subheading !leading-none text-sm inter-font">
                      Weight (t) by Country
                    </p>
                  </div>
                  <div className="flex flex-col w-full  gap-3">
                    <p className="font-medium text-card-subheading !leading-none text-sm inter-font">
                      Factory & Supplier Purchase Order List
                    </p>
                    <div className="overflow-auto  md:h-[300px]">
                      <table
                        className={`w-full text-sm text-left text-card-heading`}
                      >
                        <thead className="text-xs font-medium  text-card-heading  bg-table-header ">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 min-w-[140px] max-w-[140px] leading-[12px]"
                            >
                              {activeTab == 0
                                ? "Seller Country"
                                : "Buyer Country"}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 max-w-[200px] leading-[12px]"
                            >
                              Weight (t)
                            </th>
                          </tr>
                        </thead>
                        {rawDataLoader ? (
                          <tbody>
                            <tr className="w-full h-[234px] " align='center'>
                              <td colSpan={3} className="w-full h-full">
                                <BlackSpinner width={"60px"} height={"60px"} />
                              </td>
                            </tr></tbody>
                        ) : (
                          totalData === undefined || (!totalData?.supplierMap?.length || !totalData?.facilityMap?.length) ? (
                            <tbody>
                              <tr className="w-full h-[234px] " align='center'>
                                <NoDataToShow rowAndCol colSpan={3} sizeText={"text-xl"} />
                              </tr></tbody>
                          ) : (<tbody>
                            {activeTab == 0
                              ? totalData?.supplierMap
                                ?.slice()
                                ?.sort((a, b) =>
                                  a?.totalWeight < b?.totalWeight ? 1 : -1
                                )
                                .map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className={`${"bg-summary-cards border-b border-navborder"
                                        } `}
                                    >
                                      <td className="px-6 py-4 min-w-[140px] max-w-[140px] leading-[14px]">
                                        {item?.seller_country
                                          ? item?.seller_country
                                          : "unknown"}
                                      </td>
                                      <td className="px-6 py-4 leading-[14px] max-w-[200px] truncate">
                                        {(item?.total_weight).toFixed(2)}
                                      </td>
                                    </tr>
                                  );
                                })
                              : totalData?.facilityMap?.map((item, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className={`${Math.round(item?.total_weight) ===
                                      0 || item?.buyer_country === null
                                      ? "hidden"
                                      : "bg-summary-cards border-b border-navborder"
                                      } `}
                                  >
                                    <td className="px-6 py-4 min-w-[140px] max-w-[140px] leading-[14px]">
                                      {item?.buyer_country}
                                    </td>
                                    <td className="px-6 py-4 leading-[14px] max-w-[200px] truncate">
                                      {Math.round(item?.total_weight)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>)
                        )}
                      </table>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default rawmaterial;
// export default withAuth(rawmaterial);
