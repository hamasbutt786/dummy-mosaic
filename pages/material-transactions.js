import BarChart from "@/components/charts/BarChart";
import MaterialTransaction from "@/components/modals/MaterialTransaction";
import BlackSpinner from "@/components/reusableUi/BlackSpinner";
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import NoDataToShow from "@/components/reusableUi/noDataToShow";
import { useLazyGetTransectionMaterialQuery } from "@/redux-setup/api/data";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import withAuth from "@/components/middlewares/Auth";
import DatePickerComponent from "@/components/reusableUi/CustomDateRange";
import InputTag from "@/components/reusableUi/Input";
import ReactSelectDropDown from "@/components/reusableUi/ReactSelectDropDown";
import {
  sortedMaterialArray,
  sortedSuppliersData
} from "@/data/suppliersandcountries/data";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import { getTitle } from "@/utils/functions";
import { debounce } from "@/utils/helper";
import { format } from "date-fns";

const Header = dynamic(() => import("../components/header"), { ssr: false });
const Layout = dynamic(() => import("../components/layout"), { ssr: false });
const CertMaterial = () => {
  const [showSection, setSection] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalObj, setModalobj] = useState({});
  const [transectionDataLoader, setTransectionLoader] = useState(false);
  const [transectioMaterialData, settransectioMaterialData] = useState({});
  const [startDate, setStartDate] = useState(new Date("2021-01-11"));
  const [endDate, setEndDate] = useState(new Date());
  const [filtration, setFiltration] = useState([]);
  const businessId = useBusinessEntity();
  const dataRange = [
    {
      id: 1,
      options: [
        { label: 10, value: 10 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 200, value: 200 }
      ]
    }
  ];
  const [rangeState, setRange] = useState({ value: 10, label: 10 });
  const [pageValue, setPage] = useState(0);
  const [choseDate, setChoseDate] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaderClicked, setLoaderClicked] = useState(false);
  const [
    TransectioMaterialData,
    { data: transactionData, isLoading: dataTLoader, isFetching }
  ] = useLazyGetTransectionMaterialQuery();
  const itemsPerPage = rangeState?.value;
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = !transectioMaterialData?.totalCount ? 1 : Math.ceil(
    transectioMaterialData?.totalCount / itemsPerPage
  );
  const [onChangeValue, setOnChangeValue] = useState({});

  useEffect(() => {
    if (businessId === null) return;
    handlePageChange(
      0,
      {
        value: 10,
        label: 10
      },
      onChangeValue?.Status?.join("|")
    );
  }, [businessId]);

  const handlePageChange = (pagevalues, limit, labels) => {
    setRange(limit);
    setPage(pagevalues);
    setTransectionLoader(true);
    let offset = pagevalues * limit.value;
    let params = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      seller: onChangeValue['Seller']?.join(","),
      buyer: onChangeValue['Buyer']?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      status: labels ? labels : onChangeValue?.Status?.join(","),
      skip: offset,
      take: rangeState.value
    };
    let payload1 = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      seller: onChangeValue['Seller']?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      buyer: onChangeValue['Buyer']?.join(","),
      status: labels ? labels : onChangeValue?.Status?.join(","),
      skip: offset,
      take: rangeState.value
    };
    console.log({ payload1, params })
    TransectioMaterialData(
      !showSection ? { params, businessId } : { params: payload1, businessId }
    )
      .unwrap()
      .then((res) => {
        settransectioMaterialData(res);
        setCurrentItems(res);
        setTransectionLoader(false);
        setLoader(false);
        if (labels === undefined) {
          setFiltration([]);
          return;
        }
        setFiltration([labels]);
      })
      .catch(() => {
        setTransectionLoader(false);
        setLoader(false);
      });
  };

  // uniqueArraySplitter
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
  const data = [
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
  // const data = [
  //   {
  //     id: 2,
  //     label: "Season",
  //     options: [
  //       { label: "Autumn / Winter 21", value: "Autumn / Winter 21" },
  //       { label: "Autumn / Winter 22", value: "Autumn / Winter 22" },
  //       { label: "Spring / Summer 21", value: "Spring / Summer 21" },
  //       { label: "Spring / Summer 22", value: "Spring / Summer 22" },
  //       { label: "Spring / Summer 23", value: "Spring / Summer 23" },
  //     ],
  //     // multiSelect: true,
  //   },
  //   {
  //     id: 3,
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
  //         value: "Elastane, Spandex & Lycra",
  //       },
  //       { label: "Leather & Suede", value: "Leather & Suede" },
  //       { label: "Other Synthetics", value: "Other Synthetics" },
  //     ].sort((a, b) => (a.value > b.value ? 1 : -1)),
  //     // multiSelect: true,
  //   },
  // ];
  const advanceData = [
    ...data,
    {
      id: 6,
      label: "Seller",
      options: commonUniqueArraySplitter1(sortedSuppliersData)
    },
    {
      id: 44,
      label: "Status",
      options: [
        {
          label: "Fully Received",
          value: "Fully Received",
        },
        {
          label: "Awaiting Evidence",
          value: "Awaiting Evidence",
        },
        {
          label: "Partially Received",
          value: "Partially Received",
        },
      ],
    },
  ];
  let cards = [
    {
      head: "Year to Date Performance",
      perc: `${
        transectioMaterialData?.yearToDatePerformance === undefined
          ? 0 + "%"
          : transectioMaterialData?.yearToDatePerformance
      }`,
      foot: "POs with Evidence Fully Received"
    },
    {
      head: "End of Year Forecast",
      perc: `${
        transectioMaterialData?.endOfYearForecast != null
          ? transectioMaterialData?.endOfYearForecast?.toFixed(0)
          : 0
      }%`,
      foot: "Forecast POs with Evidence Fully Received"
    },
    {
      head: "Attention Needed",
      perc: `${
        transectioMaterialData?.attentionNeeded != null
          ? transectioMaterialData?.attentionNeeded
          : 0
      }`,
      foot: "POs Urgently Awaiting Evidence"
    },
    {
      head: "POs",
      perc: `${
        transectioMaterialData?.POs != null
          ? Math.round(transectioMaterialData?.POs)
          : 0
      }%`,
      foot: "YTD % of POs with Evidence Fully Received."
    }
  ];

  const handleSearch = (e) => {
    let offset = pageValue * rangeState.value;
    setLoader(true);
    setTransectionLoader(true);
    if (startDate !== null && endDate !== null) {
      setChoseDate(format(startDate, "yyyy-MM-dd").slice(0, 4));
    }
    let payload = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      seller: onChangeValue['Seller']?.join("|"),
      buyer: onChangeValue['Buyer']?.join("|"),
      material: onChangeValue["Material Name"]?.join("|"),
      // season: onChangeValue?.Season?.join("|"),
      // materialGroup: onChangeValue?.["Material Group"]?.join("|"),
      skip: offset,
      ...(e?.target?.value !== "" && { search: e?.target?.value }),
      take: rangeState.value
    };
    let payload1 = {
      startDate: startDate != null ? format(startDate, "yyyy-MM-dd") : "",
      endDate: endDate != null ? format(endDate, "yyyy-MM-dd") : "",
      seller: onChangeValue['Seller']?.join(","),
      material: onChangeValue["Material Name"]?.join(","),
      buyer: onChangeValue['Buyer']?.join(","),
      status: onChangeValue?.Status?.join(","),
      search: e?.target?.value,
      skip: offset,
      take: rangeState.value
    };
    TransectioMaterialData(
      !showSection
        ? { params: payload, businessId }
        : { params: payload1, businessId }
    )
      .unwrap()
      .then((res) => {
        console.log({ res });
        settransectioMaterialData(res);
        setCurrentItems(res);
        setTransectionLoader(false);
        setLoader(false);
        if (!onChangeValue?.Status) {
          setFiltration([]);
          return;
        }
        setFiltration(onChangeValue?.Status);
      })
      .catch((err) => {
        console.log({ err });
        if (err.status === 404) {
          settransectioMaterialData([]);
          setCurrentItems([]);
        }
        setLoader(false);
        setTransectionLoader(false);
      }).finally(() => {
        setLoaderClicked(false)
      })
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };
  const debouncedSearchCall = debounce(
    (value) => handleSearch(value),
    700 // 300ms delay
  );
  const [currentPage, setCurrentPage] = useState(0);
  const handleMoveToFirstPage = () => {
    // Move back to the first page
    setCurrentPage(0);
    handlePageChange(0, rangeState, onChangeValue?.Status?.join("|"));
  };

  const handleMoveToEndPage = () => {
    // Move to the last page
    setCurrentPage(totalPages - 1);
    handlePageChange(
      totalPages - 1,
      rangeState,
      onChangeValue?.Status?.join("|")
    );
  };
  function formatDate(datee) {
    const dateString = datee.toString();
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short", // Using "short" to get abbreviated month name
      year: "numeric"
    };

    const dateUpdated = date.toLocaleDateString("en-US", options);
    return dateUpdated;
  }
  const handlechange = (e, label) => {
    let newwArr = e.reduce((acc, item) => {
      return [...acc, item.value];
    }, []);
    setOnChangeValue({ ...onChangeValue, [label]: newwArr });
  };
  function materialWeightValues(item, valuetoGet) {
    // For material weight
    let { poData, ...rest } = item;
    let filteredVal = valuetoGet[0]?.poBaselines
      .map((ite) => {
        if (
          ite?.PO_number === rest?.associatedPO &&
          ite?.materialGroup === rest?.materialGroup
        ) {
          return Math.round(ite?.materialWeight);
        }
      })
      .filter((ir) => ir !== undefined);

    return filteredVal;
  }
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle(
        "Material Transactions | Mosaica -  Business Intelligence for Corporate Responsibility"
      )}
      <div className="flex justify-center m-7 ">
        <div className=" w-full flex flex-col gap-7 max-w-[1124px] z-[0]">
          <div className="flex flex-col gap-5">
            <div className="!leading-none text-2xl text-card-heading inter-font w-full font-semibold space-y-2">
              <p className="!leading-none text-xs text-card-subheading font-normal inter-font">
                Cert. Materials
              </p>
              <h1>Material Transactions</h1>
            </div>
            <div
              className={`flex flex-col gap-7 ${
                !showSection ? "advancefilter" : "advancefilter1"
              } w-full pt-5 pb-3  border border-navborder bg-summary-cards rounded-lg items-center `}
            >
              <div className="flex items-center md:gap-4 lg:gap-7 px-6  w-full ">
                {!showSection ? (
                  <div className="grid grid-cols-3  md:gap-4 lg:gap-7 px-6  w-full ">
                    <DatePickerComponent
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      compname={"true"}
                    />
                    {data.map((item, i) => (
                      <div key={i} className="w-full h-full max-h-[74px]">
                        <ReactSelectDropDown
                          options={item.options}
                          isDisabled={item.disabled}
                          placeholder={item.label}
                          changehandler={(e) => handlechange(e, item.label)}
                          isMulti={true}
                        />
                      </div>
                    ))}
                    <ButtonPrimary
                      extendclass={"self-end"}
                      label={"Search"}
                      disabled={dataTLoader || loader}
                      padding={"px-12 py-4"}
                      handleClick={() => {
                        setLoaderClicked(true)
                        handleSearch();
                      }}
                      loader={loaderClicked}
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
                      <div key={i} className="w-full h-full max-h-[74px]">
                        <ReactSelectDropDown
                          options={item.options}
                          isDisabled={item.disabled}
                          placeholder={item.label}
                          changehandler={(e) => handlechange(e, item.label)}
                          isMulti={true}
                        />
                      </div>
                    ))}
                    <ButtonPrimary
                      extendclass={"self-end"}
                      label={"Search"}
                      disabled={dataTLoader || loader}
                      handleClick={() => {
                        setLoaderClicked(true)
                        handleSearch();
                      }}
                      loader={loaderClicked}
                      padding={"px-12 py-4 w-full"}
                      loaderClasses={"lg:w-full "}
                    // handleClick={() => {
                    //   updatedFilteredData();
                    // }}
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
                    className={`${
                      showSection && "rotate-180"
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
          <div className=" flex flex-col gap-7 w-full">
            <div className="bg-summary-cards w-full flex justify-center">
              {cards.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`w-full  pt-5 px-5 pb-7 flex   flex-col gap-3 ${
                      i >= 1 ? "border-navborder border-l" : ""
                    }`}
                  >
                    <p className="md:text-[10px] text-[10px] lg:text-lg font-semibold  leading-[18px] text-card-heading inter-font">
                      {item.head}
                    </p>
                    <p className="md:text-2xl text-2xl lg:text-[32px] font-semibold  !leading-none text-selected-text inter-font">
                      {item.perc}
                    </p>
                    <p className="md:text-[10px] text-[10px] lg:text-xs !leading-none w-full max-w-[230px] text-card-subheading inter-font">
                      {item.foot}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="bg-summary-cards w-full py-5 px-6 space-y-5 max-h-[573px] min-h-[573px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg leading-[18px] font-semibold inter-font text-card-heading">
                  Timeline
                </h3>
                <p className="text-sm !leading-none  inter-font text-card-subheading">
                  Purchase Order Quantities by Category
                </p>
              </div>{" "}
              <div className="w-full  h-full max-h-[438px] relative">
                <BarChart
                  handlePageChange={handlePageChange}
                  showSection={showSection}
                  rangeState={rangeState}
                  choseDate={choseDate}
                  filtration={filtration}
                  transectioMaterialData={transectioMaterialData}
                />
                <LoaderStateComponent showLoaderModal={isFetching} />
              </div>
              <div className="w-full flex justify-center items-center gap-4">
                <div className="flex items-center text-xs text-card-subheading leading-[15px] font-normal inter-font gap-2">
                  <hr className="bg-[#34D399] rounded-full w-3 h-3 "></hr>
                  Fully Received{" "}
                </div>
                <div className="flex items-center text-xs text-card-subheading leading-[15px] font-normal inter-font gap-2">
                  <hr className="bg-[#FCD34D] rounded-full w-3 h-3 "></hr>
                  Partially Received
                </div>
                <div className="flex items-center text-xs text-card-subheading  leading-[15px] font-normal inter-font gap-2">
                  <hr className="bg-[#F87171] rounded-full w-3 h-3 "></hr>
                  Awaiting Evidence
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-summary-cards w-full py-5 pl-6 pr-1 space-y-5 min-h-[754px] max-h-[754px]">
              <p className=" text-lg font-semibold h-full w-full max-w-[350px] max-h-[18px] leading-[18px] text-card-heading inter-font">
                Transaction List
              </p>
              <div className="flex justify-between">
                <div className=" flex xl:flex-row flex-col w-full justify-between gap-4 text-sm lg:max-w-full  items-center">
                  <div className="w-full  xl:pr-0 pr-3">
                    <InputTag
                      placeholder={"Search"}
                      PY={`py-3`}
                      changeHandler={(e) => debouncedSearchCall(e)}
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
                        "w-8  cursor-pointer text-sm h-10 p-1  flex items-center justify-center"
                      }
                      breakLinkClassName={
                        " cursor-pointer text-sm font-bold leading-tight text-black text-center"
                      }
                      pageCount={totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={4}
                      onPageChange={(e) =>
                        handlePageChange(
                          e.selected,
                          rangeState,
                          onChangeValue?.Status?.join("|")
                        )
                      }
                      pageLinkClassName={
                        " focus:outline-none  w-5 cursor-pointer text-sm w-8 h-5 h-10 bg-transparent text-gray-600 dark:text-zinc-600 dark:hover:text-black dark:hover:font-bold hover:text-gray-500 flex items-center justify-center"
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
                              handlePageChange(
                                0,
                                e,
                                onChangeValue?.Status?.join("|")
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

              <div className=" overflow-auto max-h-[612px]">
                {transectionDataLoader ? (
                  <div className="w-full h-[612px] flex flex-col justify-center items-center ">
                    <BlackSpinner width={"60px"} height={"60px"} />
                  </div>
                ) : (
                  <table className="w-full  text-sm text-left text-card-heading">
                    <thead className="  text-card-heading  bg-table-header">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 min-w-[120px] text-xs font-medium"
                        >
                          Identifier
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs font-medium whitespace-nowrap"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs font-medium min-w-[170px]"
                        >
                          Material Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 min-w-[120px] text-xs font-medium"
                        >
                          Material
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs min-w-[100px] font-medium"
                        >
                          Weight (t)
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs min-w-[120px] font-medium"
                        >
                          Verified Weight (t)
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] leading-3 text-xs min-w-[120px] font-medium"
                        >
                          Units
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-[18px] min-w-[160px] leading-3 text-xs font-medium"
                        >
                          Evidence Reference
                        </th>
                        <th
                          scope="col"
                          className="px-4 min-w-[120px] py-[18px] leading-3 text-xs font-medium"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems?.tableData?.length > 0 ? (
                        currentItems?.tableData?.map((item, i) => {
                          return (
                            <tr
                              key={i}
                              className={`bg-summary-cards ${
                                i === currentItems?.tableData?.length - 1
                                  ? ""
                                  : "border-b border-navborder"
                              }`}
                            >
                              <td
                                onClick={() => {
                                  setModalOpen(true);
                                  setModalobj(item);
                                }}
                                className="p-4 hover:underline cursor-pointer"
                              >
                                {item?.identifier ? item?.identifier : "-"}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                {item?.transaction_date
                                  ? formatDate(new Date(item?.transaction_date))
                                  : "-"}
                              </td>
                              <td className="p-4">
                                {item?.material ? item?.material : "-"}
                              </td>
                              <td className="p-4">
                                {item?.materialGroup
                                  ? item?.materialGroup
                                  : "-"}
                              </td>
                              <td className="p-4 md:min-w-[120px]">
                                {item?.materialWeight
                                  ? item?.materialWeight
                                  : "-"}
                              </td>
                              <td className="p-4 md:min-w-[140px]">
                                {"-"}
                              </td>
                              <td className="p-4 ">-</td>
                              <td className="p-4 truncate max-w-[125px] text-center">
                                {item?.evidence_reference ? item?.evidence_reference : "-"}
                              </td>
                              <td className="py-4 px-2 !leading-[130%] ">
                                <a
                                  className={`px-2 rounded-full text-sm py-1 inline-flex ${
                                    item.status?.includes("Fully")
                                      ? "text-emerald-700 bg-emerald-50"
                                      : item.status?.includes("Partially")
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
        </div>
        {modalOpen && (
          <MaterialTransaction modalObj={modalObj} setOpen={setModalOpen} />
        )}
      </div>
    </Layout>
  );
};

// export default CertMaterial
export default withAuth(CertMaterial);
const LoaderStateComponent = ({
  showLoaderModal
}) => {
  return (
    <div
      className={`${
        !showLoaderModal ? "hidden" : ""
      } transition-all w-full h-full top-0  ease-in-out duration-500 flex justify-center items-center   absolute   z-[2] `}
    >
      <BlackSpinner width={70} height={70} />
    </div>
  );
};
