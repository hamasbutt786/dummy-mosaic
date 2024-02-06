import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setHamburger, setShowDropdown } from "@/redux-setup/DataSlice";
import { useTheme } from "next-themes";
const Navigation = ({ nav }) => {
  const router = useRouter();
  const { showDropdown: DropDownState, hamburger } = useSelector(
    ({ dataSlice }) => dataSlice
  );
  const [sideBar, setsideBar] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [fills, setFills] = useState("true");
  const routes = [
    {
      id: 1,
      svg: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_936_3830)">
            <path
              d="M4 5H6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 4V6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.5 4L11 6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 5H20"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 4V6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9L14 10"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 13L20 12.5"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 19H20"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 18V20"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.9996 16.518L7.4816 10L3.0916 19.58C3.00667 19.766 2.98061 19.9735 3.01692 20.1747C3.05323 20.376 3.15017 20.5613 3.29475 20.7058C3.43933 20.8504 3.62465 20.9474 3.82587 20.9837C4.02709 21.02 4.2346 20.9939 4.4206 20.909L13.9996 16.518Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_936_3830">
              <rect width={24} height={24} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: `/welcome`,
      linkName: `Welcome`,
    },
    // {
    //   id: 2,
    //   svg: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="icon icon-tabler icon-tabler-users-group"
    //       width={20}
    //       height={20}
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="#CBD5E1"
    //       fill="none"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //       <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    //       <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
    //       <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    //       <path d="M17 10h2a2 2 0 0 1 2 2v1" />
    //       <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    //       <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
    //     </svg>
    //   ),
    //   link: `/userManagement`,
    //   linkName: `User Management`,
    // },
    {
      id: 3,
      svg: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_936_3849)">
            <path
              d="M4.16667 10H2.5L10 2.5L17.5 10H15.8333"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16699 10V15.8333C4.16699 16.2754 4.34259 16.6993 4.65515 17.0118C4.96771 17.3244 5.39163 17.5 5.83366 17.5H14.167C14.609 17.5 15.0329 17.3244 15.3455 17.0118C15.6581 16.6993 15.8337 16.2754 15.8337 15.8333V10"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 17.4997V12.4997C7.5 12.0576 7.6756 11.6337 7.98816 11.3212C8.30072 11.0086 8.72464 10.833 9.16667 10.833H10.8333C11.2754 10.833 11.6993 11.0086 12.0118 11.3212C12.3244 11.6337 12.5 12.0576 12.5 12.4997V17.4997"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_936_3849">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: `/summary`,
      linkName: `Summary`,
    },

    {
      id: 4,
      svg: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_936_3857)">
            <path
              d="M3.33301 17.5C4.28884 14.15 4.98551 10.8108 4.99967 7.5H9.99967C10.0138 10.8108 10.7105 14.15 11.6663 17.5"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.417 10.833H14.167C14.1878 13.0097 14.912 15.2463 15.8337 17.4997"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 4.16678C7.68931 3.90304 7.93998 3.68934 8.23035 3.54415C8.52073 3.39896 8.84209 3.32665 9.16667 3.33345C9.49125 3.32665 9.8126 3.39896 10.103 3.54415C10.3934 3.68934 10.644 3.90304 10.8333 4.16678C11.0226 4.43052 11.2733 4.64422 11.5637 4.78941C11.8541 4.93459 12.1754 5.00691 12.5 5.00011C12.8246 5.00691 13.1459 4.93459 13.4363 4.78941C13.7267 4.64422 13.9774 4.43052 14.1667 4.16678C14.356 3.90304 14.6066 3.68934 14.897 3.54415C15.1874 3.39896 15.5088 3.32665 15.8333 3.33345C16.1579 3.32665 16.4793 3.39896 16.7696 3.54415C17.06 3.68934 17.3107 3.90304 17.5 4.16678"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 17.5H18.3333"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_936_3857">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: `/raw-material`,
      linkName: `Raw Materials`,
    },

    {
      id: 5,
      svg: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_936_3867)">
            <path
              d="M12.5 15C13.8807 15 15 13.8807 15 12.5C15 11.1193 13.8807 10 12.5 10C11.1193 10 10 11.1193 10 12.5C10 13.8807 11.1193 15 12.5 15Z"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.833 14.583V18.333L12.4997 17.083L14.1663 18.333V14.583"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.33333 15.8337H4.16667C3.72464 15.8337 3.30072 15.6581 2.98816 15.3455C2.67559 15.0329 2.5 14.609 2.5 14.167V5.83366C2.5 4.91699 3.25 4.16699 4.16667 4.16699H15.8333C16.2754 4.16699 16.6993 4.34259 17.0118 4.65515C17.3244 4.96771 17.5 5.39163 17.5 5.83366V14.167C17.4997 14.4593 17.4225 14.7463 17.2763 14.9994C17.13 15.2524 16.9198 15.4625 16.6667 15.6087"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 7.5H15"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 10H7.5"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12.5H6.66667"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_936_3867">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: ``,
      linkName: `Verified Materials`,
      nestedLinks: [
        {
          link: `material-transactions`,
          linkName: `Material Transactions`,
        },
        {
          link: `scope-certificates`,
          linkName: `Scope Certificates`,
        },
        {
          link: `bccu-reports`,
          linkName: `BCCU Reports`,
        },
      ],
    },

    {
      id: 6,
      svg: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_936_3888)">
            <path
              d="M9.02301 8.18974C9.48929 7.7236 9.80685 7.12966 9.93555 6.48303C10.0643 5.8364 9.9983 5.16612 9.74604 4.55698C9.49378 3.94783 9.06653 3.42718 8.51835 3.06086C7.97016 2.69455 7.32566 2.49902 6.66634 2.49902C6.00703 2.49902 5.36252 2.69455 4.81434 3.06086C4.26615 3.42718 3.83891 3.94783 3.58665 4.55698C3.33439 5.16612 3.26843 5.8364 3.39713 6.48303C3.52583 7.12966 3.8434 7.7236 4.30968 8.18974L6.66634 10.5472L9.02301 8.18974Z"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66699 5.83301V5.84134"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.69 14.8567C16.1563 14.3906 16.4738 13.7967 16.6025 13.15C16.7312 12.5034 16.6653 11.8331 16.413 11.224C16.1608 10.6148 15.7335 10.0942 15.1853 9.72785C14.6372 9.36154 13.9926 9.16602 13.3333 9.16602C12.674 9.16602 12.0295 9.36154 11.4813 9.72785C10.9331 10.0942 10.5059 10.6148 10.2536 11.224C10.0014 11.8331 9.93543 12.5034 10.0641 13.15C10.1928 13.7967 10.5104 14.3906 10.9767 14.8567L13.3333 17.2142L15.69 14.8567Z"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.333 12.5V12.5083"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_936_3888">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: `/supplier-map`,
      linkName: `Supplier Map`,
    },
  ];
  useEffect(() => {
    let fill = theme === "emerald" || theme === "dark" ? "true" : "false";
    setFills(fill);
  }, [theme]);

  return (
    <div className="h-screen z-30 relative md:block hidden">
      {/* Vertical navigation starts */}
      {nav && (
        <>
          {hamburger == true && (
            <div
              onClick={() => {
                dispatch(setHamburger(!hamburger));
              }}
              className={`${hamburger
                ? "z-[100] opacity-1 visible "
                : "invisible opacity-0 z-0 "
                } fixed inset-0 w-full h-full transform p-4 transition-all md:flex lg:hidden duration-500 ease-in-out bg-zinc-600 bg-opacity-80`}
            ></div>
          )}
          <div
            className={` fixed inset-0 h-full  transition-all duration-700 ease-in-out z-[500] m-auto max-w-[260px] ${hamburger
              ? "md:ml-0"
              : "md:ml-[-100%] lg:ml-0 transition-all duration-700 ease-in-out"
              } w-full overflow-y-auto min-h-screen`}
          >
            <div
              className={`w-[260px] transition-all duration-700 ease-in-out lg:ml-0 fixed sm:fixed border-navborder bg-sidebar-bg lg:border-r sm:h-full flex-col justify-between  lg:flex`}
            >
              <div className="overflow-y-auto">
                <svg
                  onClick={() => dispatch(setHamburger(!hamburger))}
                  className="absolute right-2 top-2 w-6 h-6 cursor-pointer text-white md:flex lg:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>

                <div className="w-full flex justify-start items-center px-4 lg:mt-6 md:mt-4">
                  {" "}
                  {/* h-16 */}
                  <Link href={"/welcome"} >
                    <div className="flex gap-2 items-center ">
                      {fills === "true" ? (
                        <img
                          src="/images/mosaica_notagline_greenwhitetext.webp"
                          alt={"social-media-icon"}
                          width={188}
                          height={86}
                        />
                      ) : (
                        <img
                          src={"/images/navlogo-dark.webp"}
                          alt={"social-media-icon"}
                          width={128}
                          height={36}
                        />
                      )}
                    </div>
                  </Link>
                </div>

                <ul className="mt-7 pl-3 pr-1 space-y-2">
                  {routes.map((item, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <span>
                          {item.id == 1 && (
                            <div className="inline-flex items-start justify-start w-60 p-2">
                              <p className="text-xs font-semibold tracking-wider leading-none inter-font text-sidebar-headings uppercase">
                                LANDING pAGE
                              </p>
                            </div>
                          )}
                          {item.id == 3 && (
                            <div className="inline-flex items-start justify-start w-60 px-2 py-4">
                              <p className="text-xs font-semibold tracking-wider leading-none inter-font text-sidebar-headings uppercase">
                                Raw Materials
                              </p>
                            </div>
                          )}
                          {item.id == 7 && (
                            <div className="inline-flex items-start justify-start w-60 px-2 py-4">
                              <p className="text-xs font-semibold tracking-wider leading-none text-sidebar-headings uppercase">
                                Supplier portal
                              </p>
                            </div>
                          )}
                          <Link href={item.link}>
                            <li
                              onClick={() => {
                                item.id == 5 &&
                                  dispatch(setShowDropdown(!DropDownState));
                              }}
                              className={`${item.link === router.pathname
                                ? "bg-hover-sidebar-bg text-white "
                                : "text-zinc-400 hover:bg-hover-sidebar-bg rounded-lg"
                                } group   rounded-lg  cursor-pointer pl-3 pr-4 py-2 md:hidden lg:block`}
                            >
                              <span className=" flex  flex-row  items-center gap-2">
                                <span className="flex items-center   rounded focus:outline-none  space-x-2">
                                  {item.svg}
                                </span>
                                <span
                                  className={`text-base  ${item.link === router.pathname
                                    ? "text-white"
                                    : "text-sidebar-sub-heads"
                                    } group-hover:text-white whitespace-nowrap leading-none font-normal manrope_font -tracking-[0.015em]`}
                                >
                                  {item.linkName}
                                </span>
                                {item.id == 5 && (
                                  <div className="inline-flex   w-full max-w-[70px] justify-end items-end">
                                    <svg
                                      width={10}
                                      height={6}
                                      className={`${!DropDownState ? "rotate-180" : ""
                                        }`}
                                      viewBox="0 0 10 6"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.99999 2.21834L1.69999 5.51834L0.757324 4.57568L4.99999 0.333008L9.24266 4.57568L8.29999 5.51834L4.99999 2.21834Z"
                                        fill="#CBD5E1"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </span>
                            </li>
                          </Link>
                          <Link href={item.link}>
                            <li
                              onClick={() => {
                                item.id == 5 &&
                                  dispatch(setShowDropdown(!DropDownState));
                                item.id != 5 &&
                                  dispatch(setHamburger(!hamburger));
                              }}
                              className={`${item.link === router.pathname
                                ? "bg-hover-sidebar-bg text-white "
                                : "text-zinc-400 hover:bg-hover-sidebar-bg rounded-lg"
                                } group   rounded-lg  cursor-pointer pl-3 pr-4 py-2 md:block lg:hidden`}
                            >
                              <span className=" flex  flex-row  items-center gap-2">
                                <span className="flex items-center   rounded focus:outline-none  space-x-2">
                                  {item.svg}
                                </span>
                                <span
                                  className={`text-base  ${item.link === router.pathname
                                    ? "text-white"
                                    : "text-sidebar-sub-heads"
                                    } group-hover:text-white whitespace-nowrap  leading-none font-normal manrope_font -tracking-[0.015em]`}
                                >
                                  {item.linkName}
                                </span>
                                {item.id == 5 && (
                                  <div className="inline-flex   w-full max-w-[70px] justify-end items-end">
                                    <svg
                                      width={10}
                                      height={6}
                                      className={`${!DropDownState ? "rotate-180" : ""
                                        }`}
                                      viewBox="0 0 10 6"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.99999 2.21834L1.69999 5.51834L0.757324 4.57568L4.99999 0.333008L9.24266 4.57568L8.29999 5.51834L4.99999 2.21834Z"
                                        fill="#CBD5E1"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </span>
                            </li>
                          </Link>
                        </span>
                        {item.id == 5 && DropDownState && (
                          <div
                            onClick={() => dispatch(setHamburger(!hamburger))}
                            className="w-full  md:hidden lg:flex flex-col mt-3 justify-center "
                          >
                            {item.nestedLinks?.map((l, ind) => {
                              return (
                                <Link
                                  className={`text-sm  px-10 py-3  leading-none cursor-pointer font-normal manrope_font ${router.pathname.includes(l.link)
                                    ? "bg-hover-sidebar-bg text-white rounded-lg"
                                    : "text-sidebar-sub-heads hover:bg-hover-sidebar-bg rounded-lg hover:text-white"
                                    } `}
                                  key={ind}
                                  href={l.link}
                                >
                                  {l.linkName}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {item.id == 5 && DropDownState && (
                          <div
                            onClick={() => {
                              dispatch(setHamburger(!hamburger));
                            }}
                            className="w-full flex flex-col mt-3 justify-center "
                          >
                            {item.nestedLinks?.map((l, ind) => {
                              return (
                                <Link
                                  className={`text-sm md:block lg:hidden  px-10 py-3  leading-none cursor-pointer font-normal manrope_font ${router.pathname.includes(l.link)
                                    ? "bg-hover-sidebar-bg text-white rounded-lg"
                                    : "text-sidebar-sub-heads hover:bg-hover-sidebar-bg rounded-lg hover:text-white"
                                    } `}
                                  key={ind}
                                  href={l.link}
                                >
                                  {l.linkName}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <nav className=" top-0 ...">
        {sideBar && (
          <div
            className={
              sideBar
                ? "fixed w-full h-full transform   -translate-x-full transition duration-500 z-40 lg:hidden"
                : "fixed w-full h-full transform translate-x-0 transition duration-500 z-40 lg:hidden"
            }
          >
            <div className="w-full  z-40 fixed   top-0 bg-white shadow h-full flex-col md:flex justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="h-full ">
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="overflow-y-auto">
                    <div className="w-full flex justify-center items-center px-4 lg:mt-6 md:mt-4">
                      {" "}
                      <Link href={"/"} passHref>
                        <div
                          aria-label="logo"
                          className="flex gap-2 items-center"
                        >
                          <svg
                            width={80}
                            height={64}
                            viewBox="0 0 80 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M68.7558 10.6254C67.3721 11.4158 65.1464 12.001 61.9035 12.427C59.9088 12.6892 56.8331 12.7976 49.2532 12.8731C40.454 12.9608 39.0311 13.0209 37.5312 13.3684C34.2731 14.123 31.5589 15.7317 29.6416 18.0444C28.3329 19.623 28.1404 19.991 26.776 23.5223L25.6723 26.3794L23.6284 26.5282C21.0132 26.7187 19.4795 27.0378 18.134 27.6719C16.0677 28.6456 14.7456 30.4512 14.2511 32.9743C13.9256 34.6348 14.3241 36.1554 15.4221 37.443C16.2657 38.4322 16.5731 38.5549 16.5731 37.9029C16.5731 37.0714 17.1717 36.2803 18.0937 35.8934C18.8656 35.5694 19.8382 35.5 24.7459 35.4196C30.2855 35.3288 30.4887 35.3396 30.3538 35.7199C30.1472 36.3017 29.623 36.8538 28.9076 37.2434C28.425 37.5065 27.4533 37.6144 24.8138 37.698L21.3528 37.8076L20.0518 41.2996C17.3895 48.4456 15.734 50.6959 11.4898 52.9376L10 53.7246L10.8092 53.8588C12.3441 54.1134 18.1677 54.0042 19.9716 53.687C25.7621 52.669 29.9239 49.8333 32.1668 45.3776C32.532 44.6523 33.5623 42.1286 34.4565 39.7693L36.0823 35.4797L42.6149 35.3571C49.8792 35.2206 50.6344 35.0991 53.7672 33.5621C56.6054 32.1693 59.5468 29.4439 60.7663 27.0767L61.0709 26.4852H50.3129C42.3195 26.4852 39.5546 26.4224 39.5546 26.2408C39.5546 26.1064 39.9358 25.6323 40.4017 25.1875C41.6455 23.9998 42.7245 23.7676 47.6719 23.6227C52.2066 23.49 55.1792 23.1408 57.6159 22.4544C62.9704 20.9463 66.6624 18.2038 68.6204 14.2801C69.285 12.9483 70.2169 9.95936 69.9546 10.0004C69.8751 10.0129 69.3356 10.2942 68.7558 10.6254ZM20.9931 29.6504C21.4985 29.9715 21.017 30.9744 20.1538 31.3992C18.6372 32.1452 17.9149 31.2432 19.087 30.0667C19.7072 29.4441 20.422 29.2879 20.9931 29.6504Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>

                    <ul className="mt-7 px-4 space-y-2">
                      <Link href={"/"} passHref>
                        <li className="max-w-[228px] hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_121)">
                                <path
                                  d="M8.59663 6H7.40329C6.99644 6 6.66663 6.32982 6.66663 6.73667V13.2633C6.66663 13.6702 6.99644 14 7.40329 14H8.59663C9.00348 14 9.33329 13.6702 9.33329 13.2633V6.73667C9.33329 6.32982 9.00348 6 8.59663 6Z"
                                  stroke="white"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.2634 2H12.07C11.6632 2 11.3334 2.32982 11.3334 2.73667V13.2633C11.3334 13.6702 11.6632 14 12.07 14H13.2634C13.6702 14 14 13.6702 14 13.2633V2.73667C14 2.32982 13.6702 2 13.2634 2Z"
                                  stroke="white"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.33333 13.9999C4.06971 13.9999 4.66667 13.403 4.66667 12.6666C4.66667 11.9302 4.06971 11.3333 3.33333 11.3333C2.59695 11.3333 2 11.9302 2 12.6666C2 13.403 2.59695 13.9999 3.33333 13.9999Z"
                                  stroke="white"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_121">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal whitespace-nowrap manrope_font -tracking-[0.015em]">
                              Analytics
                            </span>
                          </span>
                        </li>
                      </Link>

                      <Link href={"/"} passHref>
                        <li className="max-w-[228px]  hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_129)">
                                <path
                                  d="M10 3.33325V4.66659"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 7.33325V8.66659"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 11.3333V12.6666"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.33333 3.33325H12.6667C13.0203 3.33325 13.3594 3.47373 13.6095 3.72378C13.8595 3.97382 14 4.31296 14 4.66659V6.66659C13.6464 6.66659 13.3072 6.80706 13.0572 7.05711C12.8071 7.30716 12.6667 7.6463 12.6667 7.99992C12.6667 8.35354 12.8071 8.69268 13.0572 8.94273C13.3072 9.19278 13.6464 9.33325 14 9.33325V11.3333C14 11.6869 13.8595 12.026 13.6095 12.2761C13.3594 12.5261 13.0203 12.6666 12.6667 12.6666H3.33333C2.97971 12.6666 2.64057 12.5261 2.39052 12.2761C2.14048 12.026 2 11.6869 2 11.3333V9.33325C2.35362 9.33325 2.69276 9.19278 2.94281 8.94273C3.19286 8.69268 3.33333 8.35354 3.33333 7.99992C3.33333 7.6463 3.19286 7.30716 2.94281 7.05711C2.69276 6.80706 2.35362 6.66659 2 6.66659V4.66659C2 4.31296 2.14048 3.97382 2.39052 3.72378C2.64057 3.47373 2.97971 3.33325 3.33333 3.33325"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_129">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal manrope_font -tracking-[0.015em]">
                              Tickets
                            </span>
                          </span>
                        </li>
                      </Link>

                      <Link href={"/"} passHref>
                        <li className="max-w-[228px]  hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_138)">
                                <path
                                  d="M6.00004 7.33333C7.4728 7.33333 8.66671 6.13943 8.66671 4.66667C8.66671 3.19391 7.4728 2 6.00004 2C4.52728 2 3.33337 3.19391 3.33337 4.66667C3.33337 6.13943 4.52728 7.33333 6.00004 7.33333Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2 14V12.6667C2 11.9594 2.28095 11.2811 2.78105 10.781C3.28115 10.281 3.95942 10 4.66667 10H7.33333C8.04058 10 8.71885 10.281 9.21895 10.781C9.71905 11.2811 10 11.9594 10 12.6667V14"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.6666 2.08667C11.2402 2.23354 11.7487 2.56714 12.1117 3.03488C12.4748 3.50262 12.6719 4.07789 12.6719 4.67C12.6719 5.26212 12.4748 5.83739 12.1117 6.30513C11.7487 6.77287 11.2402 7.10647 10.6666 7.25334"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 14.0001V12.6668C13.9966 12.0782 13.7986 11.5073 13.4368 11.043C13.0751 10.5788 12.5699 10.2472 12 10.1001"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_138">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal manrope_font -tracking-[0.015em] ">
                              Team
                            </span>
                          </span>
                        </li>
                      </Link>

                      <Link href={"/"} passHref>
                        <li className="max-w-[228px]  hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_147)">
                                <path
                                  d="M6.88333 2.878C7.16733 1.70733 8.83267 1.70733 9.11667 2.878C9.15928 3.05387 9.24281 3.21719 9.36047 3.35467C9.47813 3.49215 9.62659 3.5999 9.79377 3.66916C9.96094 3.73843 10.1421 3.76723 10.3225 3.75325C10.5029 3.73926 10.6775 3.68287 10.832 3.58867C11.8607 2.962 13.0387 4.13933 12.412 5.16867C12.3179 5.3231 12.2616 5.49756 12.2477 5.67785C12.2337 5.85814 12.2625 6.03918 12.3317 6.20625C12.4009 6.37333 12.5085 6.52172 12.6458 6.63937C12.7831 6.75702 12.9463 6.8406 13.122 6.88333C14.2927 7.16733 14.2927 8.83267 13.122 9.11667C12.9461 9.15928 12.7828 9.24281 12.6453 9.36047C12.5079 9.47813 12.4001 9.62659 12.3308 9.79377C12.2616 9.96094 12.2328 10.1421 12.2468 10.3225C12.2607 10.5029 12.3171 10.6775 12.4113 10.832C13.038 11.8607 11.8607 13.0387 10.8313 12.412C10.6769 12.3179 10.5024 12.2616 10.3222 12.2477C10.1419 12.2337 9.96082 12.2625 9.79375 12.3317C9.62667 12.4009 9.47828 12.5085 9.36063 12.6458C9.24298 12.7831 9.1594 12.9463 9.11667 13.122C8.83267 14.2927 7.16733 14.2927 6.88333 13.122C6.84072 12.9461 6.75719 12.7828 6.63953 12.6453C6.52187 12.5079 6.37341 12.4001 6.20623 12.3308C6.03906 12.2616 5.85789 12.2328 5.67748 12.2468C5.49706 12.2607 5.3225 12.3171 5.168 12.4113C4.13933 13.038 2.96133 11.8607 3.588 10.8313C3.68207 10.6769 3.73837 10.5024 3.75232 10.3222C3.76628 10.1419 3.7375 9.96082 3.66831 9.79375C3.59913 9.62667 3.49151 9.47828 3.35418 9.36063C3.21686 9.24298 3.05371 9.1594 2.878 9.11667C1.70733 8.83267 1.70733 7.16733 2.878 6.88333C3.05387 6.84072 3.21719 6.75719 3.35467 6.63953C3.49215 6.52187 3.5999 6.37341 3.66916 6.20623C3.73843 6.03906 3.76723 5.85789 3.75325 5.67748C3.73926 5.49706 3.68287 5.3225 3.58867 5.168C2.962 4.13933 4.13933 2.96133 5.16867 3.588C5.83533 3.99333 6.69933 3.63467 6.88333 2.878Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_147">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal manrope_font -tracking-[0.015em]">
                              Settings
                            </span>
                          </span>
                        </li>
                      </Link>

                      <Link href={"/"} passHref>
                        <li className="max-w-[228px]  hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_147)">
                                <path
                                  d="M6.88333 2.878C7.16733 1.70733 8.83267 1.70733 9.11667 2.878C9.15928 3.05387 9.24281 3.21719 9.36047 3.35467C9.47813 3.49215 9.62659 3.5999 9.79377 3.66916C9.96094 3.73843 10.1421 3.76723 10.3225 3.75325C10.5029 3.73926 10.6775 3.68287 10.832 3.58867C11.8607 2.962 13.0387 4.13933 12.412 5.16867C12.3179 5.3231 12.2616 5.49756 12.2477 5.67785C12.2337 5.85814 12.2625 6.03918 12.3317 6.20625C12.4009 6.37333 12.5085 6.52172 12.6458 6.63937C12.7831 6.75702 12.9463 6.8406 13.122 6.88333C14.2927 7.16733 14.2927 8.83267 13.122 9.11667C12.9461 9.15928 12.7828 9.24281 12.6453 9.36047C12.5079 9.47813 12.4001 9.62659 12.3308 9.79377C12.2616 9.96094 12.2328 10.1421 12.2468 10.3225C12.2607 10.5029 12.3171 10.6775 12.4113 10.832C13.038 11.8607 11.8607 13.0387 10.8313 12.412C10.6769 12.3179 10.5024 12.2616 10.3222 12.2477C10.1419 12.2337 9.96082 12.2625 9.79375 12.3317C9.62667 12.4009 9.47828 12.5085 9.36063 12.6458C9.24298 12.7831 9.1594 12.9463 9.11667 13.122C8.83267 14.2927 7.16733 14.2927 6.88333 13.122C6.84072 12.9461 6.75719 12.7828 6.63953 12.6453C6.52187 12.5079 6.37341 12.4001 6.20623 12.3308C6.03906 12.2616 5.85789 12.2328 5.67748 12.2468C5.49706 12.2607 5.3225 12.3171 5.168 12.4113C4.13933 13.038 2.96133 11.8607 3.588 10.8313C3.68207 10.6769 3.73837 10.5024 3.75232 10.3222C3.76628 10.1419 3.7375 9.96082 3.66831 9.79375C3.59913 9.62667 3.49151 9.47828 3.35418 9.36063C3.21686 9.24298 3.05371 9.1594 2.878 9.11667C1.70733 8.83267 1.70733 7.16733 2.878 6.88333C3.05387 6.84072 3.21719 6.75719 3.35467 6.63953C3.49215 6.52187 3.5999 6.37341 3.66916 6.20623C3.73843 6.03906 3.76723 5.85789 3.75325 5.67748C3.73926 5.49706 3.68287 5.3225 3.58867 5.168C2.962 4.13933 4.13933 2.96133 5.16867 3.588C5.83533 3.99333 6.69933 3.63467 6.88333 2.878Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_147">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal manrope_font -tracking-[0.015em]">
                              Customers
                            </span>
                          </span>
                        </li>
                      </Link>

                      <Link href={"/"} passHref>
                        <li className="max-w-[228px]  hover:bg-zinc-700 rounded-lg hover:text-white text-zinc-300 cursor-pointer px-4 py-3">
                          <span className="flex items-center rounded focus:outline-none  space-x-2">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_103_147)">
                                <path
                                  d="M6.88333 2.878C7.16733 1.70733 8.83267 1.70733 9.11667 2.878C9.15928 3.05387 9.24281 3.21719 9.36047 3.35467C9.47813 3.49215 9.62659 3.5999 9.79377 3.66916C9.96094 3.73843 10.1421 3.76723 10.3225 3.75325C10.5029 3.73926 10.6775 3.68287 10.832 3.58867C11.8607 2.962 13.0387 4.13933 12.412 5.16867C12.3179 5.3231 12.2616 5.49756 12.2477 5.67785C12.2337 5.85814 12.2625 6.03918 12.3317 6.20625C12.4009 6.37333 12.5085 6.52172 12.6458 6.63937C12.7831 6.75702 12.9463 6.8406 13.122 6.88333C14.2927 7.16733 14.2927 8.83267 13.122 9.11667C12.9461 9.15928 12.7828 9.24281 12.6453 9.36047C12.5079 9.47813 12.4001 9.62659 12.3308 9.79377C12.2616 9.96094 12.2328 10.1421 12.2468 10.3225C12.2607 10.5029 12.3171 10.6775 12.4113 10.832C13.038 11.8607 11.8607 13.0387 10.8313 12.412C10.6769 12.3179 10.5024 12.2616 10.3222 12.2477C10.1419 12.2337 9.96082 12.2625 9.79375 12.3317C9.62667 12.4009 9.47828 12.5085 9.36063 12.6458C9.24298 12.7831 9.1594 12.9463 9.11667 13.122C8.83267 14.2927 7.16733 14.2927 6.88333 13.122C6.84072 12.9461 6.75719 12.7828 6.63953 12.6453C6.52187 12.5079 6.37341 12.4001 6.20623 12.3308C6.03906 12.2616 5.85789 12.2328 5.67748 12.2468C5.49706 12.2607 5.3225 12.3171 5.168 12.4113C4.13933 13.038 2.96133 11.8607 3.588 10.8313C3.68207 10.6769 3.73837 10.5024 3.75232 10.3222C3.76628 10.1419 3.7375 9.96082 3.66831 9.79375C3.59913 9.62667 3.49151 9.47828 3.35418 9.36063C3.21686 9.24298 3.05371 9.1594 2.878 9.11667C1.70733 8.83267 1.70733 7.16733 2.878 6.88333C3.05387 6.84072 3.21719 6.75719 3.35467 6.63953C3.49215 6.52187 3.5999 6.37341 3.66916 6.20623C3.73843 6.03906 3.76723 5.85789 3.75325 5.67748C3.73926 5.49706 3.68287 5.3225 3.58867 5.168C2.962 4.13933 4.13933 2.96133 5.16867 3.588C5.83533 3.99333 6.69933 3.63467 6.88333 2.878Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                                  stroke="white"
                                  strokeOpacity="0.6"
                                  strokeWidth="0.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_103_147">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <span className="text-base  leading-4 font-normal manrope_font -tracking-[0.015em]">
                              Hardware
                            </span>
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Vertical navigation ends */}
    </div>
  );
};

export default Navigation;
