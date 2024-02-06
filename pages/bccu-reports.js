import PieChart from "@/components/charts/PieChart";
import DeleteDocument from "@/components/modals/DeleteDocument";
import SwapDocument from "@/components/modals/SwapDocument";
import Viewall from "@/components/modals/Viewall";
import BlackSpinner from "@/components/reusableUi/BlackSpinner";
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import DatePickerComponent from "@/components/reusableUi/CustomDateRange";
import InputTag from "@/components/reusableUi/Input";
import ReactSelectDropDown from "@/components/reusableUi/ReactSelectDropDown";
import NoDataToShow from "@/components/reusableUi/noDataToShow";
import {
  sortedCountriesData,
  sortedDeparmentsData,
  sortedMaterialArray,
  sortedSuppliersData,
} from "@/data/suppliersandcountries/data";
import { tableArr } from "@/data/tabledatascopecert";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import { useLazyGetBccusRecievedQuery } from "@/redux-setup/api/data";
import { getTitle } from "@/utils/functions";
import { debounce } from "@/utils/helper";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
const Materialmap = dynamic(() => import("../components/charts/Materialmap"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/header"), { ssr: false });
const Layout = dynamic(() => import("../components/layout"), { ssr: false });

const Dotsmap = dynamic(() => import("../components/charts/Dotsmap"), {
  ssr: false,
});

const Scopecert = () => {
  const [showSection, setSection] = useState(false);
  const [loaderTable, setLoaderTable] = useState(false);
  // const [facilityTable, setFacilityTable] = useState([]);
  // const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [startDate, setStartDate] = useState(new Date("2021-01-11"));
  const [endDate, setEndDate] = useState(new Date());
  const [colorMaterialMap, setColorMaterialMap] = useState({
    extradarkcolor: "",
    darkcolor: "",
    mediumcolor: "",
    ligthcolor: "",
    extralightcolor: "",
  });
  const [fills2, setFills2] = useState({
    border: "#059669",
    rgba: "rgba(5, 150, 105, 0.1)",
    trail: "#E2E8F0",
    mapInsider: "#d9d9d9",
    text: "#1E293B",
  });
  const [fills, setFills] = useState("#047857");
  ``;
  const [supplierLoader1, setSupplierLoader1] = useState(false);
  const [supplierLoader2, setSupplierLoader2] = useState(false);
  const [rangeState, setRange] = useState({ value: 10, label: 10 });
  const [pageValue, setPage] = useState(0);
  const [onChangeValue, setOnChangeValue] = useState({});
  const [BccuTriger, { data: bccusData, isLoading: bccuLoad }] = useLazyGetBccusRecievedQuery();

  const businessId = useBusinessEntity();
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
  const { push } = useRouter()
  // const basicFilters = [
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
  //   }
  // ];
  let ArrayForSeller =
    bccusData?.transactionsData == undefined
      ? []
      : bccusData?.transactionsData?.map((ite, idex) => {
        return { label: ite?.seller_name, value: ite?.seller_name };
      });
  const basicFilters = [
    {
      id: 1,
      label: "Seller",
      options: commonUniqueArraySplitter1(ArrayForSeller),
    },
    {
      id: 2,
      label: "Material Name",
      options: sortedMaterialArray,
    },
  ];
  const advanceFilters = [
    ...basicFilters,
    {
      id: 6,
      label: "Seller",
      options: commonUniqueArraySplitter1(sortedSuppliersData),
    },
    {
      id: 44,
      label: "Status",
      options: [
        {
          value: "Fully Received",
          label: "Allocated to PO",
        },
        // {
        //   label: "urgentAction",
        //   value: "urgentAction",
        // },
        {
          label: "Unallocated",
          value: "Awaiting Evidence",
        },
        // {
        //   label: "bccUsRemaining",
        //   value: "bccUsRemaining",
        // },
        {
          value: "Partially Received",
          label: "Review PO Allocation",
        },
      ],
    },
  ];
  // const advanceFilters = [
  //   ...basicFilters,
  //   {
  //     id: 7,
  //     label: "Division",
  //     options: [
  //       { value: "Menswear", label: "Menswear" },
  //       { value: "Womenswear", label: "Womenswear" }
  //     ]
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
  //   },
  //   {
  //     id: 44,
  //     label: "Status",
  //     options: [
  //       {
  //         label: "Allocated to PO",
  //         value: "Allocated to PO"
  //       },
  //       {
  //         label: "Unallocated",
  //         value: "Unallocated"
  //       },
  //       {
  //         label: "Review PO Allocation",
  //         value: "Review PO Allocation"
  //       }
  //     ]
  //   }
  // ];

  const { theme } = useTheme();
  const [modal, setModal] = useState(false);

  //BCCUs Pi chart data
  const modifiedDataPercentage = bccusData?.transactionAllocation?.map(
    (item) => {
      for (const key in item) {
        return Math?.round(item[key]);
      }
    }
  );
  const modifiedDataLabel = bccusData?.transactionAllocation?.map((item) => {
    for (const key in item) {
      return key;
    }
  });

  const data1 = {
    labels: ["Allocated to PO", "Unallocated", "Review PO Allocation"],
    datasets: [
      {
        data:
          bccusData?.percentages === undefined
            ? []
            : Object?.values(bccusData?.percentages),
        // backgroundColor: modifiedDataLabel?.map((it) =>
        //   it === "Allocated to PO"
        //     ? "#34D399"
        //     : it === "Unallocated"
        //       ? "#F87171"
        //       : "#FBBF24"
        // ),
        backgroundColor: [`#34D399`, "#F87171", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };
  const [modaldelete, setModaldelete] = useState({
    obj: {},
    state: false,
  });
  const [modalSwap, setModalSwap] = useState({
    obj: {},
    state: false,
  });
  let cards = [
    {
      head: "BCCUs Received",
      perc: `${bccusData?.percentages
        ? Math?.round(bccusData?.percentages?.fullyReceived) + "%"
        : 0 + "%"
        }`,
      foot: "Vs expired total",
    },
    {
      head: "% Verified Better Cotton",
      perc: `${bccusData?.percentages
        ? Math?.round(bccusData?.percentages?.awaitingEvidence) + "%"
        : 0
        }`,
      foot: "% of total cotton consumptions",
    },
    {
      head: "Urgent Action",
      perc: `${bccusData?.urgentAction
        ? Math?.round(bccusData?.urgentAction) + "%"
        : 0 + "%"
        }`,
      foot: "With zero BCCUs sent",
    },
    {
      head: "BCCUs Remaining",
      perc: `${bccusData?.bccUsRemaining
        ? Math?.round(bccusData?.bccUsRemaining)
        : 0 + "%"
        }`,
      foot: "To reach 80% Target",
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

  useEffect(() => {
    if (businessId === null) return;
    bccuTrigerParams(0, {
      value: 10,
      label: 10,
    });
    // bccuTrigerParams();
  }, [businessId]);

  const totalPages = !bccusData || !bccusData?.totalCount ? 1 : Math.ceil(bccusData?.totalCount / rangeState?.value);

  async function bccuTrigerParams(pagevalues, limit, e) {
    let search = e?.target.value;
    setRange(limit);
    setPage(pagevalues);
    setSupplierLoader1(true);
    setLoaderTable(true);
    let offset = pagevalues * limit?.value;
    // let params = {
    //   ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
    //   ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
    //   season: onChangeValue?.Season?.join("|"),
    //   department: onChangeValue?.Department?.join("|"),
    //   materialGroup: onChangeValue["Material Group"]?.join("|"),
    //   search: e?.target?.value,
    //   status: e?.label,
    //   skip: offset,
    //   take: limit?.value
    // };
    // let payload1 = {
    //   ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
    //   ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
    //   season: onChangeValue?.Season?.join("|"),
    //   supplierCountry: onChangeValue["Supplier Country"]?.join("|"),
    //   supplierName: onChangeValue["Supplier Name"]?.join("|"),
    //   materialGroup: onChangeValue["Material Group"]?.join("|"),
    //   department: onChangeValue?.Department?.join("|"),
    //   status: onChangeValue['Status']?.join("|"),
    //   division: onChangeValue?.Division?.join("|"),
    //   search: e?.target?.value,
    //   skip: offset,
    //   take: limit?.value
    // };
    let params = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      buyer: onChangeValue["Buyer"]?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      seller: onChangeValue["Seller"]?.join(","),

      // season: onChangeValue?.Season?.join("|"),
      // department: onChangeValue?.Department?.join("|"),
      // materialGroup: onChangeValue["Material Group"]?.join("|"),
      skip: offset,
      take: limit.value,
      // ...(onChangeValue["Status"] && onChangeValue["Status"].length > 0
      //   ? onChangeValue["Status"] && { status: onChangeValue["Status"] }
      //   : ""),
      // ...(statusFilter != undefined &&
      //   statusFilter && { status: statusFilter }),
      ...((search != undefined || search !== "") && { search: search }),
    };
    let payload1 = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      // season: onChangeValue?.Season?.join("|"),
      // supplierCountry: onChangeValue["Supplier Country"]?.join("|"),
      // supplierName: onChangeValue["Supplier Name"]?.join("|"),
      // materialGroup: onChangeValue["Material Group"]?.join("|"),
      seller: onChangeValue["Seller"]?.join(","),
      buyer: onChangeValue["Buyer"]?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      // seller: onChangeValue["Seller"]?.join(","),
      // department: onChangeValue?.Department?.join("|"),
      // division: onChangeValue?.Division?.join("|"),
      ...(onChangeValue["Status"] && onChangeValue["Status"].length > 0
        ? onChangeValue["Status"] && {
          status: onChangeValue["Status"]?.join("|"),
        }
        : ""),
      // ...(statusFilter != undefined &&
      //   statusFilter && { status: statusFilter }),
      skip: offset,
      take: limit.value,
      ...((search != undefined || search !== "") && { search: search }),
    };
    setSupplierLoader2(true);
    try {
      await BccuTriger(
        !showSection ? { params, businessId } : { params: payload1, businessId }
      );
    } catch (error) {
      console.log("error in  343", error);
    } finally {
      setSupplierLoader2(false);
    }
  }

  const dataRange = [
    {
      id: 1,
      // label: "Select range",
      options: [
        { label: 10, value: 10 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 200, value: 200 },
      ],
    },
  ];
  const [showTableDetails, setShowTableDetails] = useState(
    Array(tableArr.length).fill(false)
  );
  const [tableDetails, setTableDetails] = useState(
    Array(tableArr.length).fill(false)
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        // footerFont: {
        //   size: 20// there is no footer by default
        // },
        enabled: true,
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const label = data1.labels[dataIndex];
            const percentage = data1.datasets[0].data[dataIndex];
            const percentageString = percentage + "%";
            return `Percentage: ${percentageString}`;
          },
        },
      },
    },
  };
  const [currentPage, setCurrentPage] = useState(0);

  function svgActions(svgName, item) {
    if (svgName.includes("del")) {
      setModaldelete((pre) => ({ obj: item, state: true }));
    }
    if (svgName.includes("swap")) {
      setModalSwap((pre) => ({ obj: item, state: true }));
    }
  }
  const handlechange = (e, label) => {
    let newwArr = e.reduce((acc, item) => {
      return [...acc, item.value];
    }, []);
    setOnChangeValue({ ...onChangeValue, [label]: newwArr });
  };
  const handleMoveToFirstPage = () => {
    // Move back to the first page
    setCurrentPage(0);
    bccuTrigerParams(0, rangeState);
  };

  const handleMoveToEndPage = () => {
    // Move to the last page
    setCurrentPage(totalPages - 1);
    bccuTrigerParams(totalPages - 1, rangeState);
  };
  const bccuTableData = [
    {
      id: 1,
      transectionid: "123456789",
      declarationdate: "2021-08-01",
      bccusSent: "100",
      sellerName: "RutherfordGroup",
      typeofProduct: "Cotton",
      fabricCategory: "Woven",
      allocationStatus: "Allocated to PO",
    },
    {
      id: 2,
      transectionid: "123456789",
      declarationdate: "2021-08-01",
      bccusSent: "100",
      sellerName: "RutherfordGroup",
      typeofProduct: "Cotton",
      fabricCategory: "Woven",
      allocationStatus: "Review PO Allocation",
    },
    {
      id: 3,
      transectionid: "123456789",
      declarationdate: "2021-08-01",
      bccusSent: "100",
      sellerName: "RutherfordGroup",
      typeofProduct: "Cotton",
      fabricCategory: "Woven",
      allocationStatus: "UnAllocated",
    },
  ];
  //Date formater
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
    bccuTrigerParams(pageValue, rangeState, value),
    600 // 300ms delay
  );
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle(
        "BCCU Reports | Mosaica -  Business Intelligence for Corporate Responsibility"
      )}
      <div className="flex justify-center m-7 ">
        <div className=" w-full flex flex-col gap-7 max-w-[1124px] z-[0]">
          <div className="flex flex-col gap-5">
            <div className="!leading-none text-2xl text-card-heading inter-font w-full font-semibold space-y-2">
              <p className="!leading-none text-xs text-card-subheading font-normal inter-font">
                BCCU Reports
              </p>
              <h1>Better Cotton Reconciliation Report</h1>
            </div>
            <div
              className={`flex flex-col gap-7 ${!showSection ? "advancefilter" : "advancefilter1"
                } w-full pt-5 pb-3  border border-navborder bg-summary-cards rounded-lg items-center `}
            >
              {!showSection ? (
                <div className="grid grid-cols-3 gap-4 lg:gap-7 px-6 w-full ">
                  <DatePickerComponent
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    compname={"true"}
                  />
                  {basicFilters.map((item, i) => (
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
                    loader={supplierLoader2}
                    handleClick={() => {
                      bccuTrigerParams(pageValue, rangeState);
                    }}
                    // handleClick={() => {
                    //     bccuTrigerParams();
                    // }}
                    padding={"px-12 py-4"}
                  // loaderClasses={"lg:min-w-[149px] lg:max-w-[149px] w-full"}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 lg:grid-cols-3 items-center gap-7 px-6  w-full ">
                  <DatePickerComponent
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    compname={"true"}
                  />
                  {advanceFilters.map((item, i) => (
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

                  {/* <div className=" w-full flex justify-between items-center">

                    <div className="w-full">
                    <ReactSelectDropDown
                      options={statusArray}
                      placeholder={"Status"}
                      changehandler={(e) => {
                        bccuTrigerParams(pageValue, rangeState, e);
                      }}
                      isMulti={false}
                      // defaultValue={{ value: 10, label: 10 }}
                    />
                  </div>
                  </div> */}
                  <ButtonPrimary
                    extendclass={"self-end"}
                    label={"Search"}
                    loader={supplierLoader2}
                    // handleClick={() => {
                    //     bccuTrigerParams();
                    // }}
                    handleClick={() => {
                      bccuTrigerParams(pageValue, rangeState);
                    }}
                    padding={"md:px-5 lg:px-12 py-4"}
                    loaderClasses={`w-full `}
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

          <div className=" flex flex-col gap-7 w-full ">
            <div className="bg-summary-cards w-full flex justify-center">
              {cards.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`w-full  pt-5 px-5 pb-7 flex   flex-col gap-3 ${i >= 1 ? "border-navborder border-l" : ""
                      }`}
                  >
                    <p className="md:text-[10px] text-[10px] lg:text-lg font-semibold  leading-[18px] text-card-heading inter-font">
                      {item.head}
                    </p>
                    <p className="md:text-2xl text-2xl lg:text-[32px] font-semibold  !leading-none text-selected-text inter-font">
                      {i === 3
                        ? parseInt(item.perc).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })
                        : item.perc}
                    </p>
                    <p className="md:text-[10px] text-[10px] lg:text-xs !leading-none w-full max-w-[230px] text-card-subheading inter-font">
                      {item.foot}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="lg:max-h-[442px] flex lg:flex-row flex-col gap-7">
              <div className=" w-full lg:max-w-[548px] flex flex-col gap-7">
                <div className="bg-summary-cards  secondry-btn-border items-center w-full h-full px-6 py-5 flex justify-between gap-4 rounded-lg">
                  <div className="flex flex-col gap-5 w-full ">
                    <div className="flex flex-col gap-4">
                      <p className="text-lg font-semibold leading-[18px] inter-font text-card-heading">
                        BCP Transaction Allocation
                      </p>
                      <p className="text-sm font-normal eading-[18px] linter-font text-card-heading">
                        % BCCUs by Allocation Status
                      </p>
                    </div>

                    {/* <div className="w-[280px] h-[280px] mx-auto ">
                                            <PieChart data={data1} options={options} />
                                        </div>

                                        <div className="flex flex-col justify-center w-full items-center gap-2">
                                            {<div className="flex gap-2 items-center w-1/2 ">
                                                <p className={`rounded-[50px] bg-[#34D399] h-3 w-3`}></p>
                                                <p className="text-xs !leading-none inter-font">
                                                    Allocated to PO
                                                </p>
                                            </div>}
                                            <div className="flex gap-2 items-center  w-1/2 ">
                                                <p className="rounded-[50px] bg-[#FBBF24] h-3 w-3"></p>
                                                <p className="text-xs !leading-none inter-font">
                                                    Review PO Allocation
                                                </p>
                                            </div>

                                            <div className="flex gap-2 items-center w-1/2 ">
                                                <p className="rounded-[50px] bg-[#F87171] h-3 w-3"></p>
                                                <p className="text-xs !leading-none inter-font">
                                                    UnAllocated
                                                </p>
                                            </div>
                                        </div> */}

                    <div className="bg-summary-cards  secondry-btn-border items-center w-full h-full px-6 py-5 flex justify-between gap-4 rounded-lg">
                      {bccusData === undefined ? (
                        <div className="flex flex-col gap-5 w-full md:max-w-[350px] lg:max-w-[304px]">
                          <div className="flex flex-col">
                            <div className="flex items-center flex-wrap gap-y-7  gap-x-[80px]">
                              <PerViewer value={0} color={"text-emerald-400"}>
                                Allocated to PO
                              </PerViewer>
                              <PerViewer value={0} color={"text-red-400"}>
                                Unallocated
                              </PerViewer>
                              <PerViewer value={0} color={"text-amber-400"}>
                                Review PO Allocation
                              </PerViewer>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <div className="flex flex-col gap-5 w-full md:max-w-[350px] lg:max-w-[304px]">
                            {/* <p className="text-lg font-semibold leading-[18px] inter-font text-card-heading">
                                                    Facilities by Certification Status
                                                </p> */}
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap gap-y-7  gap-x-[80px]">
                                <div className="flex flex-col gap-1">
                                  <h1
                                    className={`text-[20px]  !leading-none text-emerald-400 font-semibold inter-font `}
                                  >
                                    {Math.round(
                                      bccusData?.percentages?.fullyReceived
                                    )}
                                    %
                                  </h1>
                                  <p className="text-xs !leading-none inter-font text-card-subheading">
                                    Allocated PO
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <h1
                                    className={`text-[20px]  !leading-none text-red-400 font-semibold inter-font `}
                                  >
                                    {Math.round(
                                      bccusData?.percentages?.awaitingEvidence
                                    )}
                                    %
                                  </h1>
                                  <p className="text-xs !leading-none inter-font text-card-subheading">
                                    Unallocated
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <h1
                                    className={`text-[20px]  !leading-none text-amber-400 font-semibold inter-font `}
                                  >
                                    {Math.round(
                                      bccusData?.percentages?.urgentAction
                                    )}
                                    %
                                  </h1>
                                  <p className="text-xs !leading-none inter-font text-card-subheading">
                                    Review PO Allocation
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="w-[200px] h-[200px] mx-auto ">
                        <PieChart data={data1} options={options} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-summary-cards secondry-btn-border border w-full lg:max-w-[548px] border-[#F1F5F9] rounded-lg py-5 px-6">
                <div className="flex flex-col gap-2 mb-7">
                  <p className="text-lg font-semibold text-card-heading inter-font">
                    Better Cotton Sourcing Regions
                  </p>
                </div>
                <Materialmap
                  fills={fills}
                  colorMaterialMap={colorMaterialMap}
                  // mapInsider={fills2.mapInsider}
                  materialsMap={bccusData?.countryData}
                  compName={"BCCUs"}
                // materialsMap={tableData1?.materialsMap}
                />
              </div>
            </div>
            <div className="bg-summary-cards  secondry-btn-border py-5 px-6 space-y-5 overflow-x-auto rounded-lg ">
              <div className="flex items-center justify-between">
                <div className=" text-lg font-semibold h-full   max-h-[18px] leading-[18px] text-card-heading inter-font">
                  BCP Transactions
                </div>
                <ButtonPrimary handleClick={() => push('/better-cotton')} label='Import Data' className="text-lg font-semibold h-full   max-h-[18px] leading-[18px] text-card-heading inter-font" />
              </div>
              <div className={"flex flex-col gap-5 items-start"}>
                <div className=" flex xl:flex-row flex-col w-full justify-between gap-4 text-sm lg:max-w-full md:max-w-full items-center">
                  <InputTag
                    placeholder={"Search"}
                    width={"w-full"}
                    PY={"py-3"}
                    changeHandler={(e) => {
                      bccuTrigerParams(pageValue, rangeState, e);
                    }}
                  />

                  <div
                    className={`flex items-center justify-between w-full pr-4`}
                  >
                    <div className="main_pagination xl:min-w-[426px] xl:max-w-[426px] w-full flex justify-end items-center  ">
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
                          "w-8 cursor-pointer text-sm h-10 p-1  flex items-center justify-center"
                        }
                        breakLinkClassName={
                          " cursor-pointer text-sm font-bold leading-tight text-black text-center"
                        }
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={4}
                        onPageChange={(e) =>
                          bccuTrigerParams(e.selected, rangeState)
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
                              bccuTrigerParams(0, e);
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

              <div className=" overflow-auto max-h-[612px]">
                {bccuLoad ? (
                  <div className="w-full h-[612px] flex flex-col justify-center items-center ">
                    <BlackSpinner width={"60px"} height={"60px"} />
                  </div>
                ) : (
                  <table className="w-full  text-sm text-left text-card-heading">
                    <thead className="  text-card-heading  bg-table-header">
                      <tr>
                        <th className="px-4  py-[18px] leading-3  text-xs font-medium max-w-[140px]">
                          Transaction ID
                        </th>
                        <th className="px-4   py-[18px] leading-3 text-xs font-medium whitespace-nowrap">
                          Declaration Date
                        </th>
                        <th className="px-4  py-[18px] leading-3 text-xs font-medium  whitespace-nowrap">
                          BCCUs Sent
                        </th>
                        <th className="px-4 py-[18px] leading-3 whitespace-nowrap  text-xs font-medium">
                          Seller Name
                        </th>
                        <th className="px-4 py-[18px] whitespace-nowrap leading-3 text-xs  font-medium">
                          Fabric Category
                        </th>

                        <th className="px-4  whitespace-nowrap py-[18px] leading-3 text-xs font-medium">
                          Allocation Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bccusData?.transactionsData?.length > 0 ? (
                        bccusData?.transactionsData?.map((item, i) => {
                          return (
                            <tr
                              key={i}
                              className={`bg-summary-cards ${i === bccusData?.identifier?.length - 1
                                ? ""
                                : "border-b border-navborder"
                                }`}
                            >
                              <td
                                colSpan={1}
                                className="p-4 hover:underline  cursor-pointer"
                              >
                                {item?.identifier ? item?.identifier : "-"}
                              </td>
                              <td colSpan={1} className="p-4 whitespace-nowrap">
                                {item.transaction_date
                                  ? dateFormat(new Date(item.transaction_date))
                                  : "-"}
                                {/* {item.evidenceReceivedData} */}
                              </td>
                              <td colSpan={1} className="p-4">
                                {item?.evidenceWeight
                                  ? item?.evidenceWeight
                                  : "-"}
                              </td>
                              <td colSpan={1} className="p-4 whitespace-nowrap">
                                {item?.seller_name ? item?.seller_name : "-"}
                              </td>

                              {/* <td className="p-4 ">
                                                                {Math.round(item?.typeOfProduct)}
                                                            </td> */}

                              <td colSpan={1} className="p-4 truncate  ">
                                {item?.material_name
                                  ? item?.material_name
                                  : "-"}
                              </td>
                              <td
                                colSpan={1}
                                className="py-4 px-2 !leading-[130%] "
                              >
                                <a
                                  className={`px-2 rounded-full whitespace-nowrap text-sm py-1 inline-flex ${item.status?.includes("Fully Received")
                                    ? "text-emerald-700 bg-emerald-50"
                                    : item.status?.includes(
                                      "Review PO Allocation"
                                    )
                                      ? `text-amber-700 bg-amber-50`
                                      : "text-rose-700 bg-rose-50"
                                    }`}
                                >
                                  {item.status ? item.status : "-"}
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="w-full h-full ">
                          <NoDataToShow
                            rowAndCol={true}
                            colSpan={7}
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
        </div>
      </div>

      {modaldelete.state && (
        <DeleteDocument setOpen={setModaldelete} modalObj={modaldelete.obj} />
      )}
      {modalSwap.state && (
        <SwapDocument setOpen={setModalSwap} modalObj={modalSwap.obj} />
      )}
      <Viewall modal={modal} setModal={setModal} />
    </Layout>
  );
};

// export default withAuth(Scopecert);
export default Scopecert;

const SectionComponent = ({
  svgActions,
  dateConverter,
  item,
  monthsAndDays,
  i,
  tableArr,
  label,
  empty,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {empty && (
        <p className="text-base font-semibold inter-font leading-[18px] text-card-heading">
          {label || "Current Certificate "}
        </p>
      )}
      <div className="flex p-6 bg-summary-cards flex-col md:gap-4">
        <div className="  flex items-center  w-full justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-sm leading-[18px] inter-font text-card-heading">
              Uploaded By{" "}
              <span className="text-emerald-600 font-semibold">
                {item?.supplier}
              </span>
            </h1>
            <p className="text-xs leading-[18px] inter-font text-card-subheading">
              {`${dateConverter()}`} at 12:00 PM
            </p>
          </div>
          <div className="flex gap-2">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.5V8H11.375M14.75 8C14.75 11.7279 11.7279 14.75 8 14.75C4.27208 14.75 1.25 11.7279 1.25 8C1.25 4.27208 4.27208 1.25 8 1.25C11.7279 1.25 14.75 4.27208 14.75 8Z"
                stroke={
                  monthsAndDays(item?.expiryDate) === "expired"
                    ? "#DC2626"
                    : `#059669`
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {monthsAndDays(item?.expiryDate) === "expired" ? (
              <div className="flex flex-col gap-1">
                <h1 className="text-sm leading-[14px] font-medium inter-font text-red-600">
                  Certificate expired
                </h1>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <h1 className="text-sm leading-[14px] font-medium inter-font text-slate-500">
                  Certificate will expire in
                </h1>
                <p className="text-sm leading-[14px] font-medium inter-font text-emerald-600">
                  {monthsAndDays(item?.expiryDate)}
                </p>
              </div>
            )}

            <svg
              className="svg-theme-eye"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.4375 7.4375L7.46862 7.42194C7.89846 7.20702 8.38244 7.59526 8.26588 8.06148L7.73412 10.1885C7.61756 10.6547 8.10155 11.043 8.53138 10.8281L8.5625 10.8125M14.75 8C14.75 11.7279 11.7279 14.75 8 14.75C4.27208 14.75 1.25 11.7279 1.25 8C1.25 4.27208 4.27208 1.25 8 1.25C11.7279 1.25 14.75 4.27208 14.75 8ZM8 5.1875H8.00563V5.19313H8V5.1875Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <hr className="w-full " />
        <div className=" secondry-btn-border  rounded-[10px]">
          <div className="flex gap-3">
            <svg
              width={24}
              height={30}
              viewBox="0 0 24 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.96875 0.125H7.75C10.684 0.125 13.0625 2.50349 13.0625 5.4375V8.09375C13.0625 9.56076 14.2517 10.75 15.7188 10.75H18.375C21.309 10.75 23.6875 13.1285 23.6875 16.0625V27.2188C23.6875 28.6858 22.4983 29.875 21.0312 29.875H2.96875C1.50174 29.875 0.3125 28.6858 0.3125 27.2188V2.78125C0.3125 1.31424 1.50174 0.125 2.96875 0.125ZM12.7513 14.2487C12.552 14.0494 12.2818 13.9375 12 13.9375C11.7182 13.9375 11.448 14.0494 11.2487 14.2487L6.9987 18.4987C6.58377 18.9136 6.58377 19.5864 6.9987 20.0013C7.41363 20.4162 8.08637 20.4162 8.5013 20.0013L10.9375 17.5651L10.9375 23.5C10.9375 24.0868 11.4132 24.5625 12 24.5625C12.5868 24.5625 13.0625 24.0868 13.0625 23.5L13.0625 17.5651L15.4987 20.0013C15.9136 20.4162 16.5864 20.4162 17.0013 20.0013C17.4162 19.5864 17.4162 18.9136 17.0013 18.4987L12.7513 14.2487Z"
                fill="#059669"
              />
              <path
                d="M15.1875 5.4375C15.1875 3.57734 14.5046 1.87668 13.3759 0.572532C18.191 1.83035 21.9822 5.62149 23.24 10.4366C21.9358 9.30789 20.2352 8.625 18.375 8.625H15.7188C15.4253 8.625 15.1875 8.38715 15.1875 8.09375V5.4375Z"
                fill="#059669"
              />
            </svg>
            <div className="flex justify-between w-full items-center gap-2">
              <div className="flex flex-col gap-[10px] w-full">
                <p
                  className={`text-sm font-medium inter-font text-card-heading !leading-none`}
                >
                  Customers_Q4_2023.PDF
                </p>
                <p
                  className={`text-xs  inter-font text-card-subheading !leading-none`}
                >
                  320KB ∙ 2seconds left
                </p>
              </div>
              <div className="flex items-center gap-4">
                {tableArr[i]?.historyArr
                  .find((it) => it)
                  .svg.map((svgs, o) => {
                    return (
                      <React.Fragment key={o}>
                        <span
                          className="cursor-pointer"
                          onClick={() => svgActions(svgs.name, item)}
                        >
                          {svgs.svg}
                        </span>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function PerViewer({ children, value, color }) {
  return (
    <div className="flex items-center flex-wrap gap-y-7  gap-x-[80px]">
      <div className="flex flex-col gap-1">
        <h1
          className={`text-[20px]  !leading-none ${color} font-semibold inter-font `}
        >
          {`${value}%`}
        </h1>
        <p className="text-xs !leading-none inter-font text-card-subheading">
          {children}
        </p>
      </div>
    </div>
  );
}
