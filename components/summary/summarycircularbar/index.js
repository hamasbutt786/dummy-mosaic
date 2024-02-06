import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const index = ({
  w,
  h,
  themeColor,
  trail,
  text,
  yearValue,
  percentageVerification
}) => {
  const percentage =
    percentageVerification === undefined ? 0 : percentageVerification;
  return (
    <div className="" style={{ width: w ? w : 200, height: h ? h : 200 }}>
      <CircularProgressbar
        strokeWidth={15}
        value={percentage}
        text={`${percentage}%`}
        // value={percentageVerification?.PercentageVerifiedResponsibleMaterials?.toFixed(0)}
        // text={`${percentageVerification?percentageVerification?.PercentageVerifiedResponsibleMaterials?.toFixed(0):"-"}%`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.5,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",

          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: themeColor || "#047857",
          textColor: text,
          trailColor: trail,
          backgroundColor: themeColor || "#047857"
        })}
      />
    </div>
  );
};

export default index;
