import React, { useEffect, useRef } from "react";
import { Viewer as ReportViewer } from "@grapecity/activereports-react";

const ExtraViewer = ({ viewer }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    // console.log(viewer);
    ref.current?.Viewer?.open(viewer);
  }, [viewer]);
  return (
    <div id="viewer-host" className="h-full">
      <ReportViewer ref={ref} />
    </div>
  );
};

export default ExtraViewer;
