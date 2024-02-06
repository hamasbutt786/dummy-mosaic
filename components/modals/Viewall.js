import React, { useState } from "react";
import Heading from "../reusableUi/Heading";

const Viewall = ({ modal, setModal }) => {
  const dataTab = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Recent",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const tabd = [
    {
      id: 1,
      title:
        "Urgently Awaited Transaction Certificates are up by 6% (92 Transactions)",
      day: "Yesterday",
      svg: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_462_10749)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.18414 12.6323C3.94527 12.4026 3.93782 12.0228 4.1675 11.7839L7.5675 8.18394C7.68062 8.06629 7.83679 7.9998 8 7.9998C8.16321 7.9998 8.31938 8.06629 8.4325 8.18394L11.8325 11.7839C12.0622 12.0228 12.0547 12.4026 11.8159 12.6323C11.577 12.862 11.1972 12.8545 10.9675 12.6157L8 9.46547L5.0325 12.6157C4.80282 12.8545 4.423 12.862 4.18414 12.6323ZM4.18414 7.8323C3.94527 7.60263 3.93782 7.2228 4.1675 6.98394L7.5675 3.38394C7.68062 3.26629 7.83679 3.1998 8 3.1998C8.16321 3.1998 8.31938 3.26629 8.4325 3.38394L11.8325 6.98394C12.0622 7.2228 12.0547 7.60263 11.8159 7.8323C11.577 8.06198 11.1972 8.05453 10.9675 7.81567L8 4.66547L5.0325 7.81567C4.80282 8.05453 4.423 8.06198 4.18414 7.8323Z"
              fill="#DC2626"
            />
          </g>
          <defs>
            <clipPath id="clip0_462_10749">
              <rect width={16} height={16} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 1,
      title:
        "End-of-Year Responsible Materials Forecast has increased from 62% to 68%",
      day: "Today",
      svg: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0889 3.4687C10.1731 3.13147 10.4959 2.93134 10.81 3.0217L14.5636 4.10149C14.7144 4.14489 14.843 4.25084 14.9211 4.39603C14.9992 4.54123 15.0204 4.71378 14.9799 4.87572L13.9742 8.90558C13.89 9.24282 13.5671 9.44295 13.253 9.35258C12.9389 9.26222 12.7525 8.91559 12.8367 8.57835L13.4722 6.03201C11.7009 7.20374 10.2279 8.70441 9.08124 10.4173C8.9804 10.5679 8.82303 10.6634 8.65081 10.6784C8.4786 10.6934 8.30893 10.6265 8.18676 10.4953L5.71049 7.83676L2.00516 11.8148C1.77522 12.0617 1.4024 12.0617 1.17246 11.8148C0.942514 11.568 0.942514 11.1677 1.17246 10.9208L5.29414 6.49575C5.52408 6.24888 5.8969 6.24888 6.12684 6.49575L8.53987 9.08641C9.71824 7.47418 11.1773 6.05823 12.8934 4.92993L10.5052 4.24293C10.1911 4.15257 10.0047 3.80593 10.0889 3.4687Z"
            fill="#059669"
          />
        </svg>
      ),
    },
  ];
  return (
    <>
      <div
        onClick={() => {
          setModal(false);
        }}
        className={`${
          modal ? "z-[100] opacity-1 visible " : "invisible opacity-0 z-0 "
        } fixed inset-0 w-full h-full transform p-4 transition-all duration-500 ease-in-out bg-zinc-600 bg-opacity-80`}
      ></div>

      <div
        className={`bg-summary-cards fixed inset-0 h-full max-w-[503px] transition-all duration-700 ease-in-out z-[200] m-auto ${
          modal ? "mr-0" : "mr-[-100%]"
        } w-full p-6 overflow-y-auto min-h-screen flex flex-col gap-4`}
      >
        <div className="w-full flex justify-between">
          <Heading text={"High Priority Items"} extendClass={"text-lg "} />
          <svg
            onClick={() => {
              setModal(false);
            }}
            className="cursor-pointer"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.375 14.375L5.625 5.625"
              stroke="#475569"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.375 5.625L5.625 14.375"
              stroke="#475569"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex gap-4 border-navborder cursor-pointer h-full max-h-[58px] border-t border-b">
          {dataTab.map((item, i) => {
            return (
              <div
                onClick={() => setActiveTab(i)}
                key={i}
                className={`${
                  i === activeTab
                    ? "border-emerald-700 font-semibold relative -bottom-[1.5px] text-emerald-700 text-[18px] border-b-2"
                    : ""
                } px-6 py-5  transition-all ease-in-out`}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 items-center">
          {tabd.map((item, i) => {
            return (
              <div
                key={i}
                className={`${
                  item.day == "Today" ? "bg-emerald-50" : "bg-red-50"
                }   w-full p-4 flex gap-2 rounded-md`}
              >
                <div>{item.svg}</div>
                <div className="break-words text-xs font-normal leading-[130%] text-slate-800">
                  {item.title}
                </div>
                <div className="break-words text-xs font-normal leading-[130%] text-slate-800">
                  {item.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Viewall;
