"use client";
import { useEffect, useState } from "react";
import { ControlPane, Grid } from "./components";
import { useToPng } from "@hugocxl/react-to-image";
import { pageSizes } from "@/app/components/data";

export const Home = () => {
  const [pageSize, setPageSize] = useState<string>(pageSizes[0].value);
  const [padding, setPadding] = useState(0);
  const currentPageSettings =
    pageSizes.find((s) => s.value === pageSize) || pageSizes[0];
  const [images, setImages] = useState<string[]>(Array(32).fill(""));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, convertToPng, ref] = useToPng<HTMLDivElement>({
    onSuccess: (dataURL) => {
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
    },
    pixelRatio: 2,
  });

  useEffect(() => {
    const pSize = localStorage.getItem("pageSize") ?? pageSizes[0].value;
    setPageSize(pSize);
  }, []);

  const handleChangePageSettings = (pSize: string) => {
    setPageSize(pSize);
    localStorage.setItem("pageSize", pSize);
  };

  return (
    <div className="flex m-10">
      <Grid
        padding={padding}
        rows={currentPageSettings.rows}
        cols={currentPageSettings.cols}
        pageRef={ref}
        images={images}
        setImages={setImages}
      />
      <ControlPane
        padding={padding}
        onPaddingChange={setPadding}
        pageSize={pageSize}
        onPageSizeChange={handleChangePageSettings}
        onSaveResult={convertToPng}
        onImagesSelect={setImages}
      />
    </div>
  );
};
