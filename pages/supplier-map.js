import React, { useCallback, useMemo, useState } from "react";
const Header = dynamic(() => import("../components/header"), { ssr: false });
const Layout = dynamic(() => import("../components/layout"), { ssr: false });
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import NoDataToShow from "@/components/reusableUi/noDataToShow";
import { useLazyGetSupplierDetailsQuery } from "@/redux-setup/api/data";
import BlackSpinner from "@/components/reusableUi/BlackSpinner";
import ReactPaginate from "react-paginate";
import InputTag from "@/components/reusableUi/Input";
import { format } from "date-fns";
import { debounce, handleSearch } from "@/utils/helper";
import DatePickerComponent from "@/components/reusableUi/CustomDateRange";
import ReactSelectDropDown from "@/components/reusableUi/ReactSelectDropDown";
import {
  sortedCountriesData,
  sortedDeparmentsData,
  sortedMaterialArray,
  sortedSuppliersData,
} from "@/data/suppliersandcountries/data";
import withAuth from "@/components/middlewares/Auth";
import { getTitle } from "@/utils/functions";
import useBusinessEntity from "@/hooks/useBusinessEntity";
const MapChart = dynamic(() => import("../components/charts/Mapchart"), {
  ssr: false,
});
const Materialmap = dynamic(() => import("../components/charts/Materialmap"), {
  ssr: false,
});
const Suppliermap = () => {
  const [colorMaterialMap, setColorMaterialMap] = useState({
    extradarkcolor: "",
    darkcolor: "",
    mediumcolor: "",
    ligthcolor: "",
    extralightcolor: "",
  });
  const businessId = useBusinessEntity();
  const dataTab = [
    {
      id: 1,
      title: "Supplier Map",
    },
    {
      id: 2,
      title: "Materials Map",
    },
  ];
  const dataRange = [
    {
      id: 1,
      options: [
        { label: 10, value: 10 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 200, value: 200 },
      ],
    },
  ];
  const [
    supplierDataTrigger,
    { isLoading: supplierLoader, data: supplierDetails },
  ] = useLazyGetSupplierDetailsQuery();
  const [tableData1, setTableData1] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [supplierLoader2, setSupplierLoader2] = useState(false);
  const [clickedLoader, setclickedLoader] = useState(false);
  // const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [startDate, setStartDate] = useState(new Date("2021-01-11"));
  const [endDate, setEndDate] = useState(new Date());
  const [rangeState, setRange] = useState({ value: 10, label: 10 });
  const [pageValue, setPage] = useState(0);
  const [fills2, setFills2] = useState({
    border: "#059669",
    rgba: "rgba(5, 150, 105, 0.1)",
    trail: "#E2E8F0",
    mapInsider: "#d9d9d9",
    text: "#1E293B",
  });
  const [onChangeValue, setOnChangeValue] = useState({});
  let ArrayForBuyers =
    tableData1?.tableData == undefined
      ? []
      : tableData1?.tableData?.map((ite, idex) => {
        return { label: ite?.buyer_name, value: ite?.buyer_name };
      });
  const data1 = [
    {
      id: 1,
      label: "Buyer",
      options: commonUniqueArraySplitter1(ArrayForBuyers),
    },
    // {
    //   id: 1,
    //   label: "Season",
    //   options: [
    //    { label: "Autumn / Winter 21", value: "Autumn / Winter 21" },
    //     { label: "Autumn / Winter 22", value: "Autumn / Winter 22" },
    //     { label: "Spring / Summer 21", value: "Spring / Summer 21" },
    //     { label: "Spring / Summer 22", value: "Spring / Summer 22" },
    //     { label: "Spring / Summer 23", value: "Spring / Summer 23" },
    //   ],
    // },
    {
      id: 2,
      label: "Material Name",
      options: sortedMaterialArray,
    },

    // {
    //   id: 3,
    //   label: "Department",
    //   options: sortedDeparmentsData,
    // },
    // {
    //   id: 4,
    //   label: "Material Group",
    //   options: [
    //     { label: "Cellulosics", value: "Cellulosics" },
    //     { label: "Other", value: "Other" },
    //     { label: "Wool", value: "Wool" },
    //     { label: "Cotton", value: "Cotton" },
    //     { label: "Nylon", value: "Nylon" },
    //     { label: "Polyester", value: "Polyester" },
    //     { label: "Down", value: "Down" },
    //     {
    //       label: "Elastane, Spandex & Lycra",
    //       value: "Elastane, Spandex & Lycra",
    //     },
    //     { label: "Leather & Suede", value: "Leather & Suede" },
    //     { label: "Other Synthetics", value: "Other Synthetics" },
    //   ].sort((a, b) => (a.value > b.value ? 1 : -1)),
    // },
  ];
  // const data1 = [
  //   {
  //     id: 2,
  //     label: "Season",
  //     options: [
  //       { label: "Autumn / Winter 21", value: "Autumn / Winter 21" },
  //       { label: "Autumn / Winter 22", value: "Autumn / Winter 22" },
  //       { label: "Spring / Summer 21", value: "Spring / Summer 21" },
  //       { label: "Spring / Summer 22", value: "Spring / Summer 22" },
  //       { label: "Spring / Summer 23", value: "Spring / Summer 23" }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     label: "Department",
  //     options: sortedDeparmentsData
  //   },
  //   {
  //     id: 4,
  //     label: "Material Group",
  //     options: [
  //       { label: "Cellulosics", value: "Cellulosics" },
  //       { label: "Other", value: "Other" },
  //       { label: "Wool", value: "Wool" },
  //       { label: "Cotton", value: "Cotton" },
  //       { label: "Nylon", value: "Nylon" },
  //       { label: "Polyester", value: "Polyester" },
  //       { label: "Down", value: "Down" },
  //       {
  //         label: "Elastane, Spandex & Lycra",
  //         value: "Elastane, Spandex & Lycra"
  //       },
  //       { label: "Leather & Suede", value: "Leather & Suede" },
  //       { label: "Other Synthetics", value: "Other Synthetics" }
  //     ].sort((a, b) => (a.value > b.value ? 1 : -1))
  //   }
  // ];
  const [supplierLoader1, setSupplierLoader1] = useState(false);
  const data2 = [
    ...data1,
    {
      id: 6,
      label: "Seller",
      options: commonUniqueArraySplitter1(sortedSuppliersData),
    },
  ];
  // const data2 = [
  //   ...data1,
  //   {
  //     id: 7,
  //     label: "Division",
  //     options: [
  //       { value: "Menswear", label: "Menswear" },
  //       { value: "Womenswear", label: "Womenswear" }
  //     ]
  //   },
  //   {
  //     id: 8,
  //     label: "Material",
  //     options: sortedMaterialArray
  //   },
  //   {
  //     id: 6,
  //     label: "Supplier Name",
  //     options: commonUniqueArraySplitter1(sortedSuppliersData)
  //   },
  //   {
  //     id: 9,
  //     label: "Supplier Country",
  //     options: commonUniqueArraySplitter1(sortedCountriesData)
  //   }
  // ];
  const { theme } = useTheme();
  const [fills, setFills] = useState("#047857");
  const [showSection, setSection] = useState(false);
  const totalPages = !supplierDetails || !supplierDetails?.tableData.length ? 1 : Math.ceil(
    supplierDetails?.tableData.length / 10
  );
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
  useEffect(() => {
    if (businessId == null) return;
    supplierDetailsDataTriggerFunction(
      0,
      {
        value: 10,
        label: 10,
      },
      undefined
    );
  }, [businessId]);
  const supplierDetailsDataTriggerFunction = useCallback((
    pagevalues,
    limit,
    search,
    selectedCN
  ) => {
    setRange(limit);
    setPage(pagevalues);
    let offset = pagevalues * limit.value;
    let params = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      buyer: onChangeValue["Buyer"]?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      skip: offset,
      take: limit.value,
      ...(search != undefined && search && { search: search }),
    };
    let payload1 = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      seller: onChangeValue["Seller"]?.join(","),
      buyer: onChangeValue["Buyer"]?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      skip: offset,
      take: limit.value,
      ...(search != undefined && search && { search: search }),
    };
    setSupplierLoader1(true);
    setSupplierLoader2(true);
    if (!showSection) {
      supplierDataTrigger({ params, businessId })
        .unwrap()
        .then((res) => {
          setTableData1(res);
          setSupplierLoader1(false);
          setSupplierLoader2(false);

        })
        .catch((err) => {
          console.error(err);
          setSupplierLoader1(false);
          setSupplierLoader2(false);
        }).finally(() => {
          setclickedLoader(false)

        })
      return;
    } else {
      supplierDataTrigger({ params: payload1, businessId })
        .unwrap()
        .then((res) => {
          setSupplierLoader1(false);
          setSupplierLoader2(false);
          setTableData1(res);
        })
        .catch((err) => {
          console.error(err);
          setSupplierLoader1(false);
          setSupplierLoader2(false);
        }).finally(() => {
          setclickedLoader(false)

        })
      return;
    }
  }, [businessId, onChangeValue,])
  useEffect(() => {
    switch (theme) {
      case "emerald":
        setColorMaterialMap({
          extradarkcolor: "#166534",
          darkcolor: "#047857",
          mediumcolor: "#10b981",
          ligthcolor: "#6ee7b7",
          extralightcolor: "#a7f3d0",
        });
        setFills("#047857");
        setFills2({
          border: "#059669",
          rgba: "rgba(5, 150, 105, 0.1)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B",
        });
        break;
      case "orange":
        setColorMaterialMap({
          extradarkcolor: "#D26952",
          darkcolor: "#FF8E6C",
          mediumcolor: "#FFA690",
          ligthcolor: "#FFD0C9",
          extralightcolor: "#FFE6E2",
        });
        setFills("#FF8E6C");
        setFills2({
          border: "#FF8E6C",
          rgba: "rgba(255, 142, 108, .2)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B",
        });
        break;
      case "blue":
        setColorMaterialMap({
          extradarkcolor: "#0D237A",
          darkcolor: "#1E40AF",
          mediumcolor: "#425BCA",
          ligthcolor: "#6B7ED9",
          extralightcolor: "#B0C2FF",
        });
        setFills("#1E40AF");
        setFills2({
          border: "#1E40AF",
          rgba: "rgba(48, 63, 159, .2)",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B",
        });
        break;
      case "purple":
        setColorMaterialMap({
          extradarkcolor: "#6b21a8",
          darkcolor: "#7E22CE",
          mediumcolor: "#c084fc",
          ligthcolor: "#d8b4fe",
          extralightcolor: "#f3e8ff",
        });
        setFills("#7E22CE");
        setFills2({
          border: "#7E22CE",
          rgba: "rgba(126, 34, 206,.2 )",
          trail: "#E2E8F0",
          mapInsider: "#d9d9d9",
          text: "#1E293B",
        });
        break;
      case "dark":
        setColorMaterialMap({
          darkcolor: "#047857",
          mediumcolor: "#10b981",
          ligthcolor: "#6ee7b7",
          extralightcolor: "#a7f3d0",
        });
        setFills("#047857");
        setFills2({
          trail: "#525252",
          mapInsider: "#454545",
          border: "#059669",
          rgba: "rgba(5, 150, 105, 0.1)",
          text: "white",
        });
        break;
    }
  }, [theme]);

  const handlechange = (e, label) => {
    let newwArr = e.reduce((acc, item) => {
      return [...acc, item.value];
    }, []);
    setOnChangeValue({ ...onChangeValue, [label]: newwArr });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handleMoveToFirstPage = () => {
    // Move back to the first page
    setCurrentPage(0);
    supplierDetailsDataTriggerFunction(0, rangeState, undefined);
  };

  const handleMoveToEndPage = () => {
    // Move to the last page
    setCurrentPage(totalPages - 1);
    supplierDetailsDataTriggerFunction(totalPages - 1, rangeState, undefined);
  };
  function dateFormat(datee) {
    const dateString = datee.toString();
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short", // Using "short" to get abbreviated month name
      year: "numeric",
    };

    const dateUpdated = date.toLocaleDateString("en-US", options);
    return dateUpdated;
  }
  const debouncedSearchCall = debounce(
    (pageValue, rangeState, value) =>
      supplierDetailsDataTriggerFunction(pageValue, rangeState, value),
    600 // 300ms delay
  );
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle(
        "Supplier Map | Mosaica -  Business Intelligence for Corporate Responsibility"
      )}
      <div className=" m-7 flex justify-center ">
        <div className=" w-full flex flex-col gap-7 z-[0] max-w-[1124px]">
          <div className="flex flex-col gap-5">
            <div className="!leading-none text-2xl text-card-heading inter-font w-full font-semibold">
              <h1>Supply Chain Map</h1>
            </div>
            <div
              className={`flex flex-col gap-7 ${!showSection ? "advancefilter" : "advancefilter1"
                } w-full pt-5 pb-3  border border-navborder bg-summary-cards rounded-lg items-center `}
            >
              {!showSection ? (
                <div className="grid grid-cols-3  md:gap-4 lg:gap-7 px-6  w-full ">
                  <DatePickerComponent
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    compname={"true"}
                    setEndDate={setEndDate}
                  />
                  {data1.map((item, i) => (
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
                    disabled={supplierLoader}
                    loader={clickedLoader}

                    handleClick={() => {
                      setclickedLoader(true)
                      supplierDetailsDataTriggerFunction(
                        pageValue,
                        rangeState,
                        undefined
                      );
                    }}
                    padding={"px-12 py-4"}
                  // loaderClasses={"lg:min-w-[149px] lg:max-w-[149px] w-full"}
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
                  {data2.map((item, i) => (
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
                    disabled={supplierLoader}
                    loader={clickedLoader}
                    handleClick={() => {
                      setclickedLoader(true)
                      supplierDetailsDataTriggerFunction(
                        pageValue,
                        rangeState,
                        undefined
                      );
                    }}
                    padding={"md:px-5 lg:px-12 py-4"}
                  // loaderClasses={`w-full lg:min-w-[149px] lg:max-w-[149px] md:max-w-[93px] md:min-w-[93px]`}
                  />
                </div>
              )}
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

          <>
            <div className="w-full bg-summary-cards rounded-lg ">
              <div className="flex gap-4 border-navborder cursor-pointer h-full max-h-[58px] border-b">
                {dataTab.map((item, i) => {
                  return (
                    <div
                      onClick={() => setActiveTab(i)}
                      key={i}
                      className={`${i === activeTab
                        ? "border-emerald-700 font-semibold relative  text-emerald-700 border-b-2"
                        : ""
                        } px-6 py-5  transition-all ease-in-out`}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
              <div>
                {activeTab == 0 ? (
                  <div>
                    <MapChart
                      mapInsider={fills2.mapInsider}
                      tableData1={tableData1}
                      compName={"suppliermap"}
                      theme={fills}
                      factoryMap={tableData1?.supplierMap}
                      rangeState={rangeState}
                      supplierDetailsDataTriggerFunction={
                        supplierDetailsDataTriggerFunction
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <Materialmap
                      theme={theme}
                      mapInsider={fills2.mapInsider}
                      factoryMap={tableData1?.factoryMap}
                      compName={"suppliermap"}
                      colorMaterialMap={colorMaterialMap}
                      rangeState={rangeState}
                      supplierDetailsDataTriggerFunction={
                        supplierDetailsDataTriggerFunction
                      }
                      materialsMap={tableData1?.materialMap}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="bg-summary-cards border w-full border-navborder rounded-lg py-5 pl-6 pr-2">
                <p className="my-5 text-lg font-semibold h-full w-full max-w-[350px] max-h-[18px] leading-[18px] text-card-heading inter-font">
                  Buyer & Seller Purchase Order List
                </p>
                <div className="flex flex-row justify-between items-center w-full ">
                  {/* <div className="flex items-center   mr-4 gap-2">
                    <InputTag
                      placeholder={"Search"}
                      changeHandler={(e) =>
                        handleSearch(e, supplierDetails, setTableData1)
                      }
                    />
                  </div> */}
                  <div className=" flex xl:flex-row flex-col w-full justify-between gap-4 text-sm lg:max-w-full md:max-w-[720px] items-center">
                    <div className="w-full  xl:pr-0 pr-3">
                      <InputTag
                        placeholder={"Search"}
                        changeHandler={
                          (e) =>
                            debouncedSearchCall(
                              pageValue,
                              rangeState,
                              e.target.value
                            )
                          // handleSearch(e, supplierDetails, setTableData1)
                        }
                      />
                    </div>
                    <div className="main_pagination xl:min-w-[626px] xl:max-w-[626px] w-full flex justify-center  items-center  ">
                      <svg
                        onClick={handleMoveToFirstPage}
                        className="rotate-180 cursor-pointer"
                        width={20}
                        height={20}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5992 35.75L11.4492 33.6L21.0492 24L11.4492 14.4L13.5992 12.25L25.3492 24L13.5992 35.75ZM32.9992 36V12H35.9992V36H32.9992Z"
                          fill="black"
                        />
                      </svg>
                      <ReactPaginate
                        previousLabel={
                          <svg
                            className="text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="12"
                            viewBox="0 0 9 16"
                            fill="none"
                          >
                            <path
                              d="M7.66669 15.0001L1.00002 8.33339L7.66669 1.66673"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        nextLabel={
                          <svg
                            className="text-gray-600 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="12"
                            viewBox="0 0 9 16"
                            fill="none"
                          >
                            <path
                              d="M1.00073 0.999878L7.6674 7.66654L1.00073 14.3332"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        breakLabel={". . ."}
                        breakClassName={
                          "w-10 cursor-pointer text-sm h-10 p-1  flex items-center justify-center"
                        }
                        breakLinkClassName={
                          " cursor-pointer text-sm font-bold leading-tight text-black text-center"
                        }
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={4}
                        onPageChange={(e) =>
                          supplierDetailsDataTriggerFunction(
                            e.selected,
                            rangeState,
                            undefined
                          )
                        }
                        pageLinkClassName={
                          " focus:outline-none  w-5 cursor-pointer text-sm w-8 h-5 h-10 bg-transparent text-gray-600 dark:text-card-subheading dark:hover:text-black hover:text-gray-500 flex items-center justify-center"
                        }
                        containerClassName={
                          "flex overflow-x-auto cursor-pointer items-center"
                        }
                        subContainerClassName={
                          "overflow-x-auto container column"
                        }
                        activeLinkClassName={
                          "bg-black cursor-pointer  text-sm font-bold text-gray-300 dark:text-black text-center"
                        }
                      />
                      <svg
                        onClick={handleMoveToEndPage}
                        className="cursor-pointer"
                        width={20}
                        height={20}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5992 35.75L11.4492 33.6L21.0492 24L11.4492 14.4L13.5992 12.25L25.3492 24L13.5992 35.75ZM32.9992 36V12H35.9992V36H32.9992Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div
                      className={`flex items-center justify-between  xl:max-w-[650px] w-full pr-4`}
                    >
                      <div className="flex w-full xl:max-w-[200px] items-center gap-2  ">
                        <p className="text-card-heading text-xs font-semibold">
                          Rows per page
                        </p>
                        {dataRange?.map((item, i) => (
                          <div
                            key={i}
                            className="w-full h-full max-w-[100px] max-h-[40px]"
                          >
                            <ReactSelectDropDown
                              options={item.options}
                              placeholder={item.label}
                              changehandler={(e) => {
                                supplierDetailsDataTriggerFunction(
                                  0,
                                  e,
                                  undefined
                                );
                              }}
                              isMulti={false}
                              defaultValue={{ value: 10, label: 10 }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col max-h-[612px] overflow-y-auto w-full  gap-3 mt-6">
                  {supplierLoader2 || supplierLoader ? (
                    <div className="w-full h-[502px] flex flex-col justify-center items-center ">
                      <BlackSpinner width={"60px"} height={"60px"} />
                    </div>
                  ) : (
                    <table className="w-full text-sm text-left text-card-heading ">
                      <thead className="text-xs font-medium  text-card-heading  bg-table-header ">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-[18px] leading-[12px] min-w-[140px]"
                          >
                            Identifier
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-[18px] leading-[12px]"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-[18px] leading-[12px]"
                          >
                            Seller
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-[18px] leading-[12px]"
                          >
                            Buyer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-[18px] min-w-[160px] leading-[12px]"
                          >
                            Buyer Country
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-[18px] leading-[12px]"
                          >
                            Seller Country
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-[18px] leading-[12px] max-w-[120px]"
                          >
                            Units
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData1?.tableData?.length ? (
                          tableData1?.tableData?.map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="bg-summary-cards  border-b border-navborder text-card-subheading"
                              >
                                <td className="px-6 py-4 text-sm leading-[14px] ">
                                  {item?.identifier ? item.identifier : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm leading-[14px] whitespace-nowrap">
                                  {item?.transaction_date
                                    ? dateFormat(item?.transaction_date)
                                    : "-"}
                                </td>
                                <td className="px-6 py-4 truncate text-sm leading-[14px] break-words max-w-[180px]">
                                  {item?.seller_name
                                    ? item?.seller_name
                                    : "-"}
                                </td>
                                <td className="px-6 truncate py-4 text-sm leading-[14px] max-w-[180px]">
                                  {item?.buyer_name ? item?.buyer_name : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm leading-[14px] break-words ">
                                  {item.seller_country
                                    ? item.seller_country
                                    : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm leading-[14px] break-words ">
                                  {item.buyer_country
                                    ? item.buyer_country
                                    : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm leading-[14px] break-words ">
                                  {item.units ? item.units : "-"}
                                </td>
                                {/* <td className="px-6 py-4 text-sm  leading-[14px] ">
                                    {`${item?.units}`.slice(0, 2) +
                                      "," +
                                      `${item?.units}`.slice(
                                        2,
                                        `${item?.units}`.length
                                      )}
                                  </td> */}
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="w-full h-full ">
                            <NoDataToShow
                              rowAndCol={true}
                              colSpan={9}
                              sizeText={"py-[254px] text-xl text-center"}
                            />
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Suppliermap);
