import React from "react";

const NoDataToShow = ({ rowAndCol = false, sizeText, colSpan, rowSpan }) => {
  if (rowAndCol === true) {
    return (
      <td
        rowSpan={rowSpan}
        colSpan={colSpan}
        className={`${sizeText} w-full  h-full `}
      >
        No Data To Show
      </td>
    );
  }
  return (
    <td
      className={`w-full ${sizeText} h-full flex justify-center items-center`}
    >
      {/* <span>
                <img
                    className=""
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/searchscope.svg"
                />
            </span> */}
      No Data To Show
    </td>
  );
};

export default NoDataToShow;
