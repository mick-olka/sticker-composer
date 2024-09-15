import { RefObject } from "react";
import { Segment } from "./";
import { a4Height, a4Width } from "./data";

interface GridProps {
  rows: number;
  cols: number;
  pageRef: RefObject<HTMLDivElement> | ((domNode: HTMLDivElement) => void);
  padding: number;
  images: string[];
  setImages: (imgs: string[]) => void;
}

export const Grid = ({
  rows,
  cols,
  pageRef,
  padding,
  images,
  setImages,
}: GridProps) => {
  const totalCells = rows * cols;
  const handleImageChange = (index: number, image: string) => {
    const newImages = [...images];
    newImages[index] = image;
    setImages(newImages);
  };
  const segments = Array.from({ length: totalCells }, (_, i) => (
    <Segment
      key={i}
      id={String(i)}
      padding={padding}
      image={images[i]}
      onImageChange={(img) => handleImageChange(i, img)}
    />
  ));
  return (
    <div
      ref={pageRef}
      className={`relative grid items-center justify-items-center bg-white`}
      style={{
        width: a4Width + "px",
        height: a4Height + "px",
        minHeight: a4Height + "px",
        minWidth: a4Width + "px",
        maxHeight: a4Height + "px",
        maxWidth: a4Width + "px",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        // background: `url(${white.src})`,
      }}
    >
      {segments}
    </div>
  );
};
