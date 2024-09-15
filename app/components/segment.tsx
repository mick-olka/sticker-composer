"use client";
import Image from "next/image";
import { useRef } from "react";
import { Image as ImageJS } from "image-js";

type Props = {
  id: string;
  padding?: number;
  image?: string;
  onImageChange: (img: string) => void;
};
export const Segment = ({ image, onImageChange }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageUrl = fileReader.result as string;
        onImageChange(imageUrl);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRotateImage = async () => {
    if (image) {
      const img = await ImageJS.load(image);
      const rotatedImage = img.rotateLeft();
      onImageChange(rotatedImage.toDataURL());
    }
  };

  return (
    <div
      className={"h-full w-full relative overflow-hidden hover:bg-slate-100"}
      ref={divRef}
    >
      <input
        type="file"
        onChange={handleImageChange}
        className="filetype absolute w-full h-1/2 opacity-0 hover:opacity-100 z-10"
      />
      {image ? (
        <>
          <Image
            className={
              "absolute top-0 bottom-0 right-0 left-0 object-contain m-auto max-w-7xl h-full w-full p-1"
            }
            src={image}
            alt=""
            width={640}
            height={640}
            priority
            // style={getDivDimensions()}
          />
          <button
            onClick={handleRotateImage}
            className="text-black filetype bottom-0 absolute w-full h-1/2 opacity-0 bg-slate-100 hover:opacity-50"
          >
            ROTATE
          </button>
        </>
      ) : null}
    </div>
  );
};
