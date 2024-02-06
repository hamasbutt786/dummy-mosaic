import { useTheme } from "next-themes";
import React, { use } from "react";

const LinearGradientBar = ({ width }) => {
  const { theme } = useTheme();
  return (
    <div className="flex  gap-2 items-center ">
      <span className="text-sm text-gray-800">0</span>
      <div className="relative">
        {theme === "dark" || theme == "emerald" ? (
          <div
            className={` ${
              width ?? "w-32"
            } h-3 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-700`}
          ></div>
        ) : theme === "blue" ? (
          <div
            className={` ${
              width ?? "w-32"
            } h-3 bg-gradient-to-r from-[#B0C2FF] via-[#425BCA] to-[#0D237A]`}
          ></div>
        ) : theme === "purple" ? (
          <div
            className={` ${
              width ?? "w-32"
            } h-3 bg-gradient-to-r from-purple-100 via-purple-500 to-purple-700`}
          ></div>
        ) : theme === "orange" ? (
          <div
            className={` ${
              width ?? "w-32"
            } h-3 bg-gradient-to-r from-[#FFE6E2] via-[#FFA690] to-[#D26952]`}
          ></div>
        ) : (
          ""
        )}
        <span className="absolute text-sm text-gray-800 left-[5%] ">Weight(t)</span>
      </div>

      <span className="text-sm text-gray-800">1,000</span>
    </div>
  );
};

export default LinearGradientBar;
