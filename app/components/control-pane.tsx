import { Button } from "@/components/ui/button";
import React from "react";
import { Dropdown } from "@/app/components/ui/dropdown";
import { pageSizes } from "@/app/components/data";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ImagesInput } from "@/app/components";
import { a4Height, a4Width } from "./data";
import { Image as ImageJS } from "image-js";

type Props = {
  pageSize: string;
  onPageSizeChange: (pageSize: string) => void;
  onSaveResult: () => void;
  padding: number;
  onPaddingChange: (padding: number) => void;
  onImagesSelect: (images: string[]) => void;
};

export const ControlPane = ({
  onSaveResult,
  pageSize,
  onPageSizeChange,
  padding,
  onPaddingChange,
  onImagesSelect,
}: Props) => {
  const currentPageSize = pageSizes.find((p) => p.value === pageSize);
  const cols = currentPageSize?.cols || 4;
  const rows = currentPageSize?.rows || 4;
  const limit = currentPageSize ? cols * rows : 16;
  const imgWidth = a4Width / cols;
  const imgHeight = a4Height / rows;
  // this part resizes the image to fit the cell size and avoid processing extra pixels
  const handleNormalizeImage = async (urlData: string) => {
    const img = await ImageJS.load(urlData);
    const resizedImage = img.resize(
      // * 3 to prevent quality issues
      img.height > img.width
        ? { height: imgHeight * 3 }
        : { width: imgWidth * 3 }
    );
    return resizedImage.toDataURL();
  };
  const handleImagesSelect = async (images: string[]) => {
    const normalizedImages: string[] = [];
    for (const img of images) {
      const normalizedUrl = await handleNormalizeImage(img);
      normalizedImages.push(normalizedUrl);
    }
    onImagesSelect(normalizedImages);
  };
  return (
    <div className="flex flex-col m-12 w-56 gap-4">
      <Dropdown
        items={pageSizes}
        value={pageSize}
        onChange={onPageSizeChange}
      />
      <label>Padding</label>
      <Slider
        defaultValue={[padding]}
        max={100}
        step={1}
        className={cn("w-[60%]", "")}
        onValueCommit={(v) => onPaddingChange(v[0] || 0)}
      />
      <ImagesInput onImagesSelect={handleImagesSelect} limit={limit} />
      <Button
        onClick={onSaveResult}
        className="bg-slate-600 p-4 text-white text-xl"
      >
        Save PNG
      </Button>
    </div>
  );
};
