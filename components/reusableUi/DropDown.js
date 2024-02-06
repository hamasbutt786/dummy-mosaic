// Use This Kind of Array for the dropdown
// const [Array, setArray] = useState({
//   1: { tog: false, data: [] },
// });

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
function Dropdown({
  label,
  width,
  options,
  index,
  setOpenDD,
  openDD,
  selected,
  handleSelectFun,
  multiselect,
  handloutsideClick,
}) {
  const handleDropdownClick = (dropdownIndex) => {
    // Create a copy of the dropdownStates array and toggle the state for the clicked dropdown
    let newDropdownStates = { ...openDD };
    if (newDropdownStates === undefined) return;
    newDropdownStates[dropdownIndex].tog =
      !newDropdownStates[dropdownIndex]?.tog;
    // Set the updated dropdownStates array as the new state

    // Close all other dropdowns
    for (let i = 1; i <= Object.keys(newDropdownStates).length; i++) {
      if (i !== dropdownIndex) {
        if (newDropdownStates[i]?.tog) {
          newDropdownStates[i].tog = false;
        }
      }
    }
    // Set the updated dropdownStates array as the new state
    setOpenDD(newDropdownStates);
  };
  function handleCheckboxChange(item, index) {
    let newDropdownStates = { ...openDD };
    // for multiple select

    if (!multiselect) {
      newDropdownStates[index].data = newDropdownStates[index].data.includes(
        item
      )
        ? [...newDropdownStates[index].data.filter((it) => it !== item)]
        : [item];
      setOpenDD(newDropdownStates);
    } else {
      newDropdownStates[index].data = newDropdownStates[index].data.includes(
        item
      )
        ? [...newDropdownStates[index].data.filter((it) => it !== item)]
        : [...newDropdownStates[index].data, item];
      setOpenDD(newDropdownStates);
    }

    if (selected) {
      handleSelectFun();
    }
  }
  return (
    <>
      <div
        onClick={() => {
          if (handloutsideClick === undefined) return;
          handloutsideClick();
        }}
        className=" fixed inset-0 h-full w-full -z-[20] m-auto "
      ></div>

      <div
        className={`${
          width ? width : `w-full lg:max-w-full md:max-w-[200px] `
        } flex flex-col gap-1  `}
      >
        {label && (
          <p className="md:text-sm px-1 !leading-none inter-font text-card-heading mb-2">
            {label}:
          </p>
        )}
        <div
          onClick={() => handleDropdownClick(index)}
          className={`flex border font-normal text-card-subheading !leading-none  cursor-pointer capitalize items-center lg:pr-3 md:px-2 lg:pl-4 py-4 w-full h-full max-h-[48px] border-navborder rounded-lg  justify-between text-left  bg-transparent`}
        >
          <span className="lg:text-sm md:text-xs md:truncate">
            {openDD[index]?.data?.length
              ? openDD[index]?.data[0]
              : "Select An Option"}
          </span>
          <svg
            className={`${
              openDD[index]?.tog && "rotate-180 "
            } transition-all ease-in-out duration-300`}
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_451_8017)">
              <path
                d="M13.031 12.95L17.981 8L19.395 9.414L13.031 15.778L6.66699 9.414L8.08099 8L13.031 12.95Z"
                fill="#475569"
              />
            </g>
            <defs>
              <clipPath id="clip0_451_8017">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="translate(0.666992)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>

        {openDD[index]?.tog && (
          <div className="bg-dropdown-bg dd-shadow overflow-y-auto max-h-[160px] z-[10] rounded-lg transition-all lg:w-full ease-in-out duration-300 ">
            {options?.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    openDD[index].data.includes(item.title) &&
                    "bg-selecteddropdown"
                  }  space-y-5  flex w-full  items-center flex-col`}
                >
                  <div
                    onClick={() => handleCheckboxChange(item.title, index)}
                    className="flex cursor-pointer items-center lg:px-4 md:px-2 pt-[18px] pb-[14px] w-full gap-2 "
                  >
                    <input
                      type="checkbox"
                      className="checkbox-tag w-4 h-4 "
                      checked={openDD[index].data.includes(item.title)}
                      onChange={(e) => ""}
                    />
                    <p
                      className={`${
                        openDD[index].data.includes(item.title)
                          ? "text-selected-text"
                          : "text-card-subheading"
                      }  lg:text-sm md:text-[8px] font-normal w-full !leading-none  cursor-pointer capitalize`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
