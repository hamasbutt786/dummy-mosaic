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
  sortedMaterialArray,
  sortedSuppliersData
} from "@/data/suppliersandcountries/data";
import { tableArr } from "@/data/tabledatascopecert";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import {
  useLazyGetSupplyChainFacilityLatestQuery
} from "@/redux-setup/api/data";
import { getTitle } from "@/utils/functions";
import { debounce } from "@/utils/helper";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../components/layout";
import Header from "../components/header";
// const Header = dynamic(() => import("../components/header"), { ssr: false });
// const Layout = dynamic(() => import("../components/layout"), { ssr: false });

const Dotsmap = dynamic(() => import("../components/charts/Dotsmap"), {
  ssr: false,
});

const Scopecert = () => {
  const [showSection, setSection] = useState(false);
  const [loaderTable, setLoaderTable] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2021-01-11"));
  const [endDate, setEndDate] = useState(new Date());
  const [fills2, setFills2] = useState({
    border: "#059669",
    rgba: "rgba(5, 150, 105, 0.1)",
    trail: "#E2E8F0",
    mapInsider: "#d9d9d9",
    text: "#1E293B",
  });
  const [fills, setFills] = useState("#047857");
  const businessId = useBusinessEntity()
  const [supplierLoader1, setSupplierLoader1] = useState(false);
  const [supplierLoader2, setSupplierLoader2] = useState(false);
  const [supplierLoaderClicked, setsupplierLoaderClicked] = useState(false);
  const [rangeState, setRange] = useState({ value: 10, label: 10 });
  const [pageValue, setPage] = useState(0);
  const [onChangeValue, setOnChangeValue] = useState({});

  const [highPriorityTrigger, { data: supplyChainFacilityLatest }] =
    useLazyGetSupplyChainFacilityLatestQuery();
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
  let buyerName = supplyChainFacilityLatest === undefined ? [] : supplyChainFacilityLatest?.businessEntitiesDetails?.map((val) => {
    return {
      value: val.buyerName,
      label: val.buyerName
    }
  })
  const basicFilters = [
    {
      id: 1,
      label: "Buyer",
      options: commonUniqueArraySplitter1(buyerName),
    },
    {
      id: 2,
      label: "Material Name",
      options: sortedMaterialArray,
    },
    {
      id: 6,
      label: "Seller",
      options: commonUniqueArraySplitter1(sortedSuppliersData),
    },
  ];
  const advanceFilters = [
    ...basicFilters,
    {
      id: 44,
      label: "Status",
      options: [
        {
          label: "Certified",
          value: "Certified",
        },
        {
          label: "Recertification Due",
          value: "Recertification Due",
        },
        {
          label: "Certification Expired",
          value: "Certification_Expired",
        },
      ],
    },
  ];
  let svg = (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1145_3683)">
        <path
          d="M2.66602 11.334V12.6673C2.66602 13.0209 2.80649 13.3601 3.05654 13.6101C3.30659 13.8602 3.64573 14.0007 3.99935 14.0007H11.9993C12.353 14.0007 12.6921 13.8602 12.9422 13.6101C13.1922 13.3601 13.3327 13.0209 13.3327 12.6673V11.334"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.66602 5.99935L7.99935 2.66602L11.3327 5.99935"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 2.66602V10.666"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1145_3683">
          <rect width={16} height={16} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  function handleSearch() { }
  const { theme } = useTheme();
  const [modal, setModal] = useState(false);
  const data1 = {
    labels:
      supplyChainFacilityLatest != undefined &&
      Object.keys(supplyChainFacilityLatest?.statusPercentages),
    datasets: [
      {
        data:
          supplyChainFacilityLatest != undefined &&
          Object.values(supplyChainFacilityLatest?.statusPercentages),
        backgroundColor:
          supplyChainFacilityLatest != undefined &&
          Object.keys(supplyChainFacilityLatest?.statusPercentages).map((it) =>
            it?.status === "Certified"
              ? "#34D399"
              : it?.status === "CertificationExpired"
                ? "#F87171"
                : "#FBBF24"
          ),
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

  useEffect(() => {
    switch (theme) {
      case "emerald":
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
    if (businessId === null) return
    facilityTableDataTriggerFunction(
      0,
      {
        value: 10,
        label: 10,
      },
      undefined,
      undefined
    );
  }, [businessId]);


  function handleTableDetails(id) {
    let newVal = [...showTableDetails];
    newVal[id] = !newVal[id];
    setShowTableDetails(newVal);

    let newVals = [...tableDetails];
    newVals[id] = !newVals[id];
    setTableDetails(newVal);
  }
  const totalPages = (supplyChainFacilityLatest === undefined || !supplyChainFacilityLatest?.businessEntitiesDetails?.length) ? 1 : Math.ceil(
    supplyChainFacilityLatest?.businessEntitiesDetails.length / 10
  );
  const facilityTableDataTriggerFunction = useCallback((
    pagevalues,
    limit,
    statusFilter,
    search
  ) => {
    setRange(limit);
    setPage(pagevalues);
    setSupplierLoader1(true);
    setLoaderTable(true);
    let offset = pagevalues * limit.value;
    let params = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      seller: onChangeValue['Seller']?.join(","),
      buyer: onChangeValue['Buyer']?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      skip: offset,
      take: limit.value,
      ...(search != undefined && search && { search: search }),
    };
    let payload1 = {
      ...(startDate !== null && { startDate: format(startDate, "yyyy-MM-dd") }),
      ...(endDate !== null && { endDate: format(endDate, "yyyy-MM-dd") }),
      seller: onChangeValue['Seller']?.join(","),
      buyer: onChangeValue['Buyer']?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      ...(onChangeValue["Status"] && onChangeValue["Status"].length > 0
        ? onChangeValue["Status"] && { status: onChangeValue["Status"] }
        : ""),
      skip: offset,
      take: limit.value,
      ...(search != undefined && search && { search: search }),
    };
    highpriorityTriggerParams(
      !showSection ? { params, businessId } : { params: payload1, businessId }
    );
  }, [businessId, onChangeValue, showSection])

  async function highpriorityTriggerParams(payload) {
    setSupplierLoader2(true);
    try {
      await highPriorityTrigger(payload);
      setSupplierLoader2(false);
      setLoaderTable(false);
    } catch (error) {
      console.log("error in  343", error);
      setSupplierLoader2(false);
      setLoaderTable(false);
    } finally {
      setsupplierLoaderClicked(false)
    }
  }
  const dateConverter = () => {
    const givenDate = new Date();
    const day = givenDate.getDate();
    const month = givenDate.toLocaleString("default", { month: "long" });
    const year = givenDate.getFullYear();

    const ordinalSuffix = (day) => {
      if (day === 1 || day === 21 || day === 31) {
        return day + "st";
      } else if (day === 2 || day === 22) {
        return day + "nd";
      } else if (day === 3 || day === 23) {
        return day + "rd";
      } else {
        return day + "th";
      }
    };

    return ordinalSuffix(day) + " " + month + " " + year;
  };
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

  function monthsAndDays(expirydate) {
    const givenDate = new Date(expirydate);
    const today = new Date();

    if (givenDate > today) {
      // Calculate the time difference in milliseconds
      const timeDifference = givenDate.getTime() - today.getTime();

      // Convert milliseconds to days
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const totalDays = Math.floor(timeDifference / millisecondsPerDay);

      // Calculate the number of months and remaining days
      const totalMonths = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;

      return `${totalMonths} Months ${remainingDays} Days`;
    } else {
      return "expired";
    }
  }

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
          size: 8,
        },
        bodyFont: {
          size: 8,
        },
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
    facilityTableDataTriggerFunction(0, rangeState, undefined, undefined);
  };

  const handleMoveToEndPage = () => {
    // Move to the last page
    setCurrentPage(totalPages - 1);
    facilityTableDataTriggerFunction(
      totalPages - 1,
      rangeState,
      undefined,
      undefined
    );
  };
  const debouncedSearchCall = debounce(
    (pageValue, rangeState, value) =>
      facilityTableDataTriggerFunction(pageValue, rangeState, undefined, value),
    600 // 300ms delay
  );
  function statusValues(key) {
    let ObjectForCetificates = supplyChainFacilityLatest?.statusPercentages === undefined ? {} : supplyChainFacilityLatest?.statusPercentages
    let statusCert = ObjectForCetificates[key]
    if (statusCert === undefined) {
      return 0
    } else {
      return Math.round(parseFloat(statusCert))
    }
  }
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle(
        "Scope Certificates  | Mosaica -  Business Intelligence for Corporate Responsibility"
      )}
      <div className="flex justify-center m-7 ">
        <div className=" w-full flex flex-col gap-7 max-w-[1124px] z-[0]">
          <div className="flex flex-col gap-5">
            <div className="!leading-none text-2xl text-card-heading inter-font w-full font-semibold space-y-2">
              <p className="!leading-none text-xs text-card-subheading font-normal inter-font">
                Cert. Materials
              </p>
              <h1>Scope Certificate Management</h1>
            </div>
            <div
              className={`flex flex-col gap-7 ${!showSection ? "advancefilter" : "advancefilter1"
                } w-full pt-5 pb-3  border border-navborder bg-summary-cards rounded-lg items-center `}
            >
              {!showSection ? (
                <div className="grid grid-cols-3 gap-4 lg:gap-7 px-6 w-full ">
                  {basicFilters.map((item, i) => (
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
                    loader={supplierLoaderClicked}
                    disabled={supplierLoader2}
                    handleClick={() => {
                      setsupplierLoaderClicked(true)
                      facilityTableDataTriggerFunction(
                        pageValue,
                        rangeState,
                        undefined,
                        undefined
                      );
                    }}
                    padding={"px-12 py-4"}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 lg:grid-cols-3 items-center gap-7 px-6  w-full ">
                  {advanceFilters.map((item, i) => (
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
                    loader={supplierLoaderClicked}
                    disabled={supplierLoader2}
                    // handleClick={() => {
                    //   highpriorityTriggerParams();
                    // }}
                    handleClick={() => {
                      setsupplierLoaderClicked(true)
                      facilityTableDataTriggerFunction(
                        pageValue,
                        rangeState,
                        undefined,
                        undefined
                      );
                    }}
                    padding={"md:px-5 lg:px-12 py-4"}
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
            <div className="lg:max-h-[442px] flex lg:flex-row flex-col gap-7">
              <div className=" w-full lg:max-w-[548px] flex flex-col gap-7">
                <div
                  className={`inline-flex flex-col gap-4 items-start justify-between px-6 ${fills === "#1E40AF"
                    ? "background-summary-blue"
                    : fills === "#7E22CE"
                      ? "background-summary-purple"
                      : fills === "#FF8E6C"
                        ? "background-summary-orange"
                        : fills === "#059669"
                          ? "background-summary-dark border border-navborder"
                          : "background-summary"
                    } pt-[18px] rounded-lg w-full `}
                >
                  <div className="flex flex-col space-y-2 items-start justify-start w-full max-w-[1100px] ">
                    <p className="text-base font-semibold leading-none text-card-subheading ">
                      High Priority Items Since Your Last Login
                    </p>

                    <div className="flex flex-col space-y-1 items-start justify-start">
                      <div className="inline-flex space-x-2 items-center justify-start">
                        <img
                          className={`w-4 h-4`}
                          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/chevron-double-up.png"
                          alt="chev"
                        />
                        <p className="text-xs leading-3 text-card-subheading ">
                          Facilities with Expired Certifications are up by 5%
                          (16 Facilities)
                        </p>
                      </div>
                      <div className="inline-flex space-x-2 items-center justify-start">
                        <img
                          className={`w-4 h-4`}
                          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/chevron-double-up.png"
                          alt="chev"
                        />

                        <p className="text-xs leading-3 text-card-subheading ">
                          Urgently Awaited Transaction Certificates are up by 6%
                          (92 Transactions)
                        </p>
                      </div>
                      <div className="inline-flex space-x-2 items-center justify-start">
                        <img
                          className={`w-4 h-4`}
                          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/arrow-trending-up.png"
                          alt="arrow"
                        />
                        <p className="text-xs leading-3 text-card-subheading ">
                          End-of-Year Responsible Materials Forecast has
                          increased from 62% to 68%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setModal(true)}
                    className="pointer-events-none inline-flex items-start justify-start cursor-pointer py-1"
                  >
                    <p className="text-sm font-medium leading-none underline text-card-heading ">
                      View All
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 rounded-full" />
                  </div>
                </div>

                <div className="bg-summary-cards  secondry-btn-border items-center w-full h-full px-6 py-5 flex justify-between gap-4 rounded-lg">
                  <div className="flex flex-col gap-5 w-full md:max-w-[350px] lg:max-w-[304px]">
                    <p className="text-lg font-semibold leading-[18px] inter-font text-card-heading">
                      Facilities by Certification Status
                    </p>
                    <div className="flex flex-col">
                      <div className="flex items-center flex-wrap gap-y-7  gap-x-[80px]">
                        <PerStatus value={statusValues('CertificationExpired')} color={"text-red-400"}>
                          {" "}
                          Certification Expired
                        </PerStatus>
                        <PerStatus value={statusValues('Certified')} color={"text-emerald-400"}>
                          Certified
                        </PerStatus>
                        <PerStatus value={statusValues('AwaitingRecertification')} color={"text-amber-400"}>
                          Recertification Due
                        </PerStatus>
                      </div>
                    </div>
                  </div>
                  {supplyChainFacilityLatest !== undefined &&
                    supplyChainFacilityLatest?.statusPercentages?.length >
                    0 && (
                      <div className="w-[128px] h-[128px] mx-auto ">
                        <PieChart data={data1} options={options} />
                      </div>
                    )}
                </div>
              </div>
              <div className=" bg-summary-cards secondry-btn-border border w-full lg:max-w-[548px] border-[#F1F5F9] rounded-lg py-5 px-6">
                <div className="flex flex-col  gap-2 mb-7">
                  <p className="text-lg font-semibold text-card-heading inter-font">
                    Supply Chain Facilities
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm inter-font">
                    High Priority
                  </p>
                </div>
                <Dotsmap
                  compName={"scope"}
                  theme={fills}
                  mapInsider={fills2.mapInsider}
                  facilityTable1={supplyChainFacilityLatest?.businessEntitiesDetails}
                />
              </div>
            </div>
            <div className="bg-summary-cards  secondry-btn-border py-5 px-6 space-y-5 overflow-x-auto rounded-lg ">
              <p className="mb-5 text-lg font-semibold h-full w-full max-w-[350px] max-h-[18px] leading-[18px] text-card-heading inter-font">
                Scope Certified Facilities
              </p>
              <div className={"flex flex-col gap-5 items-start"}>
                <div className={` xl:flex  w-full hidden justify-between`}>
                  <div className="w-full min-w-[300px] max-w-[300px] xl:pr-0 pr-3">
                    <InputTag
                      placeholder={"Search"}
                      width={"w-full"}
                      PY={"py-3"}
                      changeHandler={
                        (e) =>
                          debouncedSearchCall(
                            pageValue,
                            rangeState,
                            e.target.value
                          )
                      }
                    />
                  </div>
                  <div className="main_pagination xl:min-w-[426px] xl:max-w-[426px] w-full flex justify-center items-center  ">
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
                        facilityTableDataTriggerFunction(
                          e.selected,
                          rangeState,
                          undefined,
                          undefined
                        )
                      }
                      pageLinkClassName={
                        " focus:outline-none  w-5 cursor-pointer text-sm w-8 h-5 h-10 bg-transparent text-gray-600 dark:text-card-subheading dark:hover:text-black hover:text-gray-500 flex items-center justify-center"
                      }
                      containerClassName={
                        "flex overflow-x-auto cursor-pointer items-center"
                      }
                      subContainerClassName={"overflow-x-auto container column"}
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
                  <div className={`flex items-center justify-end w-full pr-3`}>
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
                              facilityTableDataTriggerFunction(
                                0,
                                e,
                                undefined,
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

                <div className=" flex xl:flex-row flex-col w-full justify-between gap-4 text-sm lg:max-w-full md:max-w-full items-center">
                  <div className={`w-full xl:hidden block pr-3`}>
                    <DatePickerComponent
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      compname={"scope"}
                      minwidth={`min-w-full`}
                      hitApi={() =>
                        facilityTableDataTriggerFunction(
                          pageValue,
                          rangeState,
                          undefined,
                          undefined
                        )
                      }
                    />
                  </div>

                  <div className="w-full xl:min-w-[200px] xl:hidden xl:max-w-[200px] xl:pr-0 pr-3">
                    <InputTag
                      placeholder={"Search"}
                      width={"w-full"}
                      PY={"py-3"}
                      changeHandler={(e) => {
                        facilityTableDataTriggerFunction(
                          pageValue,
                          rangeState,
                          undefined,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-auto h-full max-h-[612px] min-h-[612px]">
                {loaderTable ? (
                  <div className="w-full h-[424px] flex flex-col justify-center items-center ">
                    <BlackSpinner width={"60px"} height={"60px"} />
                  </div>
                ) : (
                  <table className=" w-full md:text-xs lg:text-sm text-left text-card-heading ">
                    <thead className="text-card-heading uppercase bg-table-header">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-[18px]  min-w-[120px] leading-3 text-xs font-medium"
                        >
                          Buyer
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs  min-w-[120px] font-medium"
                        >
                          Seller
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3  min-w-[160px] text-xs font-medium"
                        >
                          Certified Material
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs font-medium  min-w-[140px]"
                        >
                          Scope Certified
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3  min-w-[160px] text-xs font-medium"
                        >
                          Certification Type
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs font-medium min-w-[180px]"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs font-medium"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplyChainFacilityLatest?.tableData
                        ?.length ? (
                        supplyChainFacilityLatest?.tableData?.map(
                          (item, i) => {
                            return (
                              <React.Fragment key={i}>
                                <tr className="bg-summary-cards w-full text-card-subheading border-navborder border-b ">
                                  <td className="p-4 hover:underline cursor-pointer truncate md:max-w-[120px]">
                                    {item?.buyer ? item.buyer : "-"}
                                  </td>

                                  <td className="p-4 md:max-w-[120px]  truncate">
                                    {item?.sellerName ? item.sellerName : "-"}
                                  </td>
                                  <td className="p-4  md:max-w-[120px]">
                                    {item?.material ? item.material : "-"}
                                  </td>
                                  <td className="p-4  truncate  max-w-[120px]">
                                    {item?.scopeCertificateNumber
                                      ? item?.scopeCertificateNumber
                                      : "-"}
                                  </td>
                                  <td className="p-4 truncate max-w-[160px]">
                                    {item?.certifiedType
                                      ? item?.certifiedType
                                      : "-"}
                                  </td>
                                  <td className="p-4 ">
                                    <a
                                      className={`px-2 inline-flex rounded-full py-1 ${item?.sellerAddress?.status === "Certified"
                                        ? "text-emerald-700 bg-emerald-50"
                                        : item?.sellerAddress?.status ===
                                          "Certification Expired"
                                          ? `text-rose-700 bg-rose-50`
                                          : item?.sellerAddress?.status.includes(
                                            "Awaiting Certification"
                                          )
                                            ? "text-amber-700 bg-amber-50"
                                            : ""
                                        }`}
                                    >
                                      {item?.sellerAddress?.status
                                        ? item?.sellerAddress?.status
                                        : "-"}
                                    </a>
                                  </td>
                                  <td
                                    onClick={() => {
                                      handleTableDetails(i);
                                    }}
                                    className="p-4 cursor-pointer"
                                  >
                                    <svg
                                      className={`${!showTableDetails[i] ? "rotate-180" : ""
                                        } transition-all svg-theme-eye2 ease-in-out duration-300 cursor-pointer`}
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M14.7698 12.7906C14.4713 13.0777 13.9965 13.0684 13.7094 12.7698L10 8.83208L6.29062 12.7698C6.00353 13.0684 5.52875 13.0777 5.23017 12.7906C4.93159 12.5035 4.92228 12.0287 5.20937 11.7302L9.45937 7.23017C9.60078 7.08311 9.79599 7 10 7C10.204 7 10.3992 7.08311 10.5406 7.23017L14.7906 11.7302C15.0777 12.0287 15.0684 12.5035 14.7698 12.7906Z"
                                        fill="#1E293B"
                                      />
                                    </svg>
                                  </td>
                                </tr>
                                {tableDetails[i] && (
                                  <tr className="w-full">
                                    <td colSpan={7} className=" w-full ">
                                      <div className="bg-slate-50 w-full pb-5 px-4 flex flex-col gap-5">
                                        <div className="flex flex-col items-center gap-4">
                                          <div className="flex justify-between pt-4 w-full items-center">
                                            <h3 className="text-lg leading-[18px] font-semibold inter-font text-card-heading">
                                              Documents history
                                            </h3>
                                            <ButtonPrimary
                                              svg={svg}
                                              padding={"p-2"}
                                              extendclass={`!text-xs leading-[14px]`}
                                              label="Upload PDF"
                                            />
                                          </div>
                                          <div className="border-b border-navborder w-full" />
                                        </div>
                                        <SectionComponent
                                          dateConverter={dateConverter}
                                          item={item}
                                          monthsAndDays={monthsAndDays}
                                          i={i}
                                          tableArr={tableArr}
                                          svgActions={svgActions}
                                          empty={true}
                                        />
                                        <SectionComponent
                                          dateConverter={dateConverter}
                                          item={item}
                                          monthsAndDays={monthsAndDays}
                                          i={i}
                                          tableArr={tableArr}
                                          svgActions={svgActions}
                                          label={"Recent Uploads"}
                                          empty={true}
                                        />
                                        <div className=" flex items-center gap-4 ">
                                          <svg
                                            className="w-full"
                                            width={476}
                                            height={1}
                                            viewBox="0 0 476 1"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <line
                                              opacity="0.3"
                                              y1="0.5"
                                              x2="475.5"
                                              y2="0.5"
                                              stroke="#CBD5E1"
                                            />
                                          </svg>
                                          <p className="text-card-subheading text-sm !leading-none ">
                                            February
                                          </p>
                                          <svg
                                            className="w-full"
                                            width={476}
                                            height={1}
                                            viewBox="0 0 476 1"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <line
                                              opacity="0.3"
                                              x1="0.5"
                                              y1="0.5"
                                              x2={476}
                                              y2="0.5"
                                              stroke="#CBD5E1"
                                            />
                                          </svg>
                                        </div>
                                        <SectionComponent
                                          dateConverter={dateConverter}
                                          item={item}
                                          monthsAndDays={monthsAndDays}
                                          i={i}
                                          tableArr={tableArr}
                                          svgActions={svgActions}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          }
                        )
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
function PerStatus({ color, value, children }) {
  return (
    <div className="flex flex-col gap-1">
      <h1
        className={`text-[20px] !leading-none ${color} font-semibold inter-font `}
      >
        {`${value}%`}
      </h1>
      <p className="text-xs !leading-none inter-font text-card-subheading">
        {children}
      </p>
    </div>
  );
}
