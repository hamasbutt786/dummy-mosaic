import React from "react";
import ButtonPrimary from "../reusableUi/ButtonPrimary";

const MaterialTransaction = ({ modalObj, setOpen }) => {
  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
          setOpen(false);
        }}
        className={`fixed inset-0 bg-black bg-opacity-50 bg-blur z-[10]`}
      ></div>
      <div
        className="m-auto fixed w-full max-w-[502px] h-full max-h-[260px] inset-0 z-20"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white p-6 rounded-[10px] material-shadow">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <p
                className={`text-lg font-semibold inter-font text-slate-800 leading-[18px]`}
              >
                Material Transaction
              </p>
              <svg
                onClick={() => setOpen(false)}
                className="cursor-pointer "
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.25 17.25L6.75 6.75"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.25 6.75L6.75 17.25"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-4 ">
              <ModalDetails keys={"identifier"} modalObj={modalObj}>
                Identifier
              </ModalDetails>
              <ModalDetails keys={"transaction_date"} modalObj={modalObj}>
                Date
              </ModalDetails>
              <ModalDetails keys={"material"} modalObj={modalObj}>
                Material Name
              </ModalDetails>
              <ModalDetails keys={"materialWeight"} modalObj={modalObj}>
                Material Weight (t)
              </ModalDetails>
              <div className="p-4 bg-slate-100">
                <div className="flex gap-3">
                  <svg
                    width={24}
                    height={30}
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.96875 0.125H7.75C10.684 0.125 13.0625 2.50349 13.0625 5.4375V8.09375C13.0625 9.56076 14.2517 10.75 15.7188 10.75H18.375C21.309 10.75 23.6875 13.1285 23.6875 16.0625V27.2188C23.6875 28.6858 22.4983 29.875 21.0312 29.875H2.96875C1.50174 29.875 0.3125 28.6858 0.3125 27.2188V2.78125C0.3125 1.31424 1.50174 0.125 2.96875 0.125ZM12.7513 14.2487C12.552 14.0494 12.2818 13.9375 12 13.9375C11.7182 13.9375 11.448 14.0494 11.2487 14.2487L6.9987 18.4987C6.58377 18.9136 6.58377 19.5864 6.9987 20.0013C7.41363 20.4162 8.08637 20.4162 8.5013 20.0013L10.9375 17.5651L10.9375 23.5C10.9375 24.0868 11.4132 24.5625 12 24.5625C12.5868 24.5625 13.0625 24.0868 13.0625 23.5L13.0625 17.5651L15.4987 20.0013C15.9136 20.4162 16.5864 20.4162 17.0013 20.0013C17.4162 19.5864 17.4162 18.9136 17.0013 18.4987L12.7513 14.2487Z"
                      fill="#059669"
                    />
                    <path
                      d="M15.1875 5.4375C15.1875 3.57734 14.5046 1.87668 13.3759 0.572532C18.191 1.83035 21.9822 5.62149 23.24 10.4366C21.9358 9.30789 20.2352 8.625 18.375 8.625H15.7188C15.4253 8.625 15.1875 8.38715 15.1875 8.09375V5.4375Z"
                      fill="#059669"
                    />
                  </svg>
                  <div className="flex justify-between w-full items-center gap-2">
                    <div className="space-y-2">
                      <p
                        className={`text-sm font-medium inter-font text-slate-800 !leading-none`}
                      >
                        transaction certificate.PDF
                      </p>
                      <p
                        className={`text-xs  inter-font text-slate-600 !leading-none`}
                      >
                        320kb
                      </p>
                    </div>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_572_25004)">
                        <path
                          d="M9.99967 11.6663C10.9201 11.6663 11.6663 10.9201 11.6663 9.99967C11.6663 9.0792 10.9201 8.33301 9.99967 8.33301C9.0792 8.33301 8.33301 9.0792 8.33301 9.99967C8.33301 10.9201 9.0792 11.6663 9.99967 11.6663Z"
                          stroke="#475569"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.3337 10.0003C16.1112 13.8895 13.3337 15.8337 10.0003 15.8337C6.66699 15.8337 3.88949 13.8895 1.66699 10.0003C3.88949 6.11116 6.66699 4.16699 10.0003 4.16699C13.3337 4.16699 16.1112 6.11116 18.3337 10.0003Z"
                          stroke="#475569"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_572_25004">
                          <rect width={20} height={20} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <ButtonPrimary
                handleClick={() => {
                  setOpen(false);
                }}
                label={"Cancel"}
                btnSecondary={true}
                padding={"py-3 px-6"}
                textSize={"text-sm"}
              />
              <ButtonPrimary
                label={"Download"}
                padding={"py-3 px-6"}
                textSize={"text-sm"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialTransaction;

function ModalDetails({ modalObj, keys, children }) {
  function formatDate(datee) {
    const dateString = datee.toString();
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short", // Using "short" to get abbreviated month name
      year: "numeric"
    };

    const dateUpdated = date.toLocaleDateString("en-US", options);
    return dateUpdated;
  }
  // function materialWeightValues(item, valuetoGet) {
  //   // For material weight
  //   let { poData, ...rest } = item;
  //   let filteredVal = valuetoGet[0]?.poBaselines
  //     .map((ite) => {
  //       if (
  //         ite?.PO_number === rest?.associatedPO &&
  //         ite?.materialGroup === rest?.materialGroup
  //       ) {
  //         return Math.round(ite?.materialWeight);
  //       }
  //     })
  //     .filter((ir) => ir !== undefined);

  //   return filteredVal;
  // }

  function returningValues() {
    if (keys === 'transaction_date') {
      return formatDate(modalObj[keys])
    }
    return modalObj[keys]
  }
  return (
    <div className="flex gap-1 items-center">
      <p
        className={`text-base capitalize font-medium inter-font text-slate-800 leading-[19px] `}
      >
        {children}
      </p>
      <p
        className={`text-sm  font-medium  inter-font text-emerald-600 !leading-none mt-[1px]`}
      >

        {/* {modalObj &&
          (keys === "poDate"
            ? formatDate(modalObj["transaction_date"])
            : keys === "poData"
              ? ''
              : modalObj[keys])} */}
        {returningValues()}
      </p>
    </div>
  );
}
