import ConfirmationCode from "@/components/register/cofirmation-code";
import { getTitle } from "@/utils/functions";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const verified = () => {
  return (
    <>
     
     {getTitle("Verified | Mosaica -  Business Intelligence for Corporate Responsibility")}

      <div className="flex-col lg:flex-row lg:flex overflow-hidden bg-summary-cards h-screen">
        <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10 md:hidden lg:flex   hero-pattern bg-no-repeat bg-auto  ">
          <Link
            href={""}
            className="flex w-full lg:items-start items-center lg:justify-start justify-center"
          >
            <Image
              src="/logo/mosaica_fulltext_green.png"
              width={222}
              height={52}
              alt="Mosaic Logo"
              className="py-1.5 px-2"
            />
          </Link>
        </div>
        <div className="w-full lg:w-1/2  lg:h-screen px-12 py-10 md:flex lg:hidden   bg-no-repeat bg-auto  ">
          <Link
            href={""}
            className="flex w-full lg:items-start items-center lg:justify-start justify-center"
          >
            <Image
              src="/logo/mosaica_fulltext_green.png"
              width={222}
              height={52}
              alt="Mosaic Logo"
              className="py-1.5 px-2"
            />
          </Link>
        </div>

        {/* // NOTE API CALL FOR REGISTER SHOULD BE IMPLEMENTED HERE */}

        <div className="w-full lg:w-1/2 md:p-28 lg:py-41 flex items-center">
          <ConfirmationCode />
        </div>
      </div>
    </>
  );
};

export default verified;
