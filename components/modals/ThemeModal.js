import React, { useEffect, useState } from "react";
import Heading from "../reusableUi/Heading";
import ButtonPrimary from "../reusableUi/ButtonPrimary";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelected,
  setSelected2,
  setThemeChange,
} from "@/redux-setup/DataSlice";
import Image from "next/image";
const ThemeModal = ({ modal, setModal }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedFrame, setSelectedFrame] = useState(0);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === "dark") {
      setSelectedFrame(1);
      return;
    } else {
      setSelectedFrame(0);
      return;
    }
  }, [theme]);
  const dispatch = useDispatch();
  const { selected, selected2, themeChange } = useSelector(
    ({ dataSlice }) => dataSlice
  );
  if (!mounted) return null;
  let frames = [
    {
      title: "Eclipse",
      title2: "Mix of dark & white theme",
      img: "https://tuk-cdn.s3.amazonaws.com/can-uploader/eclipse2.png",
    },
    {
      title: "Nightfall",
      title2: "Dark theme",
      img: "https://tuk-cdn.s3.amazonaws.com/can-uploader/nighfall.png",
    },
  ];
  function handleFrames(name, id) {
    setSelectedFrame(id);
    switch (name) {
      case "Eclipse":
        setTheme("emerald");
        break;
      case "Nightfall":
        setTheme("dark");
        break;
    }
  }
  let colors = [
    {
      label: "Flat Colors",
      colors: [
        {
          name: "emerald",
          color: "#047857",
        },
        {
          name: "blue",
          color: "#1D58FE",
        },

        {
          name: "purple",
          color: "#581C87",
        },
        //
        {
          name: "orange",
          color: "#FF8E6C",
        },
      ],
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
        className={`bg-summary-cards fixed inset-0 h-full max-h-[840px] max-w-[596px] transition-all duration-700 ease-in-out z-[200] m-auto ${
          modal ? "mr-0" : "mr-[-100%]"
        } w-full pt-4 pb-5 px-6 overflow-y-auto min-h-screen flex flex-col justify-between `}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <Heading
              text={"Appearance"}
              extendClass={"text-2xl !leading-none "}
            />
            <svg
              className="svg-theme cursor-pointer"
              onClick={() => {
                setModal(false);
              }}
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.375 14.375L5.625 5.625"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.375 5.625L5.625 14.375"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* <div className="flex gap-4 pt-8 pb-4 border-navborder cursor-pointer  border-t ">
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-[20px] leading-[18px] inter-font text-card-heading">
                {" "}
                Color Schemes
              </p>
              <p className=" text-base leading-[18px] inter-font text-card-subheading">
                Choose Light or Dark Scheme.
              </p>
            </div>
          </div> */}
          <div className="flex items-start justify-between border-navborder pb-6 border-b ">
            {/* {frames.map((item, i) => {
              return (
                <div
                  onClick={() => handleFrames(item.title, i)}
                  key={i}
                  className="flex relative flex-col gap-[10px]"
                >
                  <Image
                    width={252}
                    height={276}
                    className={` rounded-[10px] cursor-pointer ${
                      selectedFrame === i ? "border-emerald-600 border-2" : ""
                    }`}
                    src={item.img}
                    alt=""
                  />
                  <div className="flex  flex-col gap-1">
                    <p className="text-sm !leading-none inter-font text-card-heading">
                      {" "}
                      {item.title}
                    </p>
                    <p className=" text-xs !leading-none inter-font text-card-subheading">
                      {item.title2}{" "}
                    </p>
                  </div>
                  {selectedFrame === i && (
                    <img
                      width={24}
                      className="absolute right-2 top-2"
                      height={24}
                      src={`./frametop.svg`}
                    />
                  )}
                </div>
              );
            })} */}
          </div>
          <div className="flex gap-4 pt-[26px] pb-2  ">
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold text-[20px] leading-[18px] inter-font text-card-heading">
                {" "}
                Custom Themes
              </p>
              <p className=" text-base leading-[18px] inter-font text-card-subheading">
                Choose accent color
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 ">
            {colors.map((item, i) => {
              return (
                <div key={i} className="flex flex-col gap-[10px] w-full">
                  <p className="font-semibold text-[20px] leading-[18px] inter-font text-card-heading">
                    {item.label}
                  </p>
                  <div className="p-3  flex gap-3 bg-summary-cards w-full">
                    {item.colors?.map((it, id) => {
                      return (
                        <div
                          onClick={() => {
                            dispatch(setSelected(i));
                            dispatch(setThemeChange(it.name));
                            dispatch(setSelected2(id));
                          }}
                          key={id}
                          className="relative "
                        >
                          {i === selected && id === selected2 && (
                            <svg
                              className="absolute top-2 left-2  "
                              width={20}
                              height={20}
                              viewBox="0 0 81 62"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_134_93062)">
                                <path
                                  d="M29.6575 61.1571C28.4195 61.1571 27.2305 60.6661 26.3525 59.7881L1.3695 34.8081C-0.4565 32.9831 -0.4565 30.0231 1.3695 28.1971C3.1945 26.3711 6.1555 26.3701 7.9805 28.1971L29.4655 49.6781L72.4255 1.56111C74.1445 -0.362893 77.0995 -0.532893 79.0265 1.18711C80.9525 2.90711 81.1205 5.86211 79.4005 7.78811L33.1445 59.5951C32.2885 60.5541 31.0745 61.1181 29.7895 61.1551C29.7455 61.1561 29.7015 61.1571 29.6575 61.1571Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_134_93062">
                                  <rect
                                    width="80.588"
                                    height="61.158"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          )}
                          {!item.label.includes("Tones") ? (
                            <hr
                              style={{
                                backgroundImage: `${it.color}`,
                                backgroundColor: `${it.color}`,
                              }}
                              className={` cursor-pointer w-[35px] h-[35px] rounded-full`}
                            />
                          ) : (
                            <div className="flex">
                              <hr
                                style={{ backgroundColor: `${it.fill1}` }}
                                className={` cursor-pointer w-[18px] h-[37px] rounded-l-full`}
                              />
                              <hr
                                style={{ backgroundColor: `${it.fill2}` }}
                                className={` cursor-pointer w-[18px] h-[37px] rounded-r-full`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4  justify-end ">
          <ButtonPrimary
            handleClick={() => {
              setModal(false);
            }}
            btnSecondary={true}
            padding={`py-3 px-6`}
            label="Cancel"
          />
          <ButtonPrimary
            handleClick={() => {
              setModal(false);
              setTheme(themeChange);
            }}
            padding={`py-3 px-6`}
            label="Apply"
          />
        </div>
      </div>
    </>
  );
};
export default ThemeModal;
