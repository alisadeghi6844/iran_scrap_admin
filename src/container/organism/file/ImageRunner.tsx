import { useSelector } from "react-redux";
import { selectRunFileDataData } from "../../../redux/slice/chat/socket/socketSlice";
import { useEffect, useState } from "react";
import { getFileFromDatabase } from "../../../DB";
import Image from "../../../components/image";

const ImageRunner = () => {
  const fileData = useSelector(selectRunFileDataData);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (fileData?.fileId) {
      const getImage = async () => {
        try {
          setTimeout(async () => {
            const findImageFile = await getFileFromDatabase(fileData?.fileId);
            if (findImageFile) {
              const url = URL.createObjectURL(findImageFile);
              setImageUrl(url);
            }
          }, 100);
        } catch (error) {
          console.error("Error creating image URL:", error);
        }
      };
      getImage();
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [fileData?.fileId]);

  return (
    <div>
      <Image
        className="w-auto h-auto max-w-[80%] max-h-[80%] min-w-[20%] min-h-[20%]"
        src={imageUrl ?? null}
      />
    </div>
  );
};

export default ImageRunner;
