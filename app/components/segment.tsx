"use client";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  id: string;
};
export const Segment = ({}: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [rotated, setRotated] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageUrl = fileReader.result as string;
        setImage(imageUrl);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
  const getDivDimensions = () => {
    if (divRef.current) {
      const dimensions = divRef.current.getBoundingClientRect();
      if (rotated)
        return { width: dimensions.height, height: dimensions.width };
      return { width: dimensions.width, height: dimensions.height };
    }
    return { width: "100%", height: "100%" };
  };
  const handleRotateClick = () => {
    getDivDimensions();
    setRotated((r) => !r);
  };
  return (
    <div
      className="h-full w-full relative overflow-hidden hover:bg-slate-100"
      ref={divRef}
    >
      <input
        type="file"
        onChange={onImageChange}
        className="filetype absolute w-full h-1/2 opacity-0 hover:opacity-100 z-10"
      />
      {image ? (
        <>
          <Image
            className={`absolute top-0 bottom-0 right-0 left-0 object-contain m-auto ${
              rotated ? "rotate-90" : ""
            }`}
            src={image}
            alt=""
            width={640}
            height={640}
            priority
            style={getDivDimensions()}
          />
          <button
            onClick={handleRotateClick}
            className="text-black filetype bottom-0 absolute w-full h-1/2 opacity-0 bg-slate-100 hover:opacity-50"
          >
            ROTATE
          </button>
        </>
      ) : null}
    </div>
  );
};
