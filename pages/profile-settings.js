import React, { useEffect, useRef, useState } from "react";
import Heading from "@/components/reusableUi/Heading";
import ButtonPrimary from "@/components/reusableUi/ButtonPrimary";
import dynamic from "next/dynamic";
import withAuth from "@/components/middlewares/Auth";
import { getTitle } from "@/utils/functions";
import { decode } from "jsonwebtoken";
const Header = dynamic(() => import("../components/header"), { ssr: false });
const Layout = dynamic(() => import("../components/layout"), { ssr: false });

const profilesettings = () => {
  const [disable, setDisable] = useState(true);
  const [userValues, setuserValues] = useState(null);
  const [passwordHide, setpasswordHide] = useState(true);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "password"
  });
  const focusRef = useRef([]);
  const user = "John Doe";
  const handleChangeName = (name, value) => {
    setValue((pre) => ({ ...pre, [name]: value }));
  };
  useEffect(() => {
    if (typeof window == 'undefined') return
    let user = localStorage.getItem('Auth')
    let deUser = decode(user)
    setuserValues(deUser)
    setValue({ ...value, firstName: deUser?.first_name, lastName: deUser?.last_name })
  }, [])
  return (
    <Layout nav={true}>
      <Header title={"Logo"} />
      {getTitle("Profile Settings | Mosaica -  Business Intelligence for Corporate Responsibility")}
      <div className="w-full flex p-7 justify-center h-[calc(100%-81px)] items-center">
          <div className="w-full max-w-[740px] ">
            <div className="flex flex-col gap-5">
              <Heading text={"Profile Settings"} extendClass={"text-2xl"} />
              <form>
                <div className="p-6 flex flex-col gap-7 bg-white rounded-lg border border-slate-100">
                  <div>
                    <Heading
                      text={"Personal Information"}
                      extendClass={"text-lg"}
                    />
                    <p className="font-normal pt-2 text-base leading-none text-slate-600">
                      Adjust your account and
                      password information.
                      {/* Change your profile picture and adjust your account and
                      password information. */}
                    </p>
                  </div>

                  <div className=" flex gap-4  items-center">

                    <div>
                      {/* <Heading text={`${value?.firstName || 'John'} ${value?.lastName || 'Doe'}`} extendClass={"text-lg"} /> */}
                      <p className="font-normal pt-2 text-sm lowercase leading-none text-slate-600 ">
                        {userValues?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <p className="text-md leading-none font-bold text-neutral-900 ">
                      Email
                    </p>
                    {
                      <div className="flex items-center gap-2 relative">
                        {user == undefined && value === "Loading" ? (
                          <div className="w-full animate-pulse">
                            {" "}
                            <div
                              className={"px-4 h-[51px] bg-slate-100 "}
                            ></div>
                          </div>
                        ) : (
                          <input
                            disabled={disable}
                            type={"text"}
                            ref={(el) => (focusRef.current[2] = el)}
                            // id="myText"
                            value={userValues?.email || 'someone@example.com'}
                            onChange={(e) =>
                              handleChangeName("userName", e.target.value)
                            }
                            className={
                              "w-full px-4 py-3.5 border lowercase border-slate-300 rounded-lg text-sm leading-normal  bg-white outline-primary "
                            }
                          />
                        )}
                        <svg
                          className={` ${user == undefined ? "invisible" : "block"
                            } cursor-pointer absolute right-4`}
                          onClick={() => {
                            setDisable(false);
                            setTimeout(() => {
                              focusRef.current[2].focus();
                            }, 50);
                          }}
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.765 4.16231L18.71 5.74531C18.8978 5.9283 19.0031 6.17982 19.0015 6.44201C19 6.70421 18.8919 6.9545 18.702 7.13531L17.224 8.93531L12.194 15.0723C12.1069 15.1749 11.9897 15.2473 11.859 15.2793L9.25102 15.8793C8.90496 15.8936 8.60654 15.6384 8.56702 15.2943L8.68902 12.7213C8.69806 12.5899 8.75006 12.4652 8.83702 12.3663L13.65 6.50131L15.345 4.43331C15.6743 3.98505 16.2938 3.86684 16.765 4.16231Z"
                            stroke="#525252"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 18.4915C4.72386 18.4915 4.5 18.7153 4.5 18.9915C4.5 19.2676 4.72386 19.4915 5 19.4915V18.4915ZM18.7 19.4915C18.9761 19.4915 19.2 19.2676 19.2 18.9915C19.2 18.7153 18.9761 18.4915 18.7 18.4915V19.4915ZM14.1137 6.31432C14.0103 6.05825 13.7189 5.93445 13.4629 6.03781C13.2068 6.14117 13.083 6.43254 13.1863 6.68861L14.1137 6.31432ZM17.3342 9.42617C17.6035 9.36533 17.7726 9.09764 17.7117 8.82829C17.6509 8.55893 17.3832 8.38991 17.1138 8.45076L17.3342 9.42617ZM5 19.4915H18.7V18.4915H5V19.4915ZM13.1863 6.68861C13.4081 7.23802 13.8663 8.02465 14.5426 8.6261C15.2277 9.23535 16.1802 9.68688 17.3342 9.42617L17.1138 8.45076C16.3688 8.61905 15.7343 8.34758 15.2071 7.87883C14.6712 7.40228 14.2919 6.75591 14.1137 6.31432L13.1863 6.68861Z"
                            fill="#525252"
                          />
                        </svg>
                      </div>
                    }

                    {/* sucess message  */}
                    {false != "" && (
                      <div
                        className={` ${false != "" ? "opacity-100 " : "opacity-0"
                          } transition-all ease-in-out duration-300 !mt-1.5 absolute `}
                      >
                        <p className="text-xs text-primary font-semibold">
                          {"any message"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-full space-y-2">
                    <p className="text-md leading-none font-bold text-neutral-900 ">
                      Password
                    </p>
                    {
                      <div className="flex items-center gap-2 relative">
                        {user == undefined && value === "Loading" ? (
                          <div className="w-full animate-pulse">
                            {" "}
                            <div
                              className={"px-4 h-[51px] bg-slate-100 "}
                            ></div>
                          </div>
                        ) : (
                          <input
                            disabled={disable}
                            type={passwordHide ? "password" : 'text'}
                            ref={(el) => (focusRef.current[3] = el)}
                            value={value.password}
                            onChange={(e) =>
                              handleChangeName("password", e.target.value)
                            }
                            className={
                              "w-full px-4 py-3.5 border border-slate-300 rounded-lg text-sm leading-normal bg-white outline-primary "
                            }
                          />
                        )}
                        {!passwordHide ? <svg
                          className={` ${user == undefined ? "invisible" : "block"
                            } cursor-pointer absolute right-4`}
                          onClick={() => setpasswordHide(pre => !pre)}
                          width={22} height={20} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5418 8C13.5418 9.6569 12.1986 11 10.5418 11C8.88489 11 7.54175 9.6569 7.54175 8C7.54175 6.3431 8.88489 5 10.5418 5C12.1986 5 13.5418 6.3431 13.5418 8Z" stroke="#929292" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 8C2.27427 3.94288 6.06456 1 10.5422 1C15.0198 1 18.8101 3.94291 20.0844 8C18.8101 12.0571 15.0198 15 10.5422 15C6.06455 15 2.27425 12.0571 1 8Z" stroke="#929292" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                          :
                          <svg
                            className={` ${user == undefined ? "invisible" : "block"
                              } cursor-pointer absolute right-4`}
                            onClick={() => setpasswordHide(pre => !pre)}
                            width={22} height={20} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4166 16.8246C11.8094 16.9398 11.1828 17 10.5422 17C6.06456 17 2.27426 14.0571 1 10C1.3469 8.8955 1.88026 7.87361 2.56318 6.97118M8.42043 7.87868C8.96335 7.33579 9.71335 7 10.5417 7C12.1987 7 13.5417 8.3431 13.5417 10C13.5417 10.8284 13.2059 11.5784 12.663 12.1213M8.42043 7.87868L12.663 12.1213M8.42043 7.87868L5.13091 4.58916M12.663 12.1213L15.9529 15.4112M5.13091 4.58916L1.54175 1M5.13091 4.58916C6.69073 3.58354 8.54835 3 10.5421 3C15.0198 3 18.8102 5.94291 20.0844 10C19.3775 12.2507 17.8962 14.1585 15.9529 15.4112M15.9529 15.4112L19.5417 19" stroke="#929292" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>}

                      </div>
                    }

                    {false != "" && (
                      <div
                        className={` ${false != "" ? "opacity-100 " : "opacity-0"
                          } transition-all ease-in-out duration-300 !mt-1.5 absolute `}
                      >
                        <p className="text-xs text-primary font-semibold">
                          {"any message"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <hr className="w-full bg-slate-200"></hr>
                  </div>
                  <div className="flex justify-end gap-4">
                    <ButtonPrimary
                      handleClick={(e) => e.preventDefault()}
                      btnSecondary={true}
                      label="Cancel"
                      padding={"py-4 px-6"}
                      extendclass={
                        "border !text-emerald-700 border-emerald-700"
                      }
                    />

                    <ButtonPrimary label="Save Changes" padding={"py-4 px-6"} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      {/* <div className="w-full flex p-7 justify-center">
        <div className="w-full max-w-[740px] ">
          <div className="flex flex-col gap-5">
            <Heading text={"Profile Settings"} extendClass={"text-2xl"} />
            <form>
              <div className="p-6 flex flex-col gap-7 bg-summary-cards rounded-lg border border-navborder">
                <div>
                  <Heading
                    text={"Personal Information"}
                    extendClass={"text-lg"}
                  />
                  <p className="font-normal pt-2 text-base leading-none text-card-subheading">
                    Change your profile picture and adjust your account and
                    password information.
                  </p>
                </div>

                <div className=" flex gap-4  items-center">
                  <div className="relative w-full max-w-[120px]">
                    <img
                      src={"/images/imgProfile.png"}
                      alt={"Mosaic Icon"}
                      width={120}
                      height={120}
                      className="opacity-90 rounded-full z-0  border border-navborder  overflow-hidden"
                    />
                    <svg
                      className="absolute inset-0 m-auto"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 10.2V14.533C5.00423 15.4569 5.3754 16.3413 6.0318 16.9915C6.68821 17.6418 7.57608 18.0045 8.5 18H15.5C16.4239 18.0045 17.3118 17.6418 17.9682 16.9915C18.6246 16.3413 18.9958 15.4569 19 14.533V10.2C18.9958 9.27608 18.6246 8.39169 17.9682 7.74148C17.3118 7.09126 16.4239 6.72849 15.5 6.73301C15.0147 6.66864 14.6001 6.3515 14.411 5.90001C14.1009 5.34285 13.5126 4.99815 12.875 5.00001H11.125C10.4874 4.99815 9.89908 5.34285 9.589 5.90001C9.39986 6.3515 8.98526 6.66864 8.5 6.73301C7.57608 6.72849 6.68821 7.09126 6.0318 7.74148C5.3754 8.39169 5.00423 9.27608 5 10.2Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 14.5331C10.8059 14.5215 9.84617 13.5461 9.85405 12.3519C9.86193 11.1578 10.8344 10.195 12.0286 10.1992C13.2228 10.2034 14.1885 11.1729 14.188 12.3671C14.1851 12.9445 13.9529 13.4971 13.5426 13.9033C13.1323 14.3095 12.5774 14.536 12 14.5331Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <Heading text={"John Doe"} extendClass={"text-lg"} />
                    <p className="font-normal pt-2 text-sm leading-none text-card-subheading">
                      Some@gmail.com
                    </p>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <p className="text-md leading-none font-bold text-card-heading ">
                   Email
                  </p>
                  {
                    <div className="flex items-center gap-2 relative">
                      {user == undefined && value === "Loading" ? (
                        <div className="w-full animate-pulse">
                          {" "}
                          <div
                            className={"px-4 h-[51px] bg-summary-cards "}
                          ></div>
                        </div>
                      ) : (
                        <input
                          disabled={disable}
                          type={"text"}
                          ref={(el) => (focusRef.current[2] = el)}
                          // id="myText"
                          placeholder={"Type Here"}
                          value={value.userName}
                          onChange={(e) =>
                            handleChangeName("userName", e.target.value)
                          }
                          className={
                            "w-full px-4 py-3.5 border border-navborder rounded-lg text-sm leading-normal placeholder-white bg-summary-cards outline-primary "
                          }
                        />
                      )}
                      <svg
                        className={` ${
                          user == undefined ? "invisible" : "block"
                        } cursor-pointer absolute right-4`}
                        onClick={() => {
                          setDisable(false);
                          setTimeout(() => {
                            focusRef.current[2].focus();
                          }, 50);
                        }}
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.765 4.16231L18.71 5.74531C18.8978 5.9283 19.0031 6.17982 19.0015 6.44201C19 6.70421 18.8919 6.9545 18.702 7.13531L17.224 8.93531L12.194 15.0723C12.1069 15.1749 11.9897 15.2473 11.859 15.2793L9.25102 15.8793C8.90496 15.8936 8.60654 15.6384 8.56702 15.2943L8.68902 12.7213C8.69806 12.5899 8.75006 12.4652 8.83702 12.3663L13.65 6.50131L15.345 4.43331C15.6743 3.98505 16.2938 3.86684 16.765 4.16231Z"
                          stroke="#525252"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 18.4915C4.72386 18.4915 4.5 18.7153 4.5 18.9915C4.5 19.2676 4.72386 19.4915 5 19.4915V18.4915ZM18.7 19.4915C18.9761 19.4915 19.2 19.2676 19.2 18.9915C19.2 18.7153 18.9761 18.4915 18.7 18.4915V19.4915ZM14.1137 6.31432C14.0103 6.05825 13.7189 5.93445 13.4629 6.03781C13.2068 6.14117 13.083 6.43254 13.1863 6.68861L14.1137 6.31432ZM17.3342 9.42617C17.6035 9.36533 17.7726 9.09764 17.7117 8.82829C17.6509 8.55893 17.3832 8.38991 17.1138 8.45076L17.3342 9.42617ZM5 19.4915H18.7V18.4915H5V19.4915ZM13.1863 6.68861C13.4081 7.23802 13.8663 8.02465 14.5426 8.6261C15.2277 9.23535 16.1802 9.68688 17.3342 9.42617L17.1138 8.45076C16.3688 8.61905 15.7343 8.34758 15.2071 7.87883C14.6712 7.40228 14.2919 6.75591 14.1137 6.31432L13.1863 6.68861Z"
                          fill="#525252"
                        />
                      </svg>
                    </div>
                  }

                  {false != "" && (
                    <div
                      className={` ${
                        false != "" ? "opacity-100 " : "opacity-0"
                      } transition-all ease-in-out duration-300 !mt-1.5 absolute `}
                    >
                      <p className="text-xs text-primary font-semibold">
                        {"any message"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full space-y-2">
                  <p className="text-md leading-none font-bold text-card-heading ">
                    Password
                  </p>
                  {
                    <div className="flex items-center gap-2 relative">
                      {user == undefined && value === "Loading" ? (
                        <div className="w-full animate-pulse">
                          {" "}
                          <div
                            className={"px-4 h-[51px] bg-summary-cards "}
                          ></div>
                        </div>
                      ) : (
                        <input
                          disabled={disable}
                          type={"password"}
                          ref={(el) => (focusRef.current[3] = el)}
                          placeholder={"Type Here"}
                          value={value.password}
                          onChange={(e) =>
                            handleChangeName("password", e.target.value)
                          }
                          className={
                            "w-full px-4 py-3.5 border border-navborder rounded-lg text-sm leading-normal placeholder-white bg-summary-cards outline-primary "
                          }
                        />
                      )}
                      <svg
                        className={` ${
                          user == undefined ? "invisible" : "block"
                        } cursor-pointer absolute right-4`}
                        onClick={() => {
                          setDisable(false);
                          setTimeout(() => {
                            focusRef.current[3].focus();
                          }, 50);
                        }}
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.765 4.16231L18.71 5.74531C18.8978 5.9283 19.0031 6.17982 19.0015 6.44201C19 6.70421 18.8919 6.9545 18.702 7.13531L17.224 8.93531L12.194 15.0723C12.1069 15.1749 11.9897 15.2473 11.859 15.2793L9.25102 15.8793C8.90496 15.8936 8.60654 15.6384 8.56702 15.2943L8.68902 12.7213C8.69806 12.5899 8.75006 12.4652 8.83702 12.3663L13.65 6.50131L15.345 4.43331C15.6743 3.98505 16.2938 3.86684 16.765 4.16231Z"
                          stroke="#525252"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 18.4915C4.72386 18.4915 4.5 18.7153 4.5 18.9915C4.5 19.2676 4.72386 19.4915 5 19.4915V18.4915ZM18.7 19.4915C18.9761 19.4915 19.2 19.2676 19.2 18.9915C19.2 18.7153 18.9761 18.4915 18.7 18.4915V19.4915ZM14.1137 6.31432C14.0103 6.05825 13.7189 5.93445 13.4629 6.03781C13.2068 6.14117 13.083 6.43254 13.1863 6.68861L14.1137 6.31432ZM17.3342 9.42617C17.6035 9.36533 17.7726 9.09764 17.7117 8.82829C17.6509 8.55893 17.3832 8.38991 17.1138 8.45076L17.3342 9.42617ZM5 19.4915H18.7V18.4915H5V19.4915ZM13.1863 6.68861C13.4081 7.23802 13.8663 8.02465 14.5426 8.6261C15.2277 9.23535 16.1802 9.68688 17.3342 9.42617L17.1138 8.45076C16.3688 8.61905 15.7343 8.34758 15.2071 7.87883C14.6712 7.40228 14.2919 6.75591 14.1137 6.31432L13.1863 6.68861Z"
                          fill="#525252"
                        />
                      </svg>
                    </div>
                  }
                  {false != "" && (
                    <div
                      className={` ${
                        false != "" ? "opacity-100 " : "opacity-0"
                      } transition-all ease-in-out duration-300 !mt-1.5 absolute `}
                    >
                      <p className="text-xs text-primary font-semibold">
                        {"any message"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <hr className="w-full bg-navborder"></hr>
                </div>
                <div className="flex justify-end gap-4">
                  <ButtonPrimary
                    btnSecondary={true}
                    label="Cancel"
                    padding={"py-4 px-6"}
                    extendclass={"border !text-emerald-700 border-emerald-700"}
                  />

                  <ButtonPrimary label="Save Changes" padding={"py-4 px-6"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default withAuth(profilesettings);
