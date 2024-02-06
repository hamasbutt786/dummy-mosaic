import Image from "next/image";
import React from "react";
// import { Inter } from 'next/font/google'
import LoginComponent from "@/components/login/LoginComponent";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>
          Mosaica | Business Intelligence for Corporate Responsibility
        </title>
      </Head>
      <div className="flex-col lg:flex-row lg:flex  overflow-hidden bg-summary-cards md:h-screen">
        <div className="w-full md:hidden lg:flex lg:w-1/2  lg:h-screen px-12 py-10   hero-pattern bg-no-repeat bg-auto  ">
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
        <div className="w-full lg:w-1/2 lg:hidden md:flex lg:h-screen px-12 py-10   bg-no-repeat bg-auto  ">
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
        <div className="w-full lg:w-1/2 md:p-24 lg:py-41 flex items-center ">
          <LoginComponent />
        </div>
      </div>
    </React.Fragment>
  );
}
