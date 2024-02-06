import React from "react";
import NoDataToShow from "./noDataToShow";

const MaterialFootprintTable = ({ totalData }) => {
  function formatPercentage(percentage) {
    if (percentage === 100) {
      return percentage;
    } else if (percentage.toFixed(1) % 1 === 0) {
      return Math.floor(percentage); // Round down to a whole number
    } else {
      return percentage.toFixed(1);
    }
  }

  return (
    <div className="relative lg:overflow-x-auto ">
      <table className="w-full lg:max-w-[500px] text-sm text-left text-card-heading ">
        <thead className="text-xs font-medium text-card-heading  bg-table-header">
          <tr className="">
            <th scope="col" className={` px-6 py-3 w-[204px] leading-3"`}>
              Material Name
            </th>
            <th scope="col" className={` px-6 py-3 leading-3"`}>
              Weight (t)
            </th>
            <th scope="col" className={` px-6 py-3 leading-3"`}>
              Category (%)
            </th>
          </tr>
        </thead>
        {
          <tbody>
            {totalData !== undefined || totalData?.length > 0 ? (
              totalData?.map((el, i) => {
                if (el.percentage === null) return;
                return (
                  <tr
                    key={i}
                    className=" bg-summary-cards border-b border-navborder "
                  >
                    <td className="px-6 truncate py-4 leading-[14px]">
                      {el.material_name ? el.material_name : "-"}
                    </td>
                    <td className="px-6 py-4 leading-[14px]">
                      {el?.total_weight ? (el?.total_weight).toFixed(2) : "-"}
                    </td>
                    <td className="px-6 py-4 leading-[14px]">{` ${el.percentage ? Math.round(el.percentage) : "0"
                      }%`}</td>
                  </tr>
                );
              })
            ) : (
              <tr align="center" className="h-[800px]">
                <NoDataToShow rowAndCol colSpan={3} sizeText={"p-2 text-xl"} />
              </tr>
            )}
          </tbody>
        }
      </table>
    </div>
  );
};

export default MaterialFootprintTable;
