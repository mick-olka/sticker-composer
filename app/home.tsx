"use client";
import { useEffect, useState } from "react";
import { ControlPane, Grid } from "./components";
import { useToSvg } from "@hugocxl/react-to-image";

export const Home = () => {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(2);

  const [state, convertToSvg, ref] = useToSvg<HTMLDivElement>({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    const savedRows = parseInt(localStorage.getItem("rows") ?? "4");
    const savedCols = parseInt(localStorage.getItem("cols") ?? "2");
    setRows(savedRows);
    setCols(savedCols);
  }, []);

  const handleSetCols = (v: number) => {
    setCols(v);
    localStorage.setItem("cols", String(v));
  };
  const handleSetRows = (v: number) => {
    setRows(v);
    localStorage.setItem("rows", String(v));
  };
  useEffect(() => {
    if (state.data) {
      const dataURL = state.data;
      const img = new Image();
      // document.body.appendChild(img);
      img.src = dataURL;
      img.setAttribute("download", crypto.randomUUID());
      const link = document.createElement("a");
      link.setAttribute("href", dataURL);
      link.setAttribute("download", crypto.randomUUID());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [state]);

  return (
    <div className="flex m-10">
      <Grid rows={rows} cols={cols} pageRef={ref} />
      <ControlPane
        cols={cols}
        rows={rows}
        onColsChange={handleSetCols}
        onRowsChange={handleSetRows}
        onSaveResult={convertToSvg}
      />
    </div>
  );
};
