import dynamic from "next/dynamic";
import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";
const Viewer = dynamic(
  () => import("../components/report-viewer/ViewerWrapper"),
  {
    ssr: false,
  }
);
const ReportView = () => {
  return (
    // <Layout nav={true}>
     <>
     <Header title={"Logo"} />
      <div className="h-screen w-full">
        <Viewer reportUri={"report.rdlx-json"}></Viewer>
      </div>
     </>
      
    // </Layout>
  );
};

export default ReportView;
