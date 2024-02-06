import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import withAuth from "@/components/middlewares/Auth";
import { getTitle } from "@/utils/functions";
const Header = dynamic(() => import("../components/header"), { ssr: false });
const Layout = dynamic(() => import("../components/layout"), { ssr: false });

const welcome = () => {
  const [fills, setFills] = useState("#047857");
  const { theme } = useTheme();
  useEffect(() => {
    switch (theme) {
      case "emerald":
        setFills("#047857");
        break;
      case "orange":
        setFills("#FF8E6C");
        break;
      case "blue":
        setFills("#1E40AF");
        break;
      case "purple":
        setFills("#7E22CE");
        break;
      case "dark":
        setFills("#059669");
        break;
    }
  }, [theme]);
  return (

    <React.Fragment>
      {getTitle("Welcome | Mosaica -  Business Intelligence for Corporate Responsibility")}
      <Layout nav={true}>
        <Header title={"Logo"} />
        <div className="items-center justify-center flex">
          <div className="flex flex-col space-y-4 items-center justify-center w-full h-[778px] m-7">
            <div
              className={`flex flex-col items-start justify-start px-6 py-12  ${fills === "#1E40AF"
                ? "background-main-blue"
                : fills === "#FF8E6C"
                  ? "background-main-orange"
                  : fills === "#7E22CE"
                    ? "background-main-purple"
                    : fills === "#059669"
                      ? "background-main-dark border border-navborder"
                      : "background-main"
                } rounded-lg w-full max-w-[740px]`}
            >
              <div className="opacity-30  bg-green-700 rounded-full" />
              <div className="flex flex-col  items-start justify-start">
                <div className="inline-flex space-x-1 items-center justify-start">
                  <p className="text-3xl font-semibold leading-loose text-card-heading">
                    Welcome to Mosaica
                  </p>
                  <Image
                    width="0"
                    height="0"
                    alt="wavehand"
                    style={{ imageRendering: "optimizeQuality" }}
                    className="w-8 h-full"
                    src="/images/wavehand.svg"
                  />
                </div>
                <div className="w-full">
                  <p className="w-full text-sm leading-tight text-card-heading">
                    Use the navigation bar on the left to see different sample
                    pages.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start px-6 py-5 bg-summary-cards border rounded-lg border-navborder w-full max-w-[740px] ">
              <div className="flex flex-col space-y-5 items-start justify-start w-full max-w-[692px]">
                <p className="text-lg font-medium leading-none text-card-heading w-full max-w-[692px]">
                  About this Application
                </p>
                <div className="flex flex-col space-y-3 items-start justify-start w-full max-w-[692px]">
                  <ul className="list-disc list-outside px-4 flex flex-col gap-2">
                    <li className="text-xs leading-[130%] text-card-subheading">
                      This is a demo of Mosaica, the Business Intelligence
                      Dashboard for Corporate Responsibility. Mosaica is a fully
                      bespoke application designed to provide crucial business
                      intelligence & data gathering tools to corporate
                      responsibility teams and their stakeholders.
                    </li>
                    <li className="text-xs leading-[130%]  text-card-subheading">
                      Mosaica is fully bespoke. Your version is tailored to the
                      specific needs of your team and stakeholders. Each graph,
                      chart, visual and data collection tool is customisable,
                      and you can choose only the modules you need.
                    </li>
                    <li className="text-xs leading-[130%] text-card-subheading">
                      The version you are using is a demo. It showcases examples
                      of Dashboards and tools that can be deployed in a full
                      version. Certain functionality, including the ability to upload and edit data, are not included in the demo.
                    </li>
                    <li className="text-xs leading-[130%] text-card-subheading">
                      This demo is best viewed on a desktop computer with a
                      resolution between 1920 x 1080 and 2560 x 1440 pixels. It
                      will also work on tablets and mobiles, but it has not been
                      optimised for these devices.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start px-6 py-5 bg-summary-cards border rounded-lg border-navborder w-full max-w-[740px]">
              <div className="flex flex-col space-y-5 items-start justify-start w-full max-w-[692px]">
                <p className="text-lg font-medium leading-none text-card-heading  w-full max-w-[692px]">
                  How this Demo is Organised
                </p>
                <div className="flex flex-col space-y-3 items-start justify-start  w-full max-w-[692px]">
                  <ul className="list-disc list-outside px-4 flex flex-col gap-2">
                    <li className="text-xs leading-[130%] text-card-subheading">
                      Use the navigation bar on the left to see different sample
                      pages.
                    </li>

                    <li className="text-xs leading-[130%] text-card-subheading">
                      Mosaica is organised into Modules. Each Module focuses on a
                      particular business need, such as Raw Materials, Ethical
                      Trade or Sourcing Guides. Modules in this demo are
                      designed to be illustrative - in the full version, each
                      Module is tailored to your specific needs, goals &
                      strategy. And of course, you only pay for the Modules you
                      need.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start px-6 py-5 bg-summary-cards border rounded-lg border-navborder  w-full max-w-[740px] ">
              <div className="flex flex-col space-y-5 items-start justify-start  w-full max-w-[692px] ">
                <p className="text-lg font-medium leading-[130%]  text-card-heading">
                  Use of Publicly Available Information
                </p>
                <ul className="list-disc list-outside px-4">
                  <li className="text-xs leading-[130%] text-card-subheading">
                    This demo includes examples of real materials, factories and
                    businesses. Only publicly available information is used, and
                    no personal information is included in the demo. Business
                    names are taken from the open apparel Registry. If you
                    object to the use of your publicly available information,
                    please contact us via our website.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};
export default withAuth(welcome);
