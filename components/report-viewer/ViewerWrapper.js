import React, { Fragment, } from "react";
import { Designer } from "@grapecity/activereports-react";
import { PageReport } from "@grapecity/activereports/core";
import { exportDocument as pdfExport } from "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-designer.css";
import dynamic from "next/dynamic";
import MaterialTransaction from "../modals/MaterialTransaction";
import ButtonPrimary from "../reusableUi/ButtonPrimary";
import { useGetRawMaterialDataQuery } from "@/redux-setup/api/data";
const ExtraViewer = dynamic(() => import("./extraviewer"), { ssr: false });

export default function ViewerWrapper() {
  const designer = React.useRef();
  const counter = React.useRef(0);
  const [newViewer, setNewView] = React.useState();
  const [designerVisible, setDesignerVisible] = React.useState(true);
  const [ss, setSS] = React.useState(false);
  const {data:re}=useGetRawMaterialDataQuery()
  const [reportStorage, setReportStorage] = React.useState("report.rdlx-json");
  function onSaveReport(info) {
    const reportId = info.id || `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    setSS(true);
    return Promise.resolve({
      id: reportId,
      displayName: reportId,
    });
  }
  function onSaveAsReport(info) {
    const reportId = `NewReport${++counter.current}`;
    setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    setSS(true);
    return Promise.resolve({
      id: reportId,
      displayName: reportId,
    });
  }
  async function onPdfPreview() {
    const reportInfo = await designer.current.getReport();
    const report = new PageReport();
    await report.load(reportInfo.definition);
    const doc = await report.run();
    const result = await pdfExport(doc);
    result.download("exportedreport");
  }

  function onReportPreview(report) {
    setDesignerVisible(false);
    setNewView(report.definition);

    return Promise.resolve();
  }

  return (
    <Fragment>
      {ss && <MaterialTransaction setOpen={setSS} />}
      <div id="designer-toolbar" className="container-fluid">
        <div className="row mt-3 mb-3">
          {designerVisible && (
            <ButtonPrimary
              label={" PDF Preview"}
              handleClick={() => onPdfPreview()}
            />
          )}
          {!designerVisible && (
            <ButtonPrimary
              label={"Open Designer"}
              handleClick={() => setDesignerVisible(true)}
            />
          )}
        </div>
      </div>
      <div
        id="designer-host"
        style={{ display: designerVisible ? "block" : "none" }}
      >
        <Designer
          onSave={onSaveReport}
          onSaveAs={onSaveAsReport}
          report={{ id: reportStorage }}
          // report={{ id: `report.rdlx-json` }}
          ref={designer}
          onRender={onReportPreview}
        />
      </div>
      {!designerVisible && <ExtraViewer viewer={newViewer} />}
    </Fragment>
  );
}
