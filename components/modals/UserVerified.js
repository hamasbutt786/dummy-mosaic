import Link from "next/link";
import React from "react";

const UserVerifiedModal = ({ setModal }) => {
  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed inset-0 bg-black bg-opacity-50 bg-blur z-[10]"
      ></div>

      <div className="min-h-[250px] max-h-[250px] m-auto flex items-center justify-center  fixed w-[600px] inset-0 z-20 ">
        <div className="bg-white w-full  p-2 rounded-2xl md:mx-auto flex flex-col items-center">
          {/* <svg
            viewBox="0 0 24 24"
            className="text-emerald-700 w-16 h-16 m-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg> */}
          <div className="text-center">
            <h3 className="md:text-2xl p-5 text-base text-gray-900 font-semibold">
              User Not Verified
            </h3>

            {/* <div
              onClick={() => setModal(false)}
              className="py-10 cursor-pointer"
            >
              <Link href={"/welcome"}>
                <span className="px-12 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3">
                  Continue
                </span>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserVerifiedModal;
