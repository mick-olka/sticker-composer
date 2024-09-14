import { RefObject } from "react";
import { Segment } from "./";

interface GridProps {
  rows: number;
  cols: number;
  pageRef: RefObject<HTMLDivElement> | ((domNode: HTMLDivElement) => void);
}
const a4Width = 210 * 3.78; // A4 width in mm, converted to pixels
const a4Height = 297 * 3.78; // A4 height in mm, converted to pixels

export const Grid = ({ rows, cols, pageRef }: GridProps) => {
  const totalCells = rows * cols;
  const segments = Array.from({ length: totalCells }, (_, i) => (
    <Segment key={i} id={String(i)} />
  ));

  return (
    <div
      ref={pageRef}
      className={`relative grid items-center justify-items-center bg-white`}
      style={{
        width: a4Width + "px",
        height: a4Height + "px",
        padding: "1px",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        // background: `url(${white.src})`,
      }}
    >
      {segments}
    </div>
  );
};
