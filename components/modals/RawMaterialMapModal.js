import React from "react";

const RawMaterialMapModal = ({ setModal, detailsModal, compName }) => {
  return (
    <>
      <div className=" w-full absolute top-0 z-[300] m-auto">
        <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className="">
          <div className="relative w-full min-h-[317px] max-h-[317px]">
            <div className="relative bg-summary-cards  flex flex-col shadow dark:bg-gray-700">
              <button
                onClick={() => {
                  setModal(false);
                }}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="crypto-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 z-30"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                  {detailsModal?.seller_country
                    ? detailsModal?.seller_country
                    : detailsModal?.country
                    ? detailsModal?.country
                    : detailsModal?.buyer_country}
                </h3>
              </div>
              <div className="flex max-h-[322px]">
                <div
                  id={
                    compName === "raw-material" || compName === "BCCUs"
                      ? "chartdive123"
                      : "chartdiv223"
                  }
                  className="top-[20%]"
                ></div>

                {
                  <>
                    {detailsModal && (
                      <div className="px-3 py-8 w-[300px]">
                        <p className="text-sm font-bold md:min-w-[130px] text-gray-500 dark:text-gray-400">
                          Country details :
                        </p>
                        <ul className="my-4 space-y-3 h-full  min-h-[160px] max-h-[160px] overflow-auto">
                          <li className="flex flex-col gap-2">
                            <a
                              className={`flex flex-col  items-start p-3 md:text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                            >
                              {compName == "BCCUs"
                                ? "Total BCCUs"
                                : "Weight(t)"}
                              <span className="flex items-center gap-1 md:text-sm font-normal whitespace-nowrap">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-weight"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#000000"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                  <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821z" />
                                </svg>

                                {/* {Math.round(detailsModal?.totalWeight)} */}
                                {Math.round(
                                  detailsModal?.total_weight
                                    ? detailsModal?.total_weight
                                    : detailsModal?.total_weight
                                )}
                              </span>
                            </a>
                            <a
                              className={`flex flex-col  items-start p-3 md:text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                            >
                              Country Name
                              <span className="flex items-center gap-1 md:text-sm font-normal whitespace-nowrap">
                                {/* {Math.round(detailsModal?.totalWeight)} */}

                                {detailsModal?.seller_country
                                  ? detailsModal?.seller_country
                                  : detailsModal?.supplierCountry
                                  ? detailsModal?.supplierCountry
                                  : detailsModal?.country
                                  ? detailsModal?.country
                                  : detailsModal?.buyer_country
                                  ? detailsModal?.buyer_country
                                  : "-"}
                              </span>
                            </a>
                            {detailsModal?.materials_supplied && (
                              <AnchorTag
                                arrayValueToBeMapped={detailsModal.materials_supplied?.map(
                                  (val, id) => (
                                    <span className="flex items-center gap-1 md:text-sm font-normal whitespace-nowrap">
                                      {" "}
                                      {`${
                                        id + 1 < 10 ? `${0}${id + 1}` : id + 1
                                      } : ${val}`}{" "}
                                    </span>
                                  )
                                )}
                              >
                                {" "}
                                Materials supplied{" "}
                              </AnchorTag>
                            )}
                            {detailsModal?.materials_supplied_to && (
                              <AnchorTag
                                arrayValueToBeMapped={detailsModal.materials_supplied_to?.map(
                                  (val, id) => (
                                    <span className="flex items-center gap-1 md:text-sm font-normal whitespace-nowrap">
                                      {" "}
                                      {`${
                                        id + 1 < 10 ? `${0}${id + 1}` : id + 1
                                      } : ${val}`}{" "}
                                    </span>
                                  )
                                )}
                              >
                                Materials supplied to{" "}
                              </AnchorTag>
                            )}
                            {detailsModal.sellers && (
                              <AnchorTag
                                arrayValueToBeMapped={detailsModal.sellers?.map(
                                  (val, id) => (
                                    <span className="flex items-center gap-1 md:text-sm font-normal whitespace-nowrap">
                                      {" "}
                                      {`${
                                        id + 1 < 10 ? `${0}${id + 1}` : id + 1
                                      } : ${val}`}{" "}
                                    </span>
                                  )
                                )}
                              >
                                sellers{" "}
                              </AnchorTag>
                            )}
                            {/* <a
                              className={`flex flex-col items-start p-3 md:text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                            >
                              Departments
                              {detailsModal?.departments
                                ?.slice(0, 10)
                                ?.map((item, id) => {
                                  return (
                                    <span
                                      key={id}
                                      className="flex-1 md:text-xs font-normal whitespace-nowrap"
                                    >
                                      {`${
                                        id + 1 < 10 ? "0" + (id + 1) : id + 1
                                      } : ${item}`}
                                    </span>
                                  );
                                })}
                            </a>
                            <a
                              className={`flex flex-col items-start p-3 md:text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                            >
                              Supplier Names
                              {detailsModal?.supplierNames
                                ?.slice(0, 10)
                                ?.map((item, id) => {
                                  return (
                                    <span
                                      key={id}
                                      className="flex-1 md:text-xs font-normal whitespace-nowrap"
                                    >
                                      {`${
                                        id + 1 < 10 ? "0" + (id + 1) : id + 1
                                      } : ${item}`}
                                    </span>
                                  );
                                })}
                            </a> */}
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RawMaterialMapModal;
const AnchorTag = ({ children, arrayValueToBeMapped }) => {
  return (
    <a
      className={`flex flex-col items-start truncate p-3 md:text-sm font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
    >
      {" "}
      {children} {arrayValueToBeMapped}{" "}
    </a>
  );
};
