import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Notifications from "../modals/Notifications";
import { useTheme } from "next-themes";
import ThemeModal from "../modals/ThemeModal";
import { useDispatch, useSelector } from "react-redux";
import { setHamburger, setThemeType } from "@/redux-setup/DataSlice";
// import { signOut, useSession } from "next-auth/react";
import ButtonPrimary from "../reusableUi/ButtonPrimary";
import { signOut } from "next-auth/react";
const Index = ({ title }) => {
  const [navDropDown, setNavDropDown] = useState(false);
  const outsideClick = useRef();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [toggle, setToggle] = useState(false);

  //Google session
  // const { data: session } = useSession();
  const handleOutsideClick = (e) => {
    if (outsideClick.current && !outsideClick.current.contains(e.target)) {
      setNavDropDown(false);
      setToggle(false);
    }
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fills, setFills] = useState("#047857");
  const [fills2, setFills2] = useState("");
  const [themeModal, setThemeModal] = useState(false);

  if (typeof window !== "undefined") {
    const themeLocal = localStorage.getItem("theme");
    dispatch(setThemeType(themeLocal));
  }
  const { themeType: themecheck } = useSelector(({ dataSlice }) => dataSlice);
  useEffect(() => {
    setFills2("");
    switch (theme) {
      case "orange":
        setFills("black");
        setFills2("black");
        break;
      case "blue":
        setFills("#ffffff");
        setFills2("white");
        break;
      case "dark":
        setFills("dark");
        setFills2("white");
        break;
      case "purple":
        setFills("#ffffff");
        setFills2("white");
        break;
      case "emerald":
        setFills("#047857");
        setFills2("black");
        break;
    }
  }, [theme, themecheck]);
  return (
    <>
      <ThemeModal modal={themeModal} setModal={setThemeModal} />
      <div
        className={`flex justify-between sticky top-0 z-[10] items-center border-b bg-hoverbackground  border-navborder py-4 px-7`}
      >
        {title === "Logo" ? (
          <>
            <div
              onClick={() => {
                dispatch(dispatch(setHamburger(true)));
              }}
              className="md:flex lg:hidden cursor-pointer"
            >
              <svg
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 9.33331H28"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 16H28"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 22.6667H28"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-end items-center  gap-4 w-full relative">
              {/* <div
                className={
                  router.asPath.includes("reportview") ? "hidden" : "block"
                }
              >
                <ButtonPrimary
                  handleClick={() => {
                    router.push("/reportview");
                  }}
                  label={"Report"}
                />
              </div> */}
              <div
                onClick={() => {
                  setThemeModal(true);
                }}
                className={`cursor-pointer flex gap-1 items-center bg-btn-apperance-bg px-3 py-3 rounded-3xl`}
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1221_13214)">
                    <path
                      style={{ stroke: fills }}
                      d="M9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 8.11358 2.42459 7.23583 2.76381 6.41689C3.10303 5.59794 3.60023 4.85382 4.22703 4.22703C4.85382 3.60023 5.59794 3.10303 6.41689 2.76381C7.23583 2.42459 8.11358 2.25 9 2.25C10.7902 2.25 12.5071 2.88214 13.773 4.00736C15.0388 5.13258 15.75 6.6587 15.75 8.25C15.75 9.04565 15.3944 9.80871 14.7615 10.3713C14.1285 10.9339 13.2701 11.25 12.375 11.25H10.5C10.1654 11.2446 9.8386 11.3513 9.57159 11.553C9.30458 11.7547 9.11271 12.04 9.02648 12.3633C8.94025 12.6867 8.96463 13.0296 9.09574 13.3375C9.22684 13.6454 9.45714 13.9006 9.75 14.0625C9.89975 14.2007 10.0024 14.3823 10.0437 14.5818C10.0849 14.7814 10.0625 14.9888 9.97977 15.175C9.89702 15.3612 9.75801 15.5168 9.58227 15.62C9.40654 15.7231 9.20291 15.7686 9 15.75Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      style={{ stroke: fills, fill: fills }}
                      d="M5.625 8.25C5.83211 8.25 6 8.08211 6 7.875C6 7.66789 5.83211 7.5 5.625 7.5C5.41789 7.5 5.25 7.66789 5.25 7.875C5.25 8.08211 5.41789 8.25 5.625 8.25Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      style={{ stroke: fills, fill: fills }}
                      d="M9 6C9.20711 6 9.375 5.83211 9.375 5.625C9.375 5.41789 9.20711 5.25 9 5.25C8.79289 5.25 8.625 5.41789 8.625 5.625C8.625 5.83211 8.79289 6 9 6Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      style={{ stroke: fills, fill: fills }}
                      d="M12.375 8.25C12.5821 8.25 12.75 8.08211 12.75 7.875C12.75 7.66789 12.5821 7.5 12.375 7.5C12.1679 7.5 12 7.66789 12 7.875C12 8.08211 12.1679 8.25 12.375 8.25Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1221_13214">
                      <rect width={18} height={18} fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span
                  className={`text-text-apperance text-xs font-medium leading-none`}
                >
                  Appearance
                </span>
              </div>
              <svg
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
                style={{ stroke: fills2 || "white" }}
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8559 15.0817C14.7504 14.857 16.5773 14.4116 18.3102 13.7719C16.8734 12.177 15.9988 10.0656 15.9988 7.75V7.04919C15.999 7.03281 15.999 7.01641 15.999 7C15.999 3.68629 13.3127 1 9.99902 1C6.68531 1 3.99902 3.68629 3.99902 7L3.99883 7.75C3.99883 10.0656 3.1243 12.177 1.6875 13.7719C3.42043 14.4116 5.24746 14.857 7.14216 15.0818M12.8559 15.0817C11.919 15.1928 10.9656 15.25 9.99883 15.25C9.03219 15.25 8.0789 15.1929 7.14216 15.0818M12.8559 15.0817C12.9488 15.3711 12.999 15.6797 12.999 16C12.999 17.6569 11.6559 19 9.99902 19C8.34217 19 6.99902 17.6569 6.99902 16C6.99902 15.6797 7.04921 15.3712 7.14216 15.0818"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  !navDropDown ? setNavDropDown(true) : setNavDropDown(false);

                  setToggle(false);
                }}
                className="cursor-pointer"
              >
                <Image
                  src={

                    "/avatar.png"
                  }
                  // src={
                  //   session?.user.image
                  //     ? session?.user.image
                  //     : "/images/profile.svg"
                  // }
                  alt={"Image"}
                  width={24}
                  height={24}
                  sizes='100vw'
                  priority
                  className="h-[24px] w-[24px] lg:w-[48px] lg:h-[48px] rounded-full"
                />
              </div>
              <div
                ref={outsideClick}
                className={`absolute min-w-[148px] right-4 md:right-0 rounded-lg bg-summary-cards z-50 ${fills === "dark"
                  ? "bg-summary-cards border border-navborder"
                  : "nav-shadow"
                  }  top-16 border-gray-800 ${navDropDown
                    ? "transition-all py-4 duration-300 ease-in-out opacity-100"
                    : " transition-all py-0 duration-300 ease-in-out opacity-0 "
                  }`}
              >
                <ul className="">
                  <li
                    onClick={() => router.push("/profile-settings")}
                    className={`space-y-2  cursor-pointer ${navDropDown
                      ? "block hover:bg-profile-hover hover:text-white"
                      : "hidden"
                      }`}
                  >
                    <div className="flex items-center group py-2  gap-2 px-4">
                      <svg
                        className="group-hover:stroke-white stroke-[#525252]"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.79059 3.16757H5.9977L6.14414 3.02112L7.88209 1.28317C7.88211 1.28316 7.88212 1.28314 7.88214 1.28312C7.91339 1.25191 7.95575 1.23438 7.99992 1.23438C8.04409 1.23438 8.08645 1.25191 8.1177 1.28312C8.11772 1.28314 8.11774 1.28316 8.11776 1.28317L9.8557 3.02112L10.0021 3.16757H10.2093H12.6666C12.7108 3.16757 12.7532 3.18513 12.7844 3.21638C12.8157 3.24764 12.8333 3.29003 12.8333 3.33423V5.79157V5.99867L12.9797 6.14512L14.7176 7.88307C14.7177 7.88308 14.7177 7.8831 14.7177 7.88312C14.7489 7.91437 14.7664 
                                                7.95673 14.7664 8.0009C14.7664 8.04507 14.7489 8.08743 14.7177 8.11868C14.7177 8.1187 14.7177 8.11871 14.7176 8.11873L12.9797 9.85668L12.8333 10.0031V10.2102V12.6676C12.8333 12.7118 12.8157 12.7542 12.7844 12.7854C12.7532 12.8167 12.7108 12.8342 12.6666 12.8342H10.2093H10.0021L9.8557 12.9807L8.11776 14.7186C8.11774 14.7186 8.11772 14.7187 8.1177 14.7187C8.08645 14.7499 8.04409 14.7674 7.99992 14.7674C7.95575 14.7674 7.91339 14.7499 7.88214 14.7187C7.88212 14.7187 7.88211 14.7186 7.88209 14.7186L6.14414 12.9807L5.9977 12.8342H5.79059H3.33326C3.28905 12.8342 3.24666 12.8167 3.2154 12.7854C3.18415 12.7542 3.16659 12.7118 3.16659 12.6676V10.2102V10.0031L3.02014 9.85668L1.2822 8.11873C1.28218 8.11871 1.28216 8.1187 1.28214 8.11868C1.25093 8.08743 1.2334 8.04507 1.2334 8.0009C1.2334 7.95673 1.25093 7.91437 1.28214 7.88312C1.28216 7.8831 1.28218 7.88308 1.2822 7.88307L3.02014 6.14512L3.16659 5.99867V5.79157V3.33423C3.16659 3.29003 3.18415 3.24764 3.21541 3.21638C3.24666 3.18513 3.28905 3.16757 3.33326 3.16757H5.79059ZM3.99992 3.5009H3.49992V4.0009V6.13713L1.9897 7.64735L1.63615 8.0009L1.9897 8.35445L3.49992 9.86467V12.0009V12.5009H3.99992H6.13615L7.64637 14.0111L7.99992 14.3647L8.35348 14.0111L9.8637 12.5009H11.9999H12.4999V12.0009V9.86467L14.0101 8.35445L14.3637 8.0009L14.0101 7.64734L12.4999 6.13713V4.0009V3.5009H11.9999H9.8637L8.35348 1.99068L7.99992 1.63713L7.64637 1.99068L6.13615 3.5009H3.99992ZM7.99992 10.1676C7.42529 10.1676 6.87419 9.93929 6.46786 9.53296C6.06153 9.12664 5.83326 8.57553 5.83326 8.0009C5.83326 7.42626 6.06153 6.87516 6.46786 6.46883C6.87419 6.06251 7.42529 5.83423 7.99992 5.83423C8.57456 5.83423 9.12566 6.06251 9.53199 6.46883C9.93832 6.87516 10.1666 7.42626 10.1666 8.0009C10.1666 8.57553 9.93832 9.12664 9.53199 9.53296C9.12566 9.93929 8.57456 10.1676 7.99992 10.1676ZM6.70356 6.70454L7.05711 7.05809L6.70356 6.70454C6.35974 7.04835 6.16659 7.51467 6.16659 8.0009C6.16659 8.48713 6.35974 8.95344 6.70356 9.29726C7.04738 9.64108 7.51369 9.83423 7.99992 9.83423C8.48615 9.83423 8.95247 9.64108 9.29628 9.29726C9.6401 8.95344 9.83325 8.48713 9.83325 8.0009C9.83325 7.51467 9.6401 7.04835 9.29628 6.70454C8.95247 6.36072 8.48615 6.16757 7.99992 6.16757C7.51369 6.16757 7.04738 6.36072 6.70356 6.70454Z"
                        // fill="#525252"
                        // stroke="#525252"
                        />
                      </svg>

                      <p className="font-medium  select-none cursor-pointer">
                        Profile Settings
                      </p>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      localStorage.clear()
                      // router.push("/");
                      document.cookie = `Auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                      signOut({ callbackUrl: "/" });
                    }}
                    className={`space-y-2  cursor-pointer ${navDropDown
                      ? "block hover:bg-profile-hover hover:text-profile-hover-text"
                      : "hidden"
                      }`}
                  >
                    <div className="flex items-center gap-2 group px-4 py-2 pr-8">
                      <svg
                        className="group-hover:stroke-white stroke-[#525252]"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66699 12.0007H4.00033V13.334H12.0003V2.66732H4.00033V4.00065H2.66699V2.00065C2.66699 1.82384 2.73723 1.65427 2.86225 1.52925C2.98728 1.40422 3.15685 1.33398 3.33366 1.33398H12.667C12.8438 1.33398 13.0134 1.40422 13.1384 1.52925C13.2634 1.65427 13.3337 1.82384 13.3337 2.00065V14.0007C13.3337 14.1775 13.2634 14.347 13.1384 14.4721C13.0134 14.5971 12.8438 14.6673 12.667 14.6673H3.33366C3.15685 14.6673 2.98728 14.5971 2.86225 14.4721C2.73723 14.347 2.66699 14.1775 2.66699 14.0007V12.0007ZM4.00033 7.33398H8.66699V8.66732H4.00033V10.6673L0.666992 8.00065L4.00033 5.33398V7.33398Z"
                        // fill="#525252"
                        />
                      </svg>

                      <p className="font-medium  select-none cursor-pointer">
                        Logout
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {open && <Notifications setOpen={setOpen} />}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/tickets"} passHref>
              <button className="flex items-center gap-2 leading-5 text-zinc-900 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-backspace"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
                  <path d="M12 10l4 4m0 -4l-4 4" />
                </svg>
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Index;
