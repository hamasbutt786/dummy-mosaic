import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import useBusinessEntity from "@/hooks/useBusinessEntity";
import { useGetSummaryQuery } from "@/redux-setup/api/data";
import { getTitle } from "@/utils/functions";
import { externalTooltipHandler } from "@/utils/helper";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import Viewall from "../components/modals/Viewall";
import CircularProgressBar from "../components/summary/summarycircularbar";
import Line from "../components/summary/summarylinechatsingle";
// const Viewall = dynamic(() => import("../components/modals/Viewall"), {
//   ssr: false,
// });

// const Header = dynamic(() => import("../components/header"), { ssr: false });
// const Layout = dynamic(() => import("../components/layout"), { ssr: false });


const Dotsmap = dynamic(() => import("../components/charts/Dotsmap"), {
  ssr: false,
});
const summary = () => {
  const businessId = useBusinessEntity();
  //Summary Percentage
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearStartDate = new Date(currentYear, 0, 1);
  const formattedStartDate = yearStartDate.toLocaleDateString("en-CA");
  const yearEndDate = new Date(currentYear, 11, 31);

  const formattedEndDate = yearEndDate.toLocaleDateString("en-CA");

  const params = {
    startDate: "2021-01-11",
    endDate: "2024-01-11",
  };

  const { data: SummaryPageData, isLoading } = useGetSummaryQuery(
    businessId === null ? skipToken : { params, businessId }
  );
  const [year, setYear] = useState([]);
  const [yearValue, setYearValue] = useState([]);
  const [yearValue2, setYearValue2] = useState([]);
  const [DotsmapData, setDotsmapData] = useState([]);
  const [materialGroupPercentage, setMaterialGroupPercentage] = useState([
    // "Cellulosics",
    // "Cotton",
    // "Down",
    // "Elastane, Spandex & Lycra",
    // "Leather & Suede",
    // "Nylon",
    // "Other Synthetics",
    // "Polyester",
    // "Wool",
    // "PVC",
    // "Linen",
    // "Viscose",
    // "Leather"
  ]);
  //calculate percentage per year
  const filterData2022 =
    SummaryPageData?.timeline == undefined
      ? []
      : Object.values(SummaryPageData?.timeline)
        ?.map?.((item) => {
          return item.previousYear;
        })
        .filter((item) => item !== undefined)
        .flat();

  const filterData2023 =
    SummaryPageData?.timeline == undefined
      ? []
      : Object.values(SummaryPageData?.timeline)
        ?.map?.((item) => {
          return item.currentYear;
        })
        .filter((item) => item !== undefined)
        .flat();

  useEffect(() => {
    if (SummaryPageData == undefined) return;
    let yearKey =
      SummaryPageData?.yearOnYearProgress === undefined
        ? []
        : Object.keys(SummaryPageData?.yearOnYearProgress).map((it) => parseInt(it));
    let yearValue =
      SummaryPageData?.yearOnYearProgress === undefined
        ? []
        : Object.values(SummaryPageData?.yearOnYearProgress).map((it) => parseInt(it));
    let yearValue2 =
      SummaryPageData?.yearOnYearProgress === undefined
        ? []
        : Object.values(SummaryPageData?.yearOnYearProgress).map((it) => parseInt(it));
    setYear(yearKey);
    setYearValue(yearValue);
    setYearValue2(yearValue2[0]);
    // setDotsmapData(SummaryPageData?.supplyChainFacilities);
  }, [SummaryPageData]);
  // temporary
  const [modal, setModal] = useState(false);
  const { theme } = useTheme();
  const [fills, setFills] = useState("#047857");
  const [fills2, setFills2] = useState({
    border: "#059669",
    rgba: "rgba(5, 150, 105, 0.1)",
    trail: "#E2E8F0",
    mapInsider: "#d9d9d9",
    text: "#1E293B",
  });
  let StatusesKeys =
    SummaryPageData?.statusPercentages === undefined
      ? []
      : Object.keys(SummaryPageData?.statusPercentages);
  // console.log({ StatusesKeys })
  function pieUndefinedData() {
    return StatusesKeys.some((val) => parseFloat(SummaryPageData?.statusPercentages[val]) === 0);
  }
  // let StatusesValues = ['0', '0', '0']
  let StatusesValues =
    SummaryPageData === undefined
      ? []
      : (Object.values(SummaryPageData?.statusPercentages)).map((val) => parseInt(val));
  const data = {
    labels: StatusesKeys,
    datasets: [
      {
        borderWidth: 0,
        data: StatusesValues.map((it) => it),
        backgroundColor: ["#34D399", "#F87171", "#FBBF24"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
    },
  };
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
        setFills("#059669");
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

  let newObj = SummaryPageData?.coreMaterials === undefined ? {} : SummaryPageData?.coreMaterials

  // function h() {
  //   for (const key in newObj) {
  //     return key
  //   }
  // }
  return (
    <>
      <Viewall modal={modal} setModal={setModal} />
      <Layout nav={true}>
        <Header title={"Logo"} />
        {getTitle(
          "Summary | Mosaica -  Business Intelligence for Corporate Responsibility"
        )}
        <div className="w-full flex justify-center">
          <div className="flex flex-col space-y-7  w-full  m-7  max-w-[1124px]">
            <div
              className={`inline-flex md:min-h-[194px] md:max-h-[194px] flex-col gap-4 items-start justify-between px-6 ${fills === "#1E40AF"
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
              <div className="inline-flex space-x-1 items-center justify-start ">
                <p className="text-xl font-semibold leading-tight text-card-heading ">
                  Welcome Back!
                </p>

                {/* <Image
                  width="0"
                  height="0"
                  style={{ imageRendering: "optimizeQuality" }}
                  className="w-6 h-full"
                  alt="wavehand"
                  src="/images/wavehand.svg"
                /> */}
              </div>
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
                      Facilities with Expired Certifications are up by 5% (16
                      Facilities)
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
                      End-of-Year Responsible Materials Forecast has increased
                      from 62% to 68%
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
            <div className="flex w-full  md:gap-2 lg:gap-7  max-w-[1124px] ">
              <div
                className={`bg-summary-cards border w-full border-navborder rounded-lg py-5 px-6`}
              >
                <div className="flex flex-col gap-2 ">
                  <p className="text-lg font-medium text-card-heading leading-none inter-font">
                    Year to Date Perfomance
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm">
                    Verified Responsible Materials
                  </p>
                </div>
                <div>
                  <div className="my-8 flex justify-center">
                    <CircularProgressBar
                      themeColor={fills}
                      trail={fills2.trail}
                      text={fills2.text}
                      percentageVerification={Math.round(yearValue2)}
                    />
                  </div>

                  <div className="flex">
                    <div className="flex justify-between w-full">
                      <div className="flex items-center text-xs leading-none font-normal  gap-2">
                        <hr className="bg-slate-200 rounded-full w-2 h-2 "></hr>
                        Conventional
                      </div>
                      <div className="flex items-center text-xs leading-none font-normal  gap-2">
                        <hr
                          style={{ backgroundColor: fills }}
                          className="rounded-full w-2 h-2 "
                        ></hr>
                        Verified Responsible
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-summary-cards border w-full border-navborder rounded-lg py-5 px-6">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium text-card-heading leading-none inter-font">
                    End of Year Forecast
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm ">
                    EoY Forecast Verified Responsible
                  </p>
                </div>
                <div>
                  <div className="my-8 flex justify-center">
                    <CircularProgressBar
                      themeColor={fills}
                      trail={fills2.trail}
                      text={fills2.text}
                      percentageVerification={Math.round(yearValue2)}

                    />
                  </div>

                  <div className="flex">
                    <div className="flex justify-between w-full">
                      <div className="flex items-center text-xs leading-none font-normal  gap-2">
                        <hr className="bg-slate-200 rounded-full w-2 h-2 "></hr>
                        Conventional
                      </div>
                      <div className="flex items-center text-xs leading-none font-normal  gap-2">
                        <hr
                          style={{ backgroundColor: fills }}
                          className=" rounded-full w-2 h-2 "
                        ></hr>
                        Verified Responsible
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-summary-cards border w-full h-full flex flex-col md:hidden lg:flex justify-between  border-navborder rounded-lg py-5 px-2">
                <div className="flex flex-col gap-2 px-4">
                  <p className="text-lg font-medium text-card-heading leading-none inter-font">
                    Year-On-Year Progress
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm">
                    EoY Actual Verified Responsible
                  </p>
                </div>

                <div className="pt-7 ">
                  <Line
                    year={year}
                    yearValue={yearValue}
                    theme={fills2}
                  />
                </div>
              </div>
            </div>
            <div className="bg-summary-cards border w-full h-full flex flex-col md:flex lg:hidden justify-between border-navborder rounded-lg py-5 px-2">
              <div className="flex flex-col gap-2 px-4">
                <p className="text-lg font-medium text-card-heading leading-none inter-font">
                  Year-On-Year Progress
                </p>
                <p className="font-normal text-card-subheading leading-none text-sm">
                  EoY Actual Verified Responsible
                </p>
              </div>

              <div className="pt-7">
                <Line year={year} yearValue={yearValue} theme={fills2} />
              </div>
            </div>
            <div className="flex xl:flex-row flex-col gap-7 w-full">
              <div className="bg-summary-cards border w-full  xl:max-w-[548px] border-navborder rounded-lg py-5 px-6">
                <div className="flex flex-col gap-2 mb-6">
                  <p className="text-lg font-semibold text-card-heading inter-font">
                    Timeline
                  </p>
                  <div className="flex justify-between items-center gap-2 mb-6">
                    <p className="font-normal text-card-subheading leading-none text-sm inter-font">
                      % Verified Materials
                    </p>
                    <div className="flex  items-center gap-4 justify-end w-full max-w-[246px]">
                      <div className="flex gap-2 items-center  ">
                        <p className="rounded-[50px] bg-[#38BDF8] h-3 w-3"></p>
                        <p className="text-xs !leading-none inter-font font-normal">
                          Current Year
                        </p>
                      </div>
                      <div className="flex gap-2 items-center  ">
                        <p className="rounded-[50px] bg-[#F67E6D] h-3 w-3"></p>
                        <p className="text-xs !leading-none inter-font font-normal">
                          Last Year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <LineChart
                  filterData2023={filterData2023}
                  filterData2022={filterData2022}
                />
              </div>
              {/* Temporary comment */}
              <div className=" bg-summary-cards border w-full  h-full xl:max-w-[548px] border-navborder rounded-lg py-5 px-6">
                <div className="flex flex-col gap-2 mb-7">
                  <p className="text-lg font-semibold text-card-heading inter-font">
                    Supply Chain Facilities
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm inter-font">
                    High Priority
                  </p>
                </div>
                <Dotsmap
                  DotsmapData={DotsmapData}
                  theme={fills}
                  compName={"summary"}
                  mapInsider={fills2.mapInsider}
                />
              </div>
            </div>
            <div className="flex gap-7 w-full">
              <div className="bg-summary-cards border w-full overflow-auto  h-[368px]  max-w-[548px] border-navborder rounded-lg pt-5 pb-[26px] px-6">
                <div className="flex flex-col gap-2 mb-5 ">
                  <p className="text-lg font-semibold text-card-heading inter-font ">
                    Core Materials
                  </p>
                  <p className="font-normal text-card-subheading leading-none text-sm inter-font">
                    % Verified Responsible
                  </p>
                </div>
                {
                  SummaryPageData === undefined || !SummaryPageData?.coreMaterials ?
                    <div className="w-full text-black text-lg h-full max-h-[250px] flex justify-center items-center">
                      No Data To Show
                    </div>
                    :
                    Object.keys(SummaryPageData?.coreMaterials)?.map((it, i) => {
                      if (SummaryPageData === undefined) {
                        return
                      };
                      return (
                        <div key={i} className={`flex flex-col gap-4 `}>
                          <div
                            className={`flex justify-between h-full max-h-[16px] ${i !== 0 ? "mt-4" : ""
                              } `}
                          >
                            <p
                              className={`text-base  font-medium text-card-heading inter-font`}
                            >
                              {it}
                            </p>
                            <p className="font-semibold text-card-heading leading-[16px] text-base inter-font">
                              {SummaryPageData?.coreMaterials[it] === undefined
                                ? 0
                                : Math.round(SummaryPageData?.coreMaterials[it])}
                              %
                            </p>
                          </div>

                          <div className={`w-full  rounded-full h-2  `}>
                            <div
                              className={` rounded-full h-1.5 mt-[1px]`}
                              style={{
                                width: `${SummaryPageData?.coreMaterials[it] === undefined
                                  ? 0
                                  : SummaryPageData?.coreMaterials[it]
                                  }%`,
                                backgroundColor: `${it == "Cotton"
                                  ? "#F87171"
                                  : it == "Cellulosics"
                                    ? "#34D399"
                                    : it == "Wool"
                                      ? "#FBBF24"
                                      : it == "Nylon"
                                        ? "#FF8E6C"
                                        : "#2dd4bf"
                                  }`,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div className=" bg-summary-cards border w-full  h-[368px]  max-w-[548px] border-navborder rounded-lg pt-5 px-6">
                <div className="flex flex-col gap-2 ">
                  <p className="text-lg font-semibold text-card-heading inter-font">
                    Facilities by Certification Status
                  </p>
                </div>
                {StatusesValues.length > 0 && StatusesValues.some((it) => it !== 0) ? (
                  <>
                    <div className="w-[226px] h-[226px] mx-auto">
                      <PieChart data={data} options={options} />
                    </div>
                    <div className="flex flex-col gap-2 mt-5">
                      <div className="flex justify-between gap-2">
                        <div className="flex gap-2 items-center w-1/2 ">
                          <p className="rounded-[50px] bg-[#34D399] h-3 w-3"></p>
                          <p className="text-xs !leading-none inter-font">
                            Certified
                          </p>
                        </div>
                        <div className="flex gap-2 items-center  w-1/2 ">
                          <p className="rounded-[50px] bg-[#FBBF24] h-3 w-3"></p>
                          <p className="text-xs !leading-none inter-font">
                            Awaiting Recertification
                          </p>
                        </div>
                      </div>
                      <div className="flex  justify-between gap-2 ">
                        <div className="flex gap-2 items-center w-1/2 ">
                          <p className="rounded-[50px] bg-[#F87171] h-3 w-3"></p>
                          <p className="text-xs !leading-none inter-font">
                            Certification Expired
                          </p>
                        </div>
                        <div className="flex gap-2 items-center  w-1/2 "></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full text-black text-lg h-full max-h-[280px] flex justify-center items-center">
                    No Data To Show
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default summary;
