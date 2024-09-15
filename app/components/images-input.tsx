import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ImagesInput = ({
  onImagesSelect,
  limit,
}: {
  onImagesSelect: (images: string[]) => void;
  limit?: number;
}) => {
  const [loading, setLoading] = useState(false);
  const handleImagesUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setLoading(true);
      const fileList = Array.from(event.target.files).slice(0, limit || 16);
      const images: string[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (fileReader.result) {
            const imageUrl = fileReader.result as string;
            images.push(imageUrl);

            // Call onImageChange with the array of images
            if (images.length === fileList.length) {
              onImagesSelect(images);
              setLoading(false);
            }
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  return (
    <Button className="bg-slate-800 text-xl relative" disabled={loading}>
      {loading ? "Loading..." : "Select Images"}
      <input
        className="w-full h-full absolute opacity-0"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImagesUpload}
      />
    </Button>
  );
};
