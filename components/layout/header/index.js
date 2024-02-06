import Link from "next/link";
import React from "react";
import { useState } from "react";
function Index({ title }) {
  return (
    <>
      <div className="flex justify-between sticky top-0 z-[10] items-center border-b bg-white border-[#E4E4E7] py-5 px-6">
        {title == "Logo" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8559 15.0817C14.7504 14.857 16.5773 14.4116 18.3102 13.7719C16.8734 12.177 15.9988 10.0656 15.9988 7.75V7.04919C15.999 7.03281 15.999 7.01641 15.999 7C15.999 3.68629 13.3127 1 9.99902 1C6.68531 1 3.99902 3.68629 3.99902 7L3.99883 7.75C3.99883 10.0656 3.1243 12.177 1.6875 13.7719C3.42043 14.4116 5.24746 14.857 7.14216 15.0818M12.8559 15.0817C11.919 15.1928 10.9656 15.25 9.99883 15.25C9.03219 15.25 8.0789 15.1929 7.14216 15.0818M12.8559 15.0817C12.9488 15.3711 12.999 15.6797 12.999 16C12.999 17.6569 11.6559 19 9.99902 19C8.34217 19 6.99902 17.6569 6.99902 16C6.99902 15.6797 7.04921 15.3712 7.14216 15.0818"
              stroke="#1E293B"
              stroke-width="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/"} passHref>
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
}
export default Index;
