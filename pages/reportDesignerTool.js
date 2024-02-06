import dynamic from "next/dynamic";
import React from "react";
import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-designer.css";
const Designer = dynamic(
  () =>
    import("@grapecity/activereports-react").then((module) => module.Designer),
  {
    ssr: false, // Set ssr option to false to prevent server-side rendering
  }
);
import Layout from "../components/layout";
import Header from "../components/header";
// import { Designer } from "@grapecity/activereports-react";
// const Designer = dynamic(() => import("@grapecity/activereports-react").then((res)=>res), { ssr: false });
const ReportDesignerTool = () => {
  const currentResolveFn = React.useRef();
  const counter = React.useRef(0);
  const [reportStorage, setReportStorage] = React.useState(new Map());
  function onSaveReport(info) {
    const reportId = info.id || `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ displayName: reportId });
  }
  function onSaveAsReport(info) {
    const reportId = `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({
      id: reportId,
      displayName: reportId,
    });
  }
  return (
    // <Layout nav={true}>
    <>
    
    <Header title={"Logo"} />
    <div className="main" id="designer-host">
      <Designer
        onSave={onSaveReport}
        onSaveAs={onSaveAsReport}
        report={{ id: "blank.rdlx-json", displayName: "my report" }}
      ></Designer>
      </div>
    </>
    // </Layout>
  );
};

export default ReportDesignerTool;
